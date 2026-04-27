import yfinance as yf
from supabase import create_client
from datetime import date
import os
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SECRET_KEY")

# ── ETF 가격 수집
tickers = ["QQQ", "SPY", "IEF"]

for ticker in tickers:
    try:
        t = yf.Ticker(ticker)
        hist = t.history(period="2d")
        if hist.empty:
            print(f"[WARN] {ticker} 데이터 없음")
            continue
        latest = hist.iloc[-1]
        prev   = hist.iloc[-2] if len(hist) >= 2 else latest
        price  = round(float(latest["Close"]), 2)
        change = round(float((latest["Close"] - prev["Close"]) / prev["Close"] * 100), 2)
        volume = int(latest["Volume"])
        row = {"ticker": ticker, "price": price,
               "change_pct": change, "volume": volume, "date": today}
        supabase.table("etf_prices").upsert(row, on_conflict="ticker,date").execute()
        print(f"[OK] {ticker}: ${price} ({change:+.2f}%)")
    except Exception as e:
        print(f"[ERROR] {ticker}: {e}")

# ── 경제지표 수집
indicators = {
    "미국 10년 국채금리": "^TNX",
    "S&P 500":          "^GSPC",
    "나스닥":            "^IXIC",
    "달러 인덱스":        "DX-Y.NYB",
    "VIX 공포지수":      "^VIX",
}

for name, symbol in indicators.items():
    try:
        t    = yf.Ticker(symbol)
        hist = t.history(period="2d")
        if hist.empty:
            print(f"[WARN] {name} 데이터 없음")
            continue
        latest = hist.iloc[-1]
        prev   = hist.iloc[-2] if len(hist) >= 2 else latest
        value  = round(float(latest["Close"]), 2)
        change = round(float(latest["Close"] - prev["Close"]), 4)
        status = "상승" if change > 0 else ("하락" if change < 0 else "보합")
        row = {"name": name, "value": value,
               "status": status, "date": today}
        supabase.table("economic_indicators").upsert(row, on_conflict="name,date").execute()
        print(f"[OK] {name}: {value} ({status})")
    except Exception as e:
        print(f"[ERROR] {name}: {e}")

print("완료!")
