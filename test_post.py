import urllib.request
import urllib.parse
import json

def test():
    # Register
    req = urllib.request.Request("http://localhost:8000/api/v1/auth/register", 
                                  data=json.dumps({"email":"test15@test.com", "password":"password", "full_name":"Test User", "mobile_number":"1234567890"}).encode('utf-8'),
                                  headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except Exception as e:
        pass
        
    # Login
    data = urllib.parse.urlencode({"username": "test15@test.com", "password": "password"}).encode('utf-8')
    req = urllib.request.Request("http://localhost:8000/api/v1/auth/login", data=data)
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode())
        token = res["access_token"]
        
    # Generate assessment
    req = urllib.request.Request("http://localhost:8000/api/v1/assessment/generate", 
                                 data=b"",
                                 headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req) as response:
            print("SUCCESS:", response.read().decode())
    except urllib.error.HTTPError as e:
        print("ERROR BODY:", e.read().decode())

test()
