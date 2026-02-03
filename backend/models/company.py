from pydantic import BaseModel
from typing import Optional

class Company(BaseModel):
    company_name: str
    rank: Optional[int]
    area: Optional[str]
    location: Optional[str]
    country: Optional[str]
    revenue_b: Optional[float]
    employees: Optional[int]
    india_presence: Optional[bool]
    gcc_india: Optional[bool]
