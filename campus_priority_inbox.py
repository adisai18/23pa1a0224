import requests
from datetime import datetime

# Auth
TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWEwMjI0QGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4MDgyNCwiaWF0IjoxNzgyMzc5OTI0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZWRlMWM1ZDMtNmM4NC00YjU2LWFkN2ItNDJhNjY5MzgxNDhjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpc2FpIGd1bmRhIiwic3ViIjoiMjMwMzE1NTgtZWNlZi00NzhmLTgyNjgtZDA3Zjg4YTRkY2E0In0sImVtYWlsIjoiMjNwYTFhMDIyNEBnbWFpbC5jb20iLCJuYW1lIjoiYWRpc2FpIGd1bmRhIiwicm9sbE5vIjoiMjNwYTFhMDIyNCIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjIzMDMxNTU4LWVjZWYtNDc4Zi04MjY4LWQwN2Y4OGE0ZGNhNCIsImNsaWVudFNlY3JldCI6IkRKckN6ZXZDRG1GUWpHdkgifQ.YntsfGVHW84TN65vZNtCdDqAUPJeAXm-ZOHxsBfH4ck'

API_URL = 'http://4.224.186.213/evaluation-service/notifications'

# Weight: Placement > Result > Event
WEIGHT = {'Placement': 3, 'Result': 2, 'Event': 1}


def fetch_notifications():
    r = requests.get(API_URL, headers={'Authorization': 'Bearer ' + TOKEN})
    if r.status_code != 200:
        print('Error fetching notifications:', r.text)
        return []
    return r.json()['notifications']


def score(notification):
    w = WEIGHT.get(notification['Type'], 0)
    t = datetime.strptime(notification['Timestamp'], '%Y-%m-%d %H:%M:%S').timestamp()
    # Weight is primary factor, recency is tiebreaker
    return w * 1e10 + t


def get_priority_inbox(n=10):
    notifications = fetch_notifications()
    ranked = sorted(notifications, key=score, reverse=True)[:n]

    print('=== TOP ' + str(n) + ' PRIORITY NOTIFICATIONS ===\n')
    for i, notif in enumerate(ranked, 1):
        print(str(i) + '. [' + notif['Type'] + '] ' + notif['Message'])
        print('   ID: ' + notif['ID'])
        print('   Time: ' + notif['Timestamp'])
        print()

    return ranked


if __name__ == '__main__':
    get_priority_inbox(10)