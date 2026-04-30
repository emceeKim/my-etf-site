import type { NextConfig } from "next";

// =====================================================================
// 보안 헤더 (3계층 · 애플리케이션)
// =====================================================================
// 적용 항목
//   - HSTS                     : HTTPS 강제 (Vercel 은 자동 HTTPS, 강화)
//   - X-Frame-Options          : 클릭재킹 방어 (iframe 임베드 차단)
//   - X-Content-Type-Options   : MIME 스니핑 방어
//   - Referrer-Policy          : 외부 링크 시 정보 누출 최소화
//   - Permissions-Policy       : 카메라/마이크/위치 등 불필요한 API 차단
//   - Content-Security-Policy  : XSS 방어 핵심 — Supabase 호출 허용 도메인 명시
// =====================================================================

const SUPABASE_HTTPS = "https://yoqqgugokrmecmkelycs.supabase.co";
const SUPABASE_WSS = "wss://yoqqgugokrmecmkelycs.supabase.co";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      `connect-src 'self' ${SUPABASE_HTTPS} ${SUPABASE_WSS}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // X-Powered-By 헤더 제거 (정보 노출 최소화)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
