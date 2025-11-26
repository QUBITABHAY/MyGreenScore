import asyncio
from app.agents.calculator_agent import calculator_agent
from app.agents.suggestion_agent import suggestion_agent

async def debug_agents():
    print("Testing Calculator Agent...")
    try:
        res = await calculator_agent("Beef burger", 1, "serving", "Food")
        print("Calculator Result:", res)
    except Exception as e:
        print("Calculator Exception:", e)

    print("\nTesting Suggestion Agent...")
    try:
        res = await suggestion_agent("Plastic bottle", {"preferences": {}, "goals": []})
        print("Suggestion Result:", res)
    except Exception as e:
        print("Suggestion Exception:", e)

if __name__ == "__main__":
    asyncio.run(debug_agents())
