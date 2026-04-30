# 인증 도입 가이드 (Phase 2 — 유료 구독 시작 시)

> **현재 상태**: 회원/로그인 기능 미구현. 이 문서는 유료 구독 도입 시점의 작업 계획서입니다.

---

## 도입 트리거

다음 중 하나가 발생하면 즉시 이 가이드대로 인증을 추가합니다.

- 월간 ETF 리포트 유료 구독 페이지 신설
- 사용자별 포트폴리오 기록 기능 추가
- 댓글/북마크 등 사용자 데이터 저장 기능

---

## 작업 순서 (총 약 3시간)

### 1. Supabase Auth 활성화 (10분)

Supabase Dashboard → Authentication → Providers
- Email (필수): 매직 링크 또는 비밀번호
- Google OAuth (권장): 가입 전환율 + 보안 둘 다 향상
- 회원가입 도메인 화이트리스트 설정 (선택)

### 2. 미들웨어 추가 (30분)

`middleware.ts` 를 프로젝트 루트에 생성:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/premium', '/portfolio', '/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => response.cookies.set({ name, value, ...options }),
        remove: (name, options) => response.cookies.set({ name, value: '', ...options }),
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return response
}

export const config = {
  matcher: ['/premium/:path*', '/portfolio/:path*', '/admin/:path*'],
}
```

추가 의존성: `npm install @supabase/ssr`

### 3. RLS 정책 확장 (30분)

`supabase/rls_policies.sql` 하단의 주석 처리된 `subscriptions` 템플릿 활성화:

```sql
CREATE TABLE public.subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'monthly', 'annual')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_subscription"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 결제 완료 시 row 삽입은 service_role 또는 결제 webhook 에서만
```

### 4. 2단계 인증(MFA) 옵션 (10분)

Supabase Dashboard → Authentication → MFA → Enable TOTP
- 관리자 계정(주인님)은 **반드시 활성화**
- 일반 사용자는 선택, UI에 "보안 강화" 배너로 권장

### 5. 비밀번호 정책 강화 (5분)

Supabase Dashboard → Authentication → Policies
- 최소 길이 12자
- 노출된 비밀번호 차단(Have I Been Pwned 통합)

### 6. 로그인 UI (1시간)

`/login` 페이지에 매직 링크 + Google OAuth 버튼만 두는 미니멀 폼.
Supabase Auth UI 라이브러리 사용 시 30분으로 단축 가능.

---

## 주의사항

1. **service_role 키는 절대 클라이언트에 노출 금지** — 미들웨어에서도 `SUPABASE_SECRET_KEY` 사용 금지, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 만 사용
2. **세션 토큰 만료** — 기본 1주일. 결제 페이지 같은 민감 액션은 별도 재인증 권장
3. **이메일 가입 후 즉시 결제 차단** — 최소 24시간 대기 또는 카드 인증 추가 (피싱 방어)

---

## 관련 문서

- `supabase/rls_policies.sql` — RLS 정책 본체
- `wiki/tools/홈페이지-보안-5계층.md` — 전체 보안 프레임워크
