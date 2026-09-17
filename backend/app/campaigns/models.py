import uuid
from enum import Enum
from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Text, ForeignKey, Numeric, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

class CampaignStatus(str, Enum):
    DRAFT = "DRAFT"
    PENDING_REVIEW = "PENDING_REVIEW"
    APPROVED = "APPROVED"
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    COMPLETED = "COMPLETED"
    REJECTED = "REJECTED"

class Campaign(Base):
    __tablename__ = "campaigns"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[CampaignStatus] = mapped_column(String(50), default=CampaignStatus.DRAFT)
    budget: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    start_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    end_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"))
    
    # Relationships
    company: Mapped["Company"] = relationship(back_populates="campaigns")
    offers: Mapped[List["Offer"]] = relationship(back_populates="campaign", cascade="all, delete-orphan")

class Offer(Base):
    __tablename__ = "offers"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    offer_value: Mapped[Optional[str]] = mapped_column(String(100))
    coupon_code: Mapped[Optional[str]] = mapped_column(String(50))
    cta_text: Mapped[Optional[str]] = mapped_column(String(100))
    landing_page_url: Mapped[Optional[str]] = mapped_column(String(1024))
    
    campaign_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("campaigns.id", ondelete="CASCADE"))
    
    # Relationships
    campaign: Mapped["Campaign"] = relationship(back_populates="offers")
