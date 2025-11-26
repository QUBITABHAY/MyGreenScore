import google.generativeai as genai
from app.core.config import get_settings
import json

settings = get_settings()
genai.configure(api_key=settings.GOOGLE_API_KEY)

async def quote_agent() -> dict:
    """
    QuoteAgent generates an inspiring sustainability quote and a tip.
    """
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = """
    Generate an inspiring quote about nature, sustainability, or climate change from a famous person.
    Also provide one short, actionable sustainability tip.
    
    Return ONLY JSON.
    Example: { "quote": "The Earth is what we all have in common.", "author": "Wendell Berry", "tip": "Turn off lights when leaving a room." }
    """
    
    try:
        response = await model.generate_content_async(prompt)
        content = response.text.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content)
    except Exception as e:
        print(f"Quote Error: {e}")
        return {
            "quote": "The greatest threat to our planet is the belief that someone else will save it.",
            "author": "Robert Swan",
            "tip": "Reduce, Reuse, Recycle."
        }
