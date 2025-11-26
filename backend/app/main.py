from fastapi import FastAPI
from app.routes import assess, dashboard, goals, privacy
from app.core.db import init_db
from app.core.observability import ObservabilityMiddleware

app = FastAPI(title="Environmental Footprint API")

# Add Middleware
app.add_middleware(ObservabilityMiddleware)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(assess.router, prefix="/api", tags=["Assess"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(goals.router, prefix="/api/goals", tags=["Goals"])
app.include_router(privacy.router, prefix="/api/privacy", tags=["Privacy"])
from app.routes import quotes
app.include_router(quotes.router, prefix="/api/quotes", tags=["Quotes"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Environmental Footprint API"}
