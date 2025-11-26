import google.generativeai as genai
from app.core.config import get_settings
import json

settings = get_settings()
genai.configure(api_key=settings.GOOGLE_API_KEY)

async def suggestion_agent(item_name: str, user_context: dict):
    """
    SuggestionAgent provides eco-friendly alternatives considering user preferences.
    """
    prefs = user_context.get("preferences", {})
    goals = user_context.get("goals", [])
    
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    Give 3 short eco-friendly alternatives for the product: {item_name}.
    User Preferences: {prefs}
    User Goals: {goals}
    
    Return ONLY JSON list of strings.
    Example: {{ "suggestions": ["alt1", "alt2", "alt3"] }}
    """
    
    try:
        response = await model.generate_content_async(prompt)
        content = response.text.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content).get("suggestions", [])
    except Exception as e:
        print(f"Suggestion Error: {e}")
        return []
