import uuid
from typing import List, Optional
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

class Company(Base):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    website: Mapped[Optional[str]] = mapped_column(String(255))
    logo_url: Mapped[Optional[str]] = mapped_column(String(1024))
    is_approved: Mapped[bool] = mapped_column(default=False)
    
    # Relationships
    users: Mapped[List["CompanyUser"]] = relationship(back_populates="company", cascade="all, delete-orphan")
    campaigns: Mapped[List["Campaign"]] = relationship(back_populates="company")

class CompanyUser(Base):
    __tablename__ = "company_users"

    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    
    # Relationships
    company: Mapped["Company"] = relationship(back_populates="users")
    user: Mapped["User"] = relationship(back_populates="companies")
