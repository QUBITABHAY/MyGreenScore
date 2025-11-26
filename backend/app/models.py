from typing import Optional, List
from sqlmodel import SQLModel, Field, Column, JSON
from datetime import datetime

class FootprintRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str
    item_name: str
    category: Optional[str] = None
    classification_confidence: float = Field(default=0.0)
    quantity: float
    unit: str
    co2e_kg: float
    suggestions: List[str] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserGoal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str
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
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str
    role: str  # user, assistant, system
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
