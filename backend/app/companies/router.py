import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database.session import get_db
from app.auth.deps import get_current_user, get_current_advertiser
from app.users.models import User
from app.companies.models import Company, CompanyUser
from app.companies import schemas

router = APIRouter()

@router.post("/", response_model=schemas.CompanyResponse, status_code=status.HTTP_201_CREATED)
async def create_company(
    company_in: schemas.CompanyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_advertiser)
):
    # Check if user already has a company
    result = await db.execute(
        select(Company).join(CompanyUser).where(CompanyUser.user_id == current_user.id)
    )
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="User already owns a company")
        
    company = Company(**company_in.model_dump())
    db.add(company)
    await db.commit()
    await db.refresh(company)
    
    # Link user to company
    company_user = CompanyUser(company_id=company.id, user_id=current_user.id)
    db.add(company_user)
    await db.commit()
    
    return company

@router.get("/", response_model=List[schemas.CompanyResponse])
async def list_companies(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Company).where(Company.is_approved == True))
    return result.scalars().all()

@router.get("/me", response_model=schemas.CompanyResponse)
async def get_my_company(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_advertiser)
):
    result = await db.execute(
        select(Company).join(CompanyUser).where(CompanyUser.user_id == current_user.id)
    )
    company = result.scalars().first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@router.get("/{company_id}", response_model=schemas.CompanyResponse)
async def get_company(company_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Company).where(Company.id == company_id))
    company = result.scalars().first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company
