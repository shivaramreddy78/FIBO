from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

res = client.post("/api/v1/auth/register", json={"email":"test11@test.com", "password":"password", "full_name":"Test User", "mobile_number":"1234567890"})
res = client.post("/api/v1/auth/login", data={"username":"test11@test.com", "password":"password"})
token = res.json()["access_token"]
res = client.post("/api/v1/assessment/generate", headers={"Authorization": f"Bearer {token}"})
print(res.status_code)
print(res.text)
