from enum import Enum
from typing import List, Optional
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

class UserRole(str, Enum):
    CUSTOMER = "customer"
    ADVERTISER = "advertiser"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[Optional[str]] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    role: Mapped[UserRole] = mapped_column(String(50), default=UserRole.CUSTOMER)
    
    # Relationships
    companies: Mapped[List["CompanyUser"]] = relationship(back_populates="user", cascade="all, delete-orphan")
