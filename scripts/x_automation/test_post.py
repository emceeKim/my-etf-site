"""
X 테스트 포스팅 스크립트
단일 트윗 1개만 발행
"""
import os
import requests
from requests_oauthlib import OAuth1

def post_single_tweet(text: str) -> bool:
    auth = OAuth1(
        os.environ["X_API_KEY"],
        os.environ["X_API_SECRET"],
        os.environ["X_ACCESS_TOKEN"],
        os.environ["X_ACCESS_TOKEN_SECRET"]
    )

    url = "https://api.twitter.com/2/tweets"
    response = requests.post(url, json={"text": text}, auth=auth)

    if response.status_code == 201:
        tweet_id = response.json()["data"]["id"]
        print(f"✅ 발행 완료!")
        print(f"   URL: https://x.com/mckim_89/status/{tweet_id}")
        return True
    else:
        print(f"❌ 실패: {response.status_code}")
        print(f"   {response.text}")
        return False

if __name__ == "__main__":
    post_single_tweet("test")
