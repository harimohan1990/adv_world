from app.database.base import Base
from app.users.models import User, UserRole
from app.companies.models import Company, CompanyUser
from app.campaigns.models import Campaign, Offer, CampaignStatus

# This file ensures all models are imported before Alembic runs so they are registered on the Base metadata.
__all__ = [
    "Base",
    "User",
    "UserRole",
    "Company",
    "CompanyUser",
    "Campaign",
    "Offer",
    "CampaignStatus",
]
