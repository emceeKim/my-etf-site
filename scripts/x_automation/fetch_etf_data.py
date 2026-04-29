"""
STEP 1: Supabase에서 어제 ETF 데이터 수집
"""
import os
import json
from supabase import create_client
from datetime import date, timedelta

def fetch_yesterday_etf():
    supabase = create_client(
        os.environ["SUPABASE_URL"],
        os.environ["SUPABASE_KEY"]
    )
    yesterday = (date.today() - timedelta(days=1)).isoformat()

    result = supabase.table("etf_prices") \
        .select("ticker, close_price, volume, change_pct") \
        .eq("date", yesterday) \
        .in_("ticker", ["SOXX", "XLV", "ITA", "SPY"]) \
        .execute()

    return result.data

if __name__ == "__main__":
    data = fetch_yesterday_etf()

    if not data:
        print("⚠️ 어제 ETF 데이터 없음 (휴장일 가능성)")
        # 빈 데이터로 더미 생성 (워크플로우 중단 방지)
        data = [
            {"ticker": "SOXX", "close_price": 0, "volume": 0, "change_pct": 0},
            {"ticker": "SPY",  "close_price": 0, "volume": 0, "change_pct": 0},
        ]

    with open("etf_data.json", "w") as f:
        json.dump(data, f, ensure_ascii=False)

    print(f"✅ ETF 데이터 {len(data)}건 수집 완료")
    for d in data:
        print(f"  {d['ticker']}: {d.get('change_pct', 0):+.2f}%")
