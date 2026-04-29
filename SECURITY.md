# my-etf-site 보안 체크리스트

> 5계층 심층 방어(Defense in Depth) 적용 결과 — 2026-04-29

---

## ✅ 적용 완료

| 계층 | 항목 | 파일 | 상태 |
|------|------|------|------|
| 5 · 운영 | `.gitignore` `.env*` 차단 | `.gitignore` | ✅ 기존 |
| 5 · 운영 | `.env.example` 가이드 | `.env.example` | ✅ 신규 |
| 5 · 운영 | service_role 키 서버 전용 분리 | `collect_etf.py` | ✅ 기존 |
| 4 · 데이터 | RLS 정책 SQL 작성 | `supabase/rls_policies.sql` | ✅ 신규 |
| 3 · 앱 | 보안 헤더 (HSTS/CSP/XFO 등) | `next.config.ts` | ✅ 신규 |
| 3 · 앱 | 입력 검증 헬퍼 + Origin 체크 | `app/lib/validation.ts` | ✅ 신규 |
| 1 · 네트워크 | HTTPS / DDoS / WAF | Vercel 자동 | ✅ |

## ⏳ 사용자 수동 실행 필요 (지금 바로)

| 우선 | 작업 | 방법 | 소요 |
|------|------|------|------|
| 🔴 **1** | RLS SQL 실행 | Supabase Dashboard → SQL Editor → `supabase/rls_policies.sql` 전체 붙여넣고 RUN | 2분 |
| 🔴 **2** | RLS 적용 검증 | 같은 SQL 마지막 SELECT 결과에서 모든 테이블 `rls_enabled = true` 확인 | 1분 |
| 🟡 **3** | Vercel 환경변수 점검 | Dashboard → Settings → Environment Variables → `SUPABASE_SECRET_KEY` 가 Production 에만 있는지 확인 | 2분 |
| 🟡 **4** | GitHub Secret Scanning 활성화 | Repo → Settings → Code security → Push protection ON | 1분 |
| ⚪ **5** | 보안 헤더 검증 | 배포 후 https://securityheaders.com 에서 사이트 입력 → A 등급 이상 | 2분 |

## ⏸ 미래 작업 (Phase 2 진입 시)

| 계층 | 항목 | 가이드 |
|------|------|--------|
| 2 · 인증 | Supabase Auth 도입 | `docs/AUTH_GUIDE.md` |
| 2 · 인증 | 관리자 MFA 활성화 | 동 |
| 4 · 데이터 | `subscriptions` 테이블 RLS | `supabase/rls_policies.sql` 하단 주석 |

---

## 사고 대응 플레이북

### 시나리오 A: API 키 유출 의심
1. Supabase Dashboard → Settings → API → service_role 키 회전(Reset)
2. Vercel Dashboard → 환경변수 갱신 → 재배포
3. Anthropic Console → Claude API 키 회전(미래 X 자동화 진입 시)
4. 전체 소요 약 30분

### 시나리오 B: RLS 미설정 발견
1. `supabase/rls_policies.sql` 즉시 실행
2. 응급 조치로 anon 키를 임시 회전(접근 차단)
3. 노출 가능했던 데이터 범위 확인 후 사용자 통지 결정

### 시나리오 C: 비정상 트래픽
1. Vercel Dashboard → Firewall → 임시 차단 룰 추가
2. Supabase 로그 → Authentication 로그에서 비정상 패턴 검색

---

## 정기 점검 (월 1회 권장)

```bash
# Supabase RLS 상태
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

# 의존성 취약점
npm audit

# 환경변수 누락 시 빌드 실패하는지 확인
npm run build
```
