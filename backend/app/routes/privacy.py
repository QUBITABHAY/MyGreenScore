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
    data["footprints"] = res.scalars().all()
    
    # Goals
    res = await session.execute(select(UserGoal).where(UserGoal.user_id == user_id))
    data["goals"] = res.scalars().all()
    
    # Preferences
    res = await session.execute(select(UserPreference).where(UserPreference.user_id == user_id))
    data["preferences"] = res.scalars().all()
    
    # Memory Logs
    res = await session.execute(select(MemoryLog).where(MemoryLog.user_id == user_id))
    data["memory_logs"] = res.scalars().all()
    
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
