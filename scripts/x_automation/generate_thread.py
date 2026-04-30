"""
STEP 2: Claude Haiku로 X 스레드 5개 생성
※ ANTHROPIC_API_KEY 등록 후 활성화
"""
import os
import json
import anthropic

def generate_x_thread(etf_data: list) -> list:
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    data_str = json.dumps(etf_data, ensure_ascii=False, indent=2)

    prompt = f"""당신은 MC AI Labs의 ETF 분석가입니다.
아래 ETF 데이터를 바탕으로 X(트위터) 스레드 5개를 작성하세요.

[ETF 데이터]
{data_str}

[스레드 구조 — 반드시 준수]
트윗1 (훅): 반박 가능한 도발적 주장 1줄. 숫자 포함. 130자 이내.
트윗2 (데이터): 주장의 근거 수치. "어제 SOXX는 XX% 변동했고..." 형식. 130자 이내.
트윗3 (반론): "그런데 대부분이 모르는 것은..." 형식으로 반전. 130자 이내.
트윗4 (인사이트): AI 4인 토론에서 나온 핵심 결론 1줄. 130자 이내.
트윗5 (CTA): "수익률 공개 추적 중 👉 etfinsight.vercel.app" 포함. 130자 이내.

[출력] JSON 배열만. 다른 텍스트 금지.
["트윗1", "트윗2", "트윗3", "트윗4", "트윗5"]"""

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = response.content[0].text.strip()

    # JSON 파싱 안전 처리
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]

    tweets = json.loads(raw)
    return tweets

if __name__ == "__main__":
    with open("etf_data.json") as f:
        etf_data = json.load(f)

    tweets = generate_x_thread(etf_data)

    with open("thread.json", "w") as f:
        json.dump(tweets, f, ensure_ascii=False, indent=2)

    print("✅ 스레드 생성 완료:")
    for i, t in enumerate(tweets, 1):
        print(f"  [{i}] {t[:60]}...")
