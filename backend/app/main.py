from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

app = FastAPI(
    title="AI Advertising Marketplace API",
    description="API for the AI-Powered Advertising & Offers Marketplace",
    version="1.0.0",
)

# Parse CORS origins manually to bypass Pydantic JSON strictness
raw_origins = settings.BACKEND_CORS_ORIGINS
if raw_origins.startswith("["):
    import json
    allowed_origins = json.loads(raw_origins)
else:
    allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.auth.router import router as auth_router
from app.companies.router import router as companies_router
from app.campaigns.router import router as campaigns_router

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(companies_router, prefix="/api/v1/companies", tags=["Companies"])
app.include_router(campaigns_router, prefix="/api/v1/campaigns", tags=["Campaigns"])

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Advertising Marketplace API"}
