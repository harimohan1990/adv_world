import uuid
from typing import Optional, Dict, Any
from pydantic import BaseModel

class TrackingEventCreate(BaseModel):
    session_id: str
    event_type: str
    offer_id: Optional[uuid.UUID] = None
    metadata_: Optional[Dict[str, Any]] = None
