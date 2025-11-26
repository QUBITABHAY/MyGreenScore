import asyncio
from app.agents.classifier import classifier_agent
from app.agents.calculator_agent import calculator_agent
from app.agents.suggestion_agent import suggestion_agent
from app.agents.tools import google_search_tool

async def main():
    print("--- Testing Search Tool ---")
    try:
        search_res = google_search_tool("CO2 emission factor for apple")
        print(f"Search Result Length: {len(search_res)}")
        print(f"Search Result Preview: {search_res[:100]}...")
    except Exception as e:
        print(f"Search Tool Error: {e}")

    print("\n--- Testing Classifier Agent ---")
    try:
        res = await classifier_agent("Apple")
        print(f"Classifier Result: {res}")
    except Exception as e:
        print(f"Classifier Error: {e}")

    print("\n--- Testing Calculator Agent ---")
    try:
        res = await calculator_agent("Apple", 1.0, "kg", "Food")
        print(f"Calculator Result: {res}")
    except Exception as e:
        print(f"Calculator Error: {e}")

    print("\n--- Testing Suggestion Agent ---")
    try:
        res = await suggestion_agent("Plastic Bottle", {"preferences": {}, "goals": []})
        print(f"Suggestion Result: {res}")
    except Exception as e:
        print(f"Suggestion Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
