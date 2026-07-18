import urllib.request
import urllib.parse
import json

def test():
    # Login
    data = urllib.parse.urlencode({"username": "test15@test.com", "password": "password"}).encode('utf-8')
    req = urllib.request.Request("http://localhost:8000/api/v1/auth/login", data=data)
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode())
            token = res["access_token"]
    except Exception as e:
        print("Login failed:", e)
        return
        
    # Get Me
    req = urllib.request.Request("http://localhost:8000/api/v1/auth/me", 
                                 headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req) as response:
            print("SUCCESS:", response.status, response.read().decode())
    except urllib.error.HTTPError as e:
        print("ERROR BODY:", e.code, e.read().decode())

test()
