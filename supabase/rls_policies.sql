-- =====================================================================
-- my-etf-site Supabase RLS 정책 (Row Level Security)
-- =====================================================================
-- 실행 위치: Supabase Dashboard → SQL Editor → 새 쿼리 → 전체 붙여넣고 실행
-- 작성일: 2026-04-29
-- 원칙:
--   ① 공개 데이터(시세·지표) → 익명 SELECT 허용, 그 외 모두 차단
--   ② 사용자 데이터(구독·결제) → 본인 행만 접근
--   ③ 쓰기는 service_role 만 (collect_etf.py / 관리자 페이지)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. etf_prices  (공개 데이터 — 누구나 읽기 OK, 쓰기는 service_role)
-- ---------------------------------------------------------------------
ALTER TABLE public.etf_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_etf_prices" ON public.etf_prices;
CREATE POLICY "anon_select_etf_prices"
  ON public.etf_prices
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- INSERT/UPDATE/DELETE 정책은 만들지 않음 → service_role 만 가능

-- ---------------------------------------------------------------------
-- 2. economic_indicators  (공개 데이터 — 동일 패턴)
-- ---------------------------------------------------------------------
ALTER TABLE public.economic_indicators ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_economic_indicators" ON public.economic_indicators;
CREATE POLICY "anon_select_economic_indicators"
  ON public.economic_indicators
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ---------------------------------------------------------------------
-- 3. etf_holdings  (공개 데이터 — 동일 패턴, 테이블 존재 시에만)
-- ---------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_schema = 'public' AND table_name = 'etf_holdings') THEN
    EXECUTE 'ALTER TABLE public.etf_holdings ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "anon_select_etf_holdings" ON public.etf_holdings';
    EXECUTE 'CREATE POLICY "anon_select_etf_holdings" ON public.etf_holdings
              FOR SELECT TO anon, authenticated USING (true)';
  END IF;
END$$;

-- ---------------------------------------------------------------------
-- 4. ai_picks  (Phase 2 — 수익률 추적, 공개 OK)
-- ---------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_schema = 'public' AND table_name = 'ai_picks') THEN
    EXECUTE 'ALTER TABLE public.ai_picks ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "anon_select_ai_picks" ON public.ai_picks';
    EXECUTE 'CREATE POLICY "anon_select_ai_picks" ON public.ai_picks
              FOR SELECT TO anon, authenticated USING (true)';
  END IF;
END$$;

-- ---------------------------------------------------------------------
-- 5. benchmark_returns  (Phase 2 — 동일 패턴)
-- ---------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables
             WHERE table_schema = 'public' AND table_name = 'benchmark_returns') THEN
    EXECUTE 'ALTER TABLE public.benchmark_returns ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "anon_select_benchmark_returns" ON public.benchmark_returns';
    EXECUTE 'CREATE POLICY "anon_select_benchmark_returns" ON public.benchmark_returns
              FOR SELECT TO anon, authenticated USING (true)';
  END IF;
END$$;

-- ---------------------------------------------------------------------
-- 6. 미래 — 구독자 테이블 템플릿 (Phase 2 유료화 단계)
-- ---------------------------------------------------------------------
-- 아래는 구독 기능 추가 시 참고용 템플릿입니다. 지금은 주석 처리.
-- CREATE TABLE IF NOT EXISTS public.subscriptions (
--   id BIGSERIAL PRIMARY KEY,
--   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--   plan TEXT NOT NULL,
--   started_at TIMESTAMPTZ DEFAULT NOW(),
--   expires_at TIMESTAMPTZ
-- );
-- ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "users_own_subscription"
--   ON public.subscriptions
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid() = user_id);

-- =====================================================================
-- 적용 확인 SQL (실행 후 결과 확인용)
-- =====================================================================
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- 각 테이블의 정책 목록
SELECT
  schemaname,
  tablename,
  policyname,
  cmd AS command,
  roles
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
