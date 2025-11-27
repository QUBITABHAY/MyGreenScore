from fastapi import APIRouter, Depends
from sqlalchemy import select
from app.core.db import get_session
from app.models import User
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from app.core.auth import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class UserProfile(BaseModel):
    email: Optional[str] = None
    name: Optional[str] = None

@router.get("/me")
async def get_user_profile(
    session: AsyncSession = Depends(get_session), 
    user_id: str = Depends(get_current_user)
):
    """
    Get the current user's profile. Creates one if it doesn't exist.
    """
    # Try to find existing user
    stmt = select(User).where(User.clerk_id == user_id)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        # Create new user profile
        user = User(clerk_id=user_id)
        session.add(user)
        await session.commit()
        await session.refresh(user)
    else:
        # Update last login
        user.last_login = datetime.utcnow()
        session.add(user)
        await session.commit()
        await session.refresh(user)
    
    return {
        "id": user.id,
        "clerk_id": user.clerk_id,
        "email": user.email,
        "name": user.name,
        "onboarding_completed": user.onboarding_completed,
        "created_at": user.created_at.isoformat(),
        "last_login": user.last_login.isoformat()
    }

@router.put("/me")
async def update_user_profile(
    profile: UserProfile,
    session: AsyncSession = Depends(get_session), 
    user_id: str = Depends(get_current_user)
):
    """
    Update the current user's profile.
    """
    # Find user
    stmt = select(User).where(User.clerk_id == user_id)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        # Create if doesn't exist
        user = User(
            clerk_id=user_id,
            email=profile.email,
            name=profile.name
        )
        session.add(user)
    else:
        # Update existing
        if profile.email is not None:
            user.email = profile.email
        if profile.name is not None:
            user.name = profile.name
        user.last_login = datetime.utcnow()
        session.add(user)
    
    await session.commit()
    await session.refresh(user)
    
    return {
        "id": user.id,
        "clerk_id": user.clerk_id,
        "email": user.email,
        "name": user.name,
        "onboarding_completed": user.onboarding_completed,
        "created_at": user.created_at.isoformat(),
        "last_login": user.last_login.isoformat()
    }

@router.post("/complete-onboarding")
async def complete_onboarding(
    session: AsyncSession = Depends(get_session), 
    user_id: str = Depends(get_current_user)
):
    """
    Mark user's onboarding as complete.
    """
    stmt = select(User).where(User.clerk_id == user_id)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()
    
    if user:
        user.onboarding_completed = True
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return {"status": "success", "onboarding_completed": True}
    
    return {"status": "error", "message": "User not found"}
