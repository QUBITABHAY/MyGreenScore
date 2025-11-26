import random

class ABTestFramework:
    _experiments = {}

    @classmethod
    def register_experiment(cls, name: str, variants: list):
        cls._experiments[name] = variants

    @classmethod
    def get_variant(cls, experiment_name: str, user_id: str) -> str:
        if experiment_name not in cls._experiments:
            return "control"
        
        variants = cls._experiments[experiment_name]
        # Simple deterministic hash for user assignment
        hash_val = hash(user_id) % len(variants)
        return variants[hash_val]

# Example Usage in Suggestion Agent (Mock)
# variant = ABTestFramework.get_variant("suggestion_prompt_v2", user_id)
# if variant == "B":
#     use_new_prompt()
