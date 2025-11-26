import google.generativeai as genai
from app.core.config import get_settings
from app.agents.tools import google_search_tool
import json

settings = get_settings()
genai.configure(api_key=settings.GOOGLE_API_KEY)

async def calculator_agent(item_name: str, quantity: float, unit: str, category: str):
    """
    CalculatorAgent finds CO2 info about products using category context.
    """
    search_query = f"CO2 emission factor for {item_name} ({category}) per {unit}"
    search_results = google_search_tool(search_query)
    
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    Research real-world CO₂ emission factors for the product: {item_name} (Category: {category}).
    Quantity: {quantity} {unit}
    Search results: {search_results}
    
    Calculate the total CO2e in kg.
    Return ONLY JSON:
    {{ "co2e_kg": number, "factor_used": number, "source": "string" }}
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
        print(f"Calculator Error: {e}")
        return {"co2e_kg": 0.0, "factor_used": 0.0, "source": "Error"}
