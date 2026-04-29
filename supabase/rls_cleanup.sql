-- =====================================================================
-- 응급조치 정리 SQL — 과거 'allow_all' 정책 제거
-- =====================================================================
-- 배경:
--   GitHub Actions 권한 오류 디버깅 시기에 임시로 만든 'allow_all' 정책이
--   여전히 살아 있어, RLS 가 켜져 있어도 익명 사용자가 INSERT/UPDATE/DELETE
--   가능한 상태였습니다.
--
--   현재 collect_etf.py 는 service_role 키 사용 → RLS 자동 우회 → allow_all 불필요.
--   따라서 이 정책을 제거해도 데이터 수집은 정상 작동합니다.
-- =====================================================================

-- 1. allow_all 정책 제거
DROP POLICY IF EXISTS "allow_all" ON public.etf_prices;
DROP POLICY IF EXISTS "allow_all" ON public.economic_indicators;

-- 혹시 다른 이름의 광범위 정책이 있다면 같이 제거 (필요 시 주석 해제)
-- DROP POLICY IF EXISTS "Enable all access for all users" ON public.etf_prices;
-- DROP POLICY IF EXISTS "Enable all access for all users" ON public.economic_indicators;

-- 2. 정리 후 상태 확인
SELECT
  schemaname,
  tablename,
  policyname,
  cmd AS command,
  roles
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================================
-- 기대 결과:
--   각 테이블당 anon_select_* 정책 1개씩만 남아야 합니다.
--   etf_prices            | anon_select_etf_prices            | SELECT | {anon,authenticated}
--   economic_indicators   | anon_select_economic_indicators   | SELECT | {anon,authenticated}
-- =====================================================================

-- 3. 데이터 수집이 여전히 잘 되는지 확인 (선택)
--   GitHub Actions 다음 실행 후 etf_prices 테이블에 오늘 날짜 row 가
--   추가되는지 보면 됩니다. service_role 키가 RLS 를 우회하므로 정상 작동해야 합니다.
SELECT date, COUNT(*) AS row_count
FROM public.etf_prices
GROUP BY date
ORDER BY date DESC
LIMIT 5;
