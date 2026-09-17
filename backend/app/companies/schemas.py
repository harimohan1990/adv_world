import uuid
from typing import Optional
from pydantic import BaseModel, HttpUrl

class CompanyBase(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(CompanyBase):
    name: Optional[str] = None

class CompanyResponse(CompanyBase):
    id: uuid.UUID
    is_approved: bool
    
    model_config = {"from_attributes": True}
