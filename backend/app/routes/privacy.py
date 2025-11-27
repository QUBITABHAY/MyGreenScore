from fastapi import APIRouter, Depends
from sqlalchemy import select, delete
from app.core.db import get_session
from app.models import FootprintRecord, UserGoal, UserPreference, MemoryLog
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/export")
async def export_data(session: AsyncSession = Depends(get_session), user_id: str = Depends(get_current_user)):
    """
    Export all data associated with the user.
    """
    data = {}
    
    # Footprints
    res = await session.execute(select(FootprintRecord).where(FootprintRecord.user_id == user_id))
    footprints = res.scalars().all()
    data["footprints"] = [
        {k: v for k, v in r.dict().items() if k not in ["user_id", "classification_confidence"]}
        for r in footprints
    ]
    
    # Goals
    res = await session.execute(select(UserGoal).where(UserGoal.user_id == user_id))
    goals = res.scalars().all()
    data["goals"] = [
        {k: v for k, v in r.dict().items() if k not in ["user_id"]}
        for r in goals
    ]
    
    # Preferences
    res = await session.execute(select(UserPreference).where(UserPreference.user_id == user_id))
    preferences = res.scalars().all()
    data["preferences"] = [
        {k: v for k, v in r.dict().items() if k not in ["user_id"]}
        for r in preferences
    ]
    
    # Memory Logs
    res = await session.execute(select(MemoryLog).where(MemoryLog.user_id == user_id))
    memory_logs = res.scalars().all()
    data["memory_logs"] = [
        {k: v for k, v in r.dict().items() if k not in ["user_id"]}
        for r in memory_logs
    ]
    
    return data

@router.delete("/data")
async def delete_data(session: AsyncSession = Depends(get_session), user_id: str = Depends(get_current_user)):
    """
    Delete all data associated with the user.
    """
    await session.execute(delete(FootprintRecord).where(FootprintRecord.user_id == user_id))
    await session.execute(delete(UserGoal).where(UserGoal.user_id == user_id))
    await session.execute(delete(UserPreference).where(UserPreference.user_id == user_id))
    await session.execute(delete(MemoryLog).where(MemoryLog.user_id == user_id))
    
    await session.commit()
    
    return {"status": "success", "message": "All user data deleted"}
