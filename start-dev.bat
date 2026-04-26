@echo off
chcp 65001 >nul
cd /d "%~dp0"
title MICHU Labs my-etf-site dev server
echo ============================================================
echo  MICHU Labs my-etf-site - dev server
echo ============================================================
echo.

if not exist node_modules (
  echo [1/2] node_modules 없음. npm install 시작...
  call npm install
  if errorlevel 1 (
    echo.
    echo [오류] npm install 실패. 위 메시지를 확인하세요.
    pause
    exit /b 1
  )
) else (
  echo [1/2] node_modules 확인 완료
)

if not exist .env.local (
  echo.
  echo [주의] .env.local 파일이 없습니다.
  echo        - 메인 페이지는 뜨지만 ETF 가격/지표 데이터는 비어 있을 수 있음.
  echo        - .env.local.example 을 복사해 .env.local 로 만들고
  echo          Supabase 키 두 개를 채우면 정상 작동합니다.
  echo.
) else (
  echo [환경] .env.local 발견
)

echo.
echo [2/2] dev 서버 시작 - 브라우저에서  http://localhost:3000
echo        (이 창을 닫으면 서버도 종료됩니다. Ctrl+C 로도 중단 가능.)
echo.
call npm run dev
