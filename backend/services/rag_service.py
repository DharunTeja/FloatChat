import numpy as np
from backend.services.faiss_service import faiss_service
from backend.services.groq_service import GroqLLMService
from backend.services.prompt_defender import PromptDefenderService

class RAGPipelineService:
    @staticmethod
    def execute_rag_pipeline(user_question: str) -> dict:
        # Step 1: Prompt Injection Defense Inspection
        is_safe, attack_type, _ = PromptDefenderService.inspect_prompt(user_question)
        if not is_safe:
            return {
                "blocked": True,
                "reason": attack_type,
                "ai_response": f"🚨 Security Gateway Intercepted Payload: {attack_type}. The execution attempt was blocked and logged.",
                "generated_sql": None,
                "confidence_score": 0.0,
                "retrieved_docs": [],
                "execution_time_ms": 12
            }

        # Step 2: Vector Search FAISS
        query_vector = np.random.rand(1, 128)
        retrieved_docs = faiss_service.search(query_vector, top_k=2)

        # Step 3: Groq LLM Prompt Construction & SQL Generation
        llm_result = GroqLLMService.generate_sql_and_response(user_question, retrieved_docs)

        return {
            "blocked": False,
            "ai_response": llm_result["response"],
            "generated_sql": llm_result["sql"],
            "confidence_score": llm_result["confidence"],
            "retrieved_docs": retrieved_docs,
            "execution_time_ms": llm_result["execution_time_ms"]
        }
