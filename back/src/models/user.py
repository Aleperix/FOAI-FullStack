from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: Optional[str]
    username: str
    first_name: str
    last_name: str
    email: str
    password: str