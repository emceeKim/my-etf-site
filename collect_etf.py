import yfinance as yf
from supabase import create_client
from datetime import date
import os

# Supabase 연결
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SECRET_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

today = date.today().isoformat()

# ETF 목록
etf_list = ["QQQ", "SPY", "IEF"]

print(f"ETF 데이터 수집 시작: {today}")

for ticker_symbol in etf_list:
    try:
        ticker = yf.Ticker(ticker_symbol)
        info = ticker.fast_info

        price = round(float(info.last_price), 2)
        prev_close = round(float(info.previous_close), 2)
        change_pct = round((price - prev_close) / prev_close * 100, 2)
        volume = int(info.three_month_average_volume or 0)

        # Supabase에 저장 (오늘 날짜 데이터가 있으면 업데이트)
        existing = supabase.table("etf_prices") \
            .select("id") \
            .eq("ticker", ticker_symbol) \
            .eq("date", today) \
            .execute()

        if existing.data:
            supabase.table("etf_prices") \
                .update({
                    "price": price,
                    "change_pct": change_pct,
                    "volume": volume
                }) \
                .eq("ticker", ticker_symbol) \
                .eq("date", today) \
                .execute()
            print(f"{ticker_symbol}: 업데이트 완료 (${price}, {change_pct}%)")
        else:
            supabase.table("etf_prices") \
                .insert({
                    "ticker": ticker_symbol,
                    "price": price,
                    "change_pct": change_pct,
                    "volume": volume,
                    "date": today
                }) \
                .execute()
            print(f"{ticker_symbol}: 신규 저장 완료 (${price}, {change_pct}%)")

    except Exception as e:
        print(f"{ticker_symbol} 오류: {e}")

# 경제지표 저장
indicators = [
    {"name": "ISM PMI", "value": 48.7, "status": "위험"},
    {"name": "장단기금리차", "value": -0.3, "status": "위험"},
    {"name": "실업률", "value": 4.4, "status": "주의"},
    {"name": "PCE 인플레이션", "value": 2.7, "status": "주의"},
    {"name": "VIX 공포지수", "value": 18.2, "status": "보통"},
]

print("\n경제지표 저장 중...")

for ind in indicators:
    try:
        existing = supabase.table("economic_indicators") \
            .select("id") \
            .eq("name", ind["name"]) \
            .eq("date", today) \
            .execute()

        if existing.data:
            supabase.table("economic_indicators") \
                .update({
                    "value": ind["value"],
                    "status": ind["status"]
                }) \
                .eq("name", ind["name"]) \
                .eq("date", today) \
                .execute()
        else:
            supabase.table("economic_indicators") \
                .insert({
                    "name": ind["name"],
                    "value": ind["value"],
                    "status": ind["status"],
                    "date": today
                }) \
                .execute()
        print(f"{ind['name']}: 저장 완료")
    except Exception as e:
        print(f"{ind['name']} 오류: {e}")

print("\n전체 데이터 수집 완료!")
