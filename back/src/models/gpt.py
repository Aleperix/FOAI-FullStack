from pydantic import BaseModel
from typing import Optional

class Gpt(BaseModel):
    id: Optional[str]
    prompt: str
    response: Optional[str]
    language: str
    src: Optional[str]