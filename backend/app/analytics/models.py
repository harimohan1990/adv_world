import uuid
from enum import Enum
from datetime import datetime
from typing import Optional, Any, Dict
from sqlalchemy import String, ForeignKey, DateTime, JSON
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from app.database.base import Base

class EventType(str, Enum):
    OFFER_IMPRESSION = "OFFER_IMPRESSION"
    OFFER_CLICK = "OFFER_CLICK"
    PAGE_VIEW = "PAGE_VIEW"

class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    session_id: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    event_type: Mapped[EventType] = mapped_column(String(50), nullable=False)
    offer_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("offers.id", ondelete="SET NULL"), nullable=True)
    metadata_: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON().with_variant(JSONB, "postgresql"), nullable=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
