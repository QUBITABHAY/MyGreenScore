from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
from app.routes import assess, dashboard, goals, privacy, quotes, user
from app.core.db import init_db
from app.core.observability import ObservabilityMiddleware
from app.core.config import get_settings
import os

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown (if needed in future)
    pass

app = FastAPI(
    title="Environmental Footprint API",
    lifespan=lifespan
)

# Add Middleware (order matters - first added is outermost)
app.add_middleware(GZipMiddleware, minimum_size=1000)  # Compress responses > 1KB
app.add_middleware(ObservabilityMiddleware)

# CORS - Support both environment variable and default
cors_origins_str = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8000")
cors_origins = [origin.strip() for origin in cors_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(user.router, prefix="/api/user", tags=["User"])
app.include_router(assess.router, prefix="/api", tags=["Assess"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(goals.router, prefix="/api/goals", tags=["Goals"])
app.include_router(privacy.router, prefix="/api/privacy", tags=["Privacy"])
app.include_router(quotes.router, prefix="/api/quotes", tags=["Quotes"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Environmental Footprint API"}

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "service": "MyGreenScore API"}
