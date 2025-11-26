import pytest
from app.agents.classifier import classifier_agent
from app.agents.calculator_agent import calculator_agent
from app.agents.suggestion_agent import suggestion_agent

# Mocking Gemini calls would be ideal, but for this capstone we might run against live API 
# or just mock the response structure if we want to save tokens.
# For "Agent Evaluation", we want to see if it actually works.

@pytest.mark.asyncio
async def test_classifier_agent():
    item = "Apple"
    result = await classifier_agent(item)
    assert "category" in result
    assert result["category"] in ["Food", "Other"]

@pytest.mark.asyncio
async def test_calculator_agent():
    # This test requires live internet and API keys
    item = "Beef burger"
    qty = 1
    unit = "serving"
    category = "Food"
    result = await calculator_agent(item, qty, unit, category)
    assert "co2e_kg" in result
    assert result["co2e_kg"] > 0

@pytest.mark.asyncio
async def test_suggestion_agent():
    item = "Plastic bottle"
    context = {"preferences": {}, "goals": []}
    suggestions = await suggestion_agent(item, context)
    assert isinstance(suggestions, list)
    assert len(suggestions) > 0
