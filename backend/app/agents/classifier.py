import google.generativeai as genai
from app.core.config import get_settings
import json
import os

settings = get_settings()
genai.configure(api_key=settings.GOOGLE_API_KEY)

async def classifier_agent(item_name: str):
    """
    Classifies the item into a standardized category.
    Categories: Food, Transport, Energy, Clothing, Electronics, Household, Other.
    """
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    Classify the following item into one of these categories: 
    [Food, Transport, Energy, Clothing, Electronics, Household, Other].
    
    Item: {item_name}
    
    Return ONLY JSON:
    {{ "category": "CategoryName", "confidence": 0.95 }}
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
        print(f"Classifier Error: {e}")
        return {"category": "Other", "confidence": 0.0}
