from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from app.core.db import get_session
from app.models import UserGoal
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from app.core.auth import get_current_user

router = APIRouter()

class GoalCreate(BaseModel):
    target_co2e: float
    period: str = "monthly"

@router.post("/")
async def set_goal(goal: GoalCreate, session: AsyncSession = Depends(get_session), user_id: str = Depends(get_current_user)):
    """
    Set a new reduction goal.
    """
    # Check if active goal exists
    stmt = select(UserGoal).where(
        UserGoal.user_id == user_id,
        UserGoal.end_date == None
    )
    result = await session.execute(stmt)
    active_goal = result.scalar_one_or_none()
    
    if active_goal:
        # Archive old goal
        active_goal.end_date = datetime.utcnow()
        session.add(active_goal)
    
    new_goal = UserGoal(
        user_id=user_id,
        target_co2e=goal.target_co2e,
        period=goal.period
    )
    session.add(new_goal)
    await session.commit()
    await session.refresh(new_goal)
    
    return new_goal

@router.get("/")
async def get_active_goal(session: AsyncSession = Depends(get_session), user_id: str = Depends(get_current_user)):
    stmt = select(UserGoal).where(
        UserGoal.user_id == user_id,
        UserGoal.end_date == None
    )
    result = await session.execute(stmt)
    goal = result.scalar_one_or_none()
    
    if not goal:
        return {"message": "No active goal found"}
        
    return goal
