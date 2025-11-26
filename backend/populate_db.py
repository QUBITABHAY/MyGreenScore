import asyncio
from datetime import datetime, timedelta
from app.core.db import init_db, get_session
from app.models import FootprintRecord, UserGoal, UserPreference, MemoryLog
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.db import engine

async def populate():
    await init_db()
    
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )

    async with async_session() as session:
        user_id = "demo-user"
        
        # Check if data exists
        # ... (optional)

        print("Populating data for user:", user_id)

        # 1. Footprint Records (Past 30 days)
        categories = ["Transport", "Food", "Energy", "Shopping"]
        records = []
        for i in range(30):
            date = datetime.utcnow() - timedelta(days=i)
            # Add 1-3 records per day
            for j in range(2):
                if j == 0:
                    # Transport
                    records.append(FootprintRecord(
                        user_id=user_id,
                        item_name="Commute",
                        category="Transport",
                        co2e_kg=2.5 + (i % 3),
                        unit="km",
                        quantity=10 + (i % 5),
                        created_at=date
                    ))
                else:
                    # Food
                    records.append(FootprintRecord(
                        user_id=user_id,
                        item_name="Lunch",
                        category="Food",
                        co2e_kg=1.2 + (i % 2),
                        unit="serving",
                        quantity=1,
                        created_at=date
                    ))
        
        session.add_all(records)
        
        # 2. Goals
        # Active Goal
        active_goal = UserGoal(
            user_id=user_id,
            target_co2e=100.0,
            period="monthly",
            created_at=datetime.utcnow()
        )
        session.add(active_goal)
        
        # 3. Preferences
        prefs = [
            UserPreference(user_id=user_id, key="dietary_preference", value="Omnivore"),
            UserPreference(user_id=user_id, key="transport_preference", value="Car"),
            UserPreference(user_id=user_id, key="energy_preference", value="Grid")
        ]
        session.add_all(prefs)
        
        await session.commit()
        print("Database populated successfully!")

if __name__ == "__main__":
    asyncio.run(populate())
