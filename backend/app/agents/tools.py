import requests
from app.core.config import get_settings
from app.core.db import get_session
from app.models import FootprintRecord

settings = get_settings()

def google_search_tool(query: str):
    """
    Searches Google for the given query and returns the results.
    Useful for finding CO2 emission factors.
    Uses Google Custom Search JSON API.
    """
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "q": query,
        "key": settings.GOOGLE_API_KEY,
        "cx": settings.GOOGLE_CSE_ID,
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        results = response.json()
        
        snippets = []
        if "items" in results:
            for item in results["items"][:5]:
                snippets.append(item.get("snippet", ""))
                
        return "\n".join(snippets)
    except Exception as e:
        print(f"Search Error: {e}")
        return ""

async def db_writer_tool(user_id: str, item_name: str, quantity: float, unit: str, co2e_kg: float, suggestions: list[str], category: str = "Other", classification_confidence: float = 0.0):
    """
    Saves the footprint record to the database.
    """
    async for session in get_session():
        record = FootprintRecord(
            user_id=user_id,
            item_name=item_name,
            quantity=quantity,
            unit=unit,
            co2e_kg=co2e_kg,
            suggestions=suggestions,
            category=category,
            classification_confidence=classification_confidence
        )
        session.add(record)
        await session.commit()
        await session.refresh(record)
        return {"status": "success", "record_id": record.id}
