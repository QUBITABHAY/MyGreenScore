from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from app.core.db import get_session
from app.models import FootprintRecord
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats(session: AsyncSession = Depends(get_session), user_id: str = Depends(get_current_user)):
    """
    Get aggregated CO2e stats for the user.
    """
    # Total CO2e
    stmt = select(func.sum(FootprintRecord.co2e_kg)).where(FootprintRecord.user_id == user_id)
    result = await session.execute(stmt)
    total_co2e = result.scalar() or 0.0
    
    # CO2e by Category
    stmt = select(
        FootprintRecord.category, 
        func.sum(FootprintRecord.co2e_kg)
    ).where(
        FootprintRecord.user_id == user_id
    ).group_by(FootprintRecord.category)
    
    result = await session.execute(stmt)
    by_category = {row[0]: row[1] for row in result.all()}
    
    return {
        "total_co2e_kg": total_co2e,
        "by_category": by_category,
        "equivalent_km_driven": round(total_co2e / 0.12, 2)  # Approx 0.12 kg/km for avg car
    }

@router.get("/trends")
async def get_trends(days: int = 30, session: AsyncSession = Depends(get_session), user_id: str = Depends(get_current_user)):
    """
    Get daily CO2e trends for the last N days.
    """
    start_date = datetime.utcnow() - timedelta(days=days)
    
    stmt = select(
        func.date_trunc('day', FootprintRecord.created_at).label('day'),
        func.sum(FootprintRecord.co2e_kg)
    ).where(
        FootprintRecord.user_id == user_id,
        FootprintRecord.created_at >= start_date
    ).group_by('day').order_by('day')
    
    result = await session.execute(stmt)
    trends = [{"date": row[0].strftime("%Y-%m-%d"), "co2e_kg": row[1]} for row in result.all()]
    
    return {"trends": trends}
