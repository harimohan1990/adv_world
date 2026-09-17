from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.analytics.models import TrackingEvent, EventType
from app.analytics.schemas import TrackingEventCreate

router = APIRouter()

@router.post("/track", status_code=status.HTTP_201_CREATED)
async def track_event(
    event_in: TrackingEventCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        # Validate event type
        event_type = EventType(event_in.event_type)
        
        event = TrackingEvent(
            session_id=event_in.session_id,
            event_type=event_type,
            offer_id=event_in.offer_id,
            metadata_=event_in.metadata_
        )
        db.add(event)
        await db.commit()
        return {"status": "success"}
    except Exception as e:
        # We don't want tracking to block the user or throw hard errors to the frontend
        print(f"Tracking error: {e}")
        return {"status": "error"}
