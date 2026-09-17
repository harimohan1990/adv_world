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
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.auth.router import router as auth_router

app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Advertising Marketplace API"}
