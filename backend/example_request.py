import requests
import json

url = "http://localhost:8000/api/assess"

payload = {
    "user_id": "test_user_1",
    "items": [
        {
            "item_name": "Cotton T-shirt",
            "quantity": 1,
            "unit": "piece"
        },
        {
            "item_name": "Beef burger",
            "quantity": 2,
            "unit": "serving"
        }
    ]
}

headers = {
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    print("Status Code:", response.status_code)
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
    if response:
        print(response.text)
