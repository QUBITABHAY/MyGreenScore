from typing import Optional, List
from sqlmodel import SQLModel, Field, Column, JSON
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    clerk_id: str = Field(index=True, unique=True)  # Clerk user ID
    email: Optional[str] = Field(default=None, index=True)
    name: Optional[str] = None
    onboarding_completed: bool = Field(default=False)  # Track if user completed onboarding
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
    last_login: datetime = Field(default_factory=datetime.utcnow)

class FootprintRecord(SQLModel, table=True):
    __tablename__ = "footprint_record"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Index for fast user queries
    item_name: str
    category: Optional[str] = Field(default=None, index=True)  # Index for category filtering
    classification_confidence: float = Field(default=0.0)
    quantity: float
    unit: str
    co2e_kg: float
    suggestions: List[str] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)  # Index for time-based queries

class UserGoal(SQLModel, table=True):
    __tablename__ = "user_goal"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Index for user lookups
    target_co2e: float
    period: str = "monthly"  # weekly, monthly, yearly
    start_date: datetime = Field(default_factory=datetime.utcnow)
    end_date: Optional[datetime] = None

class UserPreference(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str
    key: str
    value: str

class MemoryLog(SQLModel, table=True):
    __tablename__ = "memory_log"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Index for user memory queries
    role: str  # user, assistant, system
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow, index=True)  # Index for time-based queries
