"""
X 발행 스크립트 — Notion DB 직접 연동 (A안 최종)

동작 순서:
1. Notion "X outomation posting" DB에서 발행승인=O, 상태=대기 인 트윗 1개 조회 (No 오름차순)
2. X API v2로 발행
3. 발행 성공 시 해당 레코드 상태 → 발행완료, 발행일 → 오늘 날짜로 업데이트
"""
import os
import requests
from datetime import date
from requests_oauthlib import OAuth1

# ── 설정 ────────────────────────────────────────────────
NOTION_TOKEN    = os.environ["NOTION_TOKEN"]
DATABASE_ID     = "49f8bdc0535642ff81252f5f52675d95"

NOTION_HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

# ── Notion 함수 ──────────────────────────────────────────

def get_next_tweet() -> dict | None:
    """발행승인=O, 상태=대기 중 No가 가장 작은 트윗 1개 반환"""
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    payload = {
        "filter": {
            "and": [
                {"property": "발행승인", "select": {"equals": "O"}},
                {"property": "상태",    "select": {"equals": "대기"}},
            ]
        },
        "sorts": [{"property": "No", "direction": "ascending"}],
        "page_size": 1,
    }
    res = requests.post(url, headers=NOTION_HEADERS, json=payload)
    res.raise_for_status()
    results = res.json().get("results", [])
    return results[0] if results else None


def extract_tweet_text(page: dict) -> str:
    """페이지에서 트윗 텍스트 추출"""
    props = page["properties"]
    rich_text = props.get("트윗", {}).get("rich_text", [])
    return "".join(block.get("plain_text", "") for block in rich_text)


def mark_as_published(page_id: str):
    """상태 → 발행완료, 발행일 → 오늘로 업데이트"""
    url = f"https://api.notion.com/v1/pages/{page_id}"
    payload = {
        "properties": {
            "상태": {"select": {"name": "발행완료"}},
            "발행일": {"date": {"start": date.today().isoformat()}},
        }
    }
    res = requests.patch(url, headers=NOTION_HEADERS, json=payload)
    res.raise_for_status()
    print(f"✅ Notion 상태 업데이트 완료 (발행완료, {date.today()})")


# ── X 발행 함수 ──────────────────────────────────────────

def post_to_x(text: str) -> str | None:
    """X API v2로 트윗 발행. 성공 시 tweet_id 반환"""
    auth = OAuth1(
        os.environ["X_API_KEY"],
        os.environ["X_API_SECRET"],
        os.environ["X_ACCESS_TOKEN"],
        os.environ["X_ACCESS_TOKEN_SECRET"],
    )
    res = requests.post(
        "https://api.twitter.com/2/tweets",
        json={"text": text},
        auth=auth,
    )
    if res.status_code == 201:
        tweet_id = res.json()["data"]["id"]
        print(f"✅ X 발행 완료!")
        print(f"   URL: https://x.com/mckim_89/status/{tweet_id}")
        return tweet_id
    else:
        print(f"❌ X 발행 실패: {res.status_code}")
        print(f"   {res.text}")
        return None


# ── 메인 ────────────────────────────────────────────────

if __name__ == "__main__":
    print("📋 Notion DB에서 다음 트윗 조회 중...")
    page = get_next_tweet()

    if not page:
        print("⚠️ 발행할 트윗이 없습니다. (발행승인=O, 상태=대기 없음)")
        exit(0)

    tweet_text = extract_tweet_text(page)
    page_id    = page["id"]
    no         = page["properties"].get("No", {}).get("number", "?")

    print(f"📝 트윗 #{no}: {tweet_text}")
    print("-" * 50)

    tweet_id = post_to_x(tweet_text)

    if tweet_id:
        mark_as_published(page_id)
    else:
        exit(1)
