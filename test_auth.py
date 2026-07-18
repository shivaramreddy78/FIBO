import requests
import time
import sys

# wait for backend to start if needed
try:
    # try registering a user
    email = f"test{time.time()}@example.com"
    r = requests.post("http://localhost:8000/api/v1/auth/register", json={
        "email": email,
        "password": "password123",
        "full_name": "Test User",
        "mobile_number": "1234567890"
    })
    print("Register:", r.status_code, r.text)

    # try login
    r = requests.post("http://localhost:8000/api/v1/auth/login", data={
        "username": email,
        "password": "password123"
    })
    print("Login:", r.status_code, r.text)
    
    if r.status_code == 200:
        token = r.json()["access_token"]
        r = requests.get("http://localhost:8000/api/v1/auth/me", headers={
            "Authorization": f"Bearer {token}"
        })
        print("Me:", r.status_code, r.text)
except Exception as e:
    print(e)
