import requests
from datetime import datetime

TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWEwMjI0QGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4MDgyNCwiaWF0IjoxNzgyMzc5OTI0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZWRlMWM1ZDMtNmM4NC00YjU2LWFkN2ItNDJhNjY5MzgxNDhjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpc2FpIGd1bmRhIiwic3ViIjoiMjMwMzE1NTgtZWNlZi00NzhmLTgyNjgtZDA3Zjg4YTRkY2E0In0sImVtYWlsIjoiMjNwYTFhMDIyNEBnbWFpbC5jb20iLCJuYW1lIjoiYWRpc2FpIGd1bmRhIiwicm9sbE5vIjoiMjNwYTFhMDIyNCIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjIzMDMxNTU4LWVjZWYtNDc4Zi04MjY4LWQwN2Y4OGE0ZGNhNCIsImNsaWVudFNlY3JldCI6IkRKckN6ZXZDRG1GUWpHdkgifQ.YntsfGVHW84TN65vZNtCdDqAUPJeAXm-ZOHxsBfH4ck'

WEIGHT = {'Placement': 3, 'Result': 2, 'Event': 1}

r = requests.get('http://4.224.186.213/evaluation-service/notifications', headers={'Authorization': 'Bearer ' + TOKEN})
notifications = r.json()['notifications']

def score(n):
    w = WEIGHT.get(n['Type'], 0)
    t = datetime.strptime(n['Timestamp'], '%Y-%m-%d %H:%M:%S').timestamp()
    return w * 1e10 + t

ranked = sorted(notifications, key=score, reverse=True)[:10]

print('=== TOP 10 PRIORITY NOTIFICATIONS ===')
for i, n in enumerate(ranked, 1):
    print(str(i) + '. [' + n['Type'] + '] ' + n['Message'] + ' | ' + n['Timestamp'])
