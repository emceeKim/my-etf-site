"""
STEP 3: X API로 스레드 발행 (OAuth 1.0)
"""
import os
import json
import requests
from requests_oauthlib import OAuth1

def post_thread(tweets: list) -> bool:
    auth = OAuth1(
        os.environ["X_API_KEY"],
        os.environ["X_API_SECRET"],
        os.environ["X_ACCESS_TOKEN"],
        os.environ["X_ACCESS_TOKEN_SECRET"]
    )

    url = "https://api.twitter.com/2/tweets"
    posted_ids = []

    for i, tweet_text in enumerate(tweets):
        payload = {"text": tweet_text}

        # 첫 번째 이후는 직전 트윗에 reply → 스레드 완성
        if posted_ids:
            payload["reply"] = {"in_reply_to_tweet_id": posted_ids[-1]}

        response = requests.post(url, json=payload, auth=auth)

        if response.status_code == 201:
            tweet_id = response.json()["data"]["id"]
            posted_ids.append(tweet_id)
            print(f"✅ 트윗 {i+1}/5 발행 완료 | ID: {tweet_id}")
        else:
            print(f"❌ 트윗 {i+1} 실패")
            print(f"   상태코드: {response.status_code}")
            print(f"   응답: {response.text}")
            return False

    print(f"\n🎉 스레드 발행 완료! 총 {len(posted_ids)}개")
    print(f"   첫 트윗 URL: https://x.com/mckim_89/status/{posted_ids[0]}")
    return True

if __name__ == "__main__":
    with open("thread.json") as f:
        tweets = json.load(f)

    print("📤 X 스레드 발행 시작...")
    print("-" * 40)
    for i, t in enumerate(tweets, 1):
        print(f"[{i}] {t}")
    print("-" * 40)

    success = post_thread(tweets)
    if not success:
        exit(1)
