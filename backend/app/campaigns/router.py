import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_advertiser, get_current_admin
from app.users.models import User
from app.companies.models import Company, CompanyUser
from app.campaigns.models import Campaign, Offer, CampaignStatus
from app.campaigns import schemas

router = APIRouter()

async def get_user_company(db: AsyncSession, user_id: uuid.UUID) -> Company:
    result = await db.execute(
        select(Company).join(CompanyUser).where(CompanyUser.user_id == user_id)
    )
    company = result.scalars().first()
    if not company:
        raise HTTPException(status_code=400, detail="You must register a company first")
    return company

@router.post("/", response_model=schemas.CampaignResponse, status_code=status.HTTP_201_CREATED)
async def create_campaign(
    campaign_in: schemas.CampaignCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_advertiser)
):
    company = await get_user_company(db, current_user.id)
    
    campaign = Campaign(
        **campaign_in.model_dump(),
        company_id=company.id,
        status=CampaignStatus.PENDING_REVIEW
    )
    db.add(campaign)
    await db.commit()
    await db.refresh(campaign)
    return campaign

@router.get("/", response_model=List[schemas.CampaignResponse])
async def list_campaigns(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Campaign).options(selectinload(Campaign.offers)).where(Campaign.status == CampaignStatus.ACTIVE)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/me", response_model=List[schemas.CampaignResponse])
async def list_my_campaigns(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_advertiser)
):
    company = await get_user_company(db, current_user.id)
    query = select(Campaign).options(selectinload(Campaign.offers)).where(Campaign.company_id == company.id)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/{campaign_id}/offers", response_model=schemas.OfferResponse, status_code=status.HTTP_201_CREATED)
async def create_offer(
    campaign_id: uuid.UUID,
    offer_in: schemas.OfferCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_advertiser)
):
    company = await get_user_company(db, current_user.id)
    
    # Verify campaign belongs to company
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id, Campaign.company_id == company.id))
    campaign = result.scalars().first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found or does not belong to your company")
        
    offer = Offer(
        **offer_in.model_dump(),
        campaign_id=campaign.id
    )
    db.add(offer)
    await db.commit()
    await db.refresh(offer)
    return offer

@router.get("/admin/pending", response_model=List[schemas.CampaignResponse])
async def list_pending_campaigns(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    query = select(Campaign).options(selectinload(Campaign.offers)).where(Campaign.status == CampaignStatus.PENDING_REVIEW)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/admin/{campaign_id}/publish-offer", response_model=schemas.OfferResponse)
async def admin_publish_offer(
    campaign_id: uuid.UUID,
    offer_in: schemas.OfferCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalars().first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
        
    campaign.status = CampaignStatus.ACTIVE
    
    offer = Offer(
        **offer_in.model_dump(),
        campaign_id=campaign.id
    )
    db.add(offer)
    await db.commit()
    await db.refresh(offer)
    return offer

@router.get("/trending-offers", response_model=List[schemas.OfferResponse])
async def get_trending_offers(db: AsyncSession = Depends(get_db)):
    # Just return top 10 recent offers for now (MVP)
    query = select(Offer).limit(10)
    result = await db.execute(query)
    return result.scalars().all()
