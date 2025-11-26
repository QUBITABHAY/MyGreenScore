from sqlalchemy import select
from app.core.db import get_session
from app.models import UserPreference, UserGoal, MemoryLog

async def get_user_context(user_id: str):
    """
    Retrieves user preferences and active goals.
    """
    context = {"preferences": {}, "goals": []}
    
    async for session in get_session():
        # Get Preferences
        stmt = select(UserPreference).where(UserPreference.user_id == user_id)
        result = await session.execute(stmt)
        prefs = result.scalars().all()
        for p in prefs:
            context["preferences"][p.key] = p.value
            
        # Get Active Goals
        stmt = select(UserGoal).where(UserGoal.user_id == user_id)
        result = await session.execute(stmt)
        goals = result.scalars().all()
        for g in goals:
            context["goals"].append({
                "target": g.target_co2e,
                "period": g.period
            })
            
    return context

async def save_memory_log(user_id: str, role: str, content: str):
    """
    Saves a conversation turn to the long-term memory log.
    """
    async for session in get_session():
        log = MemoryLog(user_id=user_id, role=role, content=content)
        session.add(log)
        await session.commit()
