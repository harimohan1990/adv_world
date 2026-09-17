import uuid
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

# Offer Schemas
class OfferBase(BaseModel):
    title: str
    description: Optional[str] = None
    offer_value: Optional[str] = None
    coupon_code: Optional[str] = None
    cta_text: Optional[str] = None
    landing_page_url: Optional[str] = None

class OfferCreate(OfferBase):
    pass

class OfferResponse(OfferBase):
    id: uuid.UUID
    campaign_id: uuid.UUID
    
    model_config = {"from_attributes": True}

# Campaign Schemas
class CampaignBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    budget: float = 0.0

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(CampaignBase):
    title: Optional[str] = None
    status: Optional[str] = None

class CampaignResponse(CampaignBase):
    id: uuid.UUID
    company_id: uuid.UUID
    status: str
    offers: List[OfferResponse] = []
    
    model_config = {"from_attributes": True}
