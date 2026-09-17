from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

app = FastAPI(
    title="AI Advertising Marketplace API",
    description="API for the AI-Powered Advertising & Offers Marketplace",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.auth.router import router as auth_router
from app.companies.router import router as companies_router
from app.campaigns.router import router as campaigns_router
from app.analytics.router import router as analytics_router

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(companies_router, prefix="/api/v1/companies", tags=["Companies"])
app.include_router(campaigns_router, prefix="/api/v1/campaigns", tags=["Campaigns"])
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["Analytics"])

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Advertising Marketplace API"}
