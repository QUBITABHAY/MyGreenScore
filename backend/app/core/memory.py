from typing import Dict, List, Any
import json

class InMemorySessionService:
    _sessions: Dict[str, Dict[str, Any]] = {}

    @classmethod
    def get_session(cls, user_id: str) -> Dict[str, Any]:
        if user_id not in cls._sessions:
            cls._sessions[user_id] = {
                "history": [],
                "context": {},
                "preferences": {}
            }
        return cls._sessions[user_id]

    @classmethod
    def update_session(cls, user_id: str, data: Dict[str, Any]):
        session = cls.get_session(user_id)
        session.update(data)
        cls._sessions[user_id] = session

    @classmethod
    def add_history(cls, user_id: str, message: str, role: str):
        session = cls.get_session(user_id)
        session["history"].append({"role": role, "content": message})
        # Trigger compaction if history gets too long
        if len(session["history"]) > 20:
            cls.compact_context(user_id)

    @classmethod
    def compact_context(cls, user_id: str):
        """
        Simple context compaction: Keep first 2 and last 10 messages.
        In a real system, this would use an LLM to summarize.
        """
        session = cls.get_session(user_id)
        history = session["history"]
        if len(history) > 12:
            summary_note = {"role": "system", "content": "[Previous context compacted]"}
            new_history = history[:2] + [summary_note] + history[-10:]
            session["history"] = new_history

    @classmethod
    def clear_session(cls, user_id: str):
        if user_id in cls._sessions:
            del cls._sessions[user_id]
