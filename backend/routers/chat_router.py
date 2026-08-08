from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.chat import ChatHistory
from backend.models.security import SecurityEvent
from backend.models.audit import AuditLog
from backend.schemas.chat import ChatRequest, ChatResponse, SqlGenerateRequest, RagSearchRequest
from backend.auth.dependencies import get_current_user
from backend.models.user import User
from backend.services.rag_service import RAGPipelineService
from backend.services.groq_service import GroqLLMService
from backend.services.faiss_service import faiss_service
import numpy as np

router = APIRouter(prefix="", tags=["AI Chat & RAG Engine"])

@router.post("/chat", response_model=ChatResponse)
def execute_chat(payload: ChatRequest, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    client_ip = request.client.host if request.client else "127.0.0.1"

    # Execute RAG Pipeline
    result = RAGPipelineService.execute_rag_pipeline(payload.question)

    if result.get("blocked"):
        # Log Security Threat Event
        sec_evt = SecurityEvent(
            event_type="Prompt Injection Blocked",
            severity="Critical",
            username=current_user.name,
            ip=client_ip,
            details=f"Prompt blocked: '{payload.question}'"
        )
        audit = AuditLog(
            username=current_user.name,
            role=current_user.role,
            action="PROMPT_BLOCKED",
            ip_address=client_ip,
            status="Denied",
            description=f"WAF intercepted attack payload: {result['reason']}"
        )
        db.add(sec_evt)
        db.add(audit)
        db.commit()

        return {
            "id": "msg-blocked",
            "question": payload.question,
            "generated_sql": None,
            "ai_response": result["ai_response"],
            "confidence_score": 0.0,
            "retrieved_docs": [],
            "execution_time_ms": 12
        }

    # Store in ChatHistory
    chat = ChatHistory(
        user_id=current_user.id,
        question=payload.question,
        generated_sql=result["generated_sql"],
        ai_response=result["ai_response"],
        confidence_score=result["confidence_score"]
    )
    db.add(chat)

    audit = AuditLog(
        username=current_user.name,
        role=current_user.role,
        action="EXECUTE_AI_QUERY",
        ip_address=client_ip,
        status="Success",
        description=f"AI query executed: '{payload.question[:30]}...'"
    )
    db.add(audit)
    db.commit()
    db.refresh(chat)

    return {
        "id": chat.id,
        "question": chat.question,
        "generated_sql": chat.generated_sql,
        "ai_response": chat.ai_response,
        "confidence_score": chat.confidence_score,
        "retrieved_docs": result["retrieved_docs"],
        "execution_time_ms": result["execution_time_ms"]
    }

@router.post("/generate-sql")
def generate_sql(payload: SqlGenerateRequest, current_user: User = Depends(get_current_user)):
    res = GroqLLMService.generate_sql_and_response(payload.question, [])
    return {"question": payload.question, "sql": res["sql"], "confidence": res["confidence"]}

@router.post("/rag-search")
def rag_search(payload: RagSearchRequest, current_user: User = Depends(get_current_user)):
    vec = np.random.rand(1, 128)
    docs = faiss_service.search(vec, top_k=payload.top_k or 5)
    return {"query": payload.query, "results": docs}
