"""
X 순차 발행 스크립트 (A안)
- tweets.json의 트윗을 날짜 기반으로 순서대로 1개 발행
- Anthropic API 불필요
- 30개 트윗이 30일 주기로 순환
"""
import os
import json
import requests
from datetime import date
from requests_oauthlib import OAuth1


def load_tweets() -> list:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    tweets_path = os.path.join(script_dir, "tweets.json")
    with open(tweets_path, encoding="utf-8") as f:
        return json.load(f)


def pick_tweet(tweets: list) -> tuple[int, str]:
    """오늘 날짜 기준으로 트윗 1개 선택 (순환)"""
    day_of_year = date.today().timetuple().tm_yday
    index = day_of_year % len(tweets)
    return index, tweets[index]


def post_tweet(text: str) -> bool:
    auth = OAuth1(
        os.environ["X_API_KEY"],
        os.environ["X_API_SECRET"],
        os.environ["X_ACCESS_TOKEN"],
        os.environ["X_ACCESS_TOKEN_SECRET"]
    )

    response = requests.post(
        "https://api.twitter.com/2/tweets",
        json={"text": text},
        auth=auth
    )

    if response.status_code == 201:
        tweet_id = response.json()["data"]["id"]
        print(f"✅ 발행 완료!")
        print(f"   URL: https://x.com/mckim_89/status/{tweet_id}")
        print(f"   내용: {text[:50]}...")
        return True
    else:
        print(f"❌ 발행 실패: {response.status_code}")
        print(f"   {response.text}")
        return False


if __name__ == "__main__":
    tweets = load_tweets()
    index, tweet = pick_tweet(tweets)

    print(f"📅 오늘({date.today()}) — 트윗 #{index + 1}/{len(tweets)}")
    print(f"📝 내용: {tweet}")
    print("-" * 50)

    success = post_tweet(tweet)
    if not success:
        exit(1)
