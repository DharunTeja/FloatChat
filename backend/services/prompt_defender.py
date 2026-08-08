from typing import Tuple, Optional
from backend.utils.logger import sec_logger

PROMPT_INJECTION_PATTERNS = [
    "ignore previous instructions",
    "ignore all system instructions",
    "delete database",
    "drop table",
    "reveal system prompt",
    "dump dataset keys",
    "bypass security",
    "override security policy"
]

SQL_INJECTION_PATTERNS = [
    "union select",
    "drop table",
    "delete from",
    "1=1 --",
    "exec(",
    "xp_cmdshell"
]

class PromptDefenderService:
    @staticmethod
    def inspect_prompt(prompt_text: str) -> Tuple[bool, Optional[str], float]:
        text_lower = prompt_text.lower()
        
        for pattern in PROMPT_INJECTION_PATTERNS:
            if pattern in text_lower:
                sec_logger.warning(f"PROMPT INJECTION INTERCEPTED: Pattern '{pattern}' matched in text: '{prompt_text}'")
                return False, f"Prompt Injection Payload ('{pattern}')", 99.8
                
        for pattern in SQL_INJECTION_PATTERNS:
            if pattern in text_lower:
                sec_logger.warning(f"SQL INJECTION INTERCEPTED: Pattern '{pattern}' matched in text: '{prompt_text}'")
                return False, f"SQL Injection Payload ('{pattern}')", 99.5
                
        return True, None, 0.0
