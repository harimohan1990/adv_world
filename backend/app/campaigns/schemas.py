import uuid
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

# Offer Schemas
class OfferBase(BaseModel):
    title: str
    description: str
    discount_value: float
    discount_type: str # "percentage" or "fixed"
    promo_code: Optional[str] = None
    terms_conditions: Optional[str] = None

class OfferCreate(OfferBase):
    pass

class OfferResponse(OfferBase):
    id: uuid.UUID
    campaign_id: uuid.UUID
    
    model_config = {"from_attributes": True}

# Campaign Schemas
class CampaignBase(BaseModel):
    name: str
    description: str
    start_date: datetime
    end_date: datetime
    budget: float

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(CampaignBase):
    name: Optional[str] = None
    status: Optional[str] = None

class CampaignResponse(CampaignBase):
    id: uuid.UUID
    company_id: uuid.UUID
    status: str
    offers: List[OfferResponse] = []
    
    model_config = {"from_attributes": True}
