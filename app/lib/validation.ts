// =====================================================================
// 입력 검증 헬퍼 (3계층 · 애플리케이션)
// =====================================================================
// 의존성을 늘리지 않기 위해 zod 없이 작성한 경량 검증 모듈입니다.
// 추후 zod 도입 시 동일 인터페이스로 교체 가능 (validateBody 함수만).
//
// 사용 예 (POST API 라우트):
//   const body = await req.json();
//   const result = validateBody(body, {
//     ticker: { type: "string", maxLength: 10, pattern: /^[A-Z0-9]+$/ },
//     entry_price: { type: "number", min: 0, max: 1_000_000 },
//   });
//   if (!result.ok) return badRequest(result.errors);
// =====================================================================

export type FieldRule =
  | { type: "string"; required?: boolean; maxLength?: number; minLength?: number; pattern?: RegExp }
  | { type: "number"; required?: boolean; min?: number; max?: number; integer?: boolean }
  | { type: "boolean"; required?: boolean }
  | { type: "enum"; required?: boolean; values: readonly string[] };

export type Schema = Record<string, FieldRule>;

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: string[] };

export function validateBody<T = Record<string, unknown>>(
  body: unknown,
  schema: Schema
): ValidationResult<T> {
  const errors: string[] = [];
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, errors: ["요청 본문이 객체가 아닙니다"] };
  }
  const obj = body as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  for (const [key, rule] of Object.entries(schema)) {
    const v = obj[key];
    const isMissing = v === undefined || v === null || v === "";

    if (isMissing) {
      if (rule.required) errors.push(`${key} 누락`);
      continue;
    }

    switch (rule.type) {
      case "string": {
        if (typeof v !== "string") { errors.push(`${key}: 문자열 아님`); break; }
        if (rule.minLength && v.length < rule.minLength) errors.push(`${key}: 너무 짧음`);
        if (rule.maxLength && v.length > rule.maxLength) errors.push(`${key}: 너무 김`);
        if (rule.pattern && !rule.pattern.test(v)) errors.push(`${key}: 형식 오류`);
        out[key] = v;
        break;
      }
      case "number": {
        const n = typeof v === "number" ? v : Number(v);
        if (Number.isNaN(n)) { errors.push(`${key}: 숫자 아님`); break; }
        if (rule.integer && !Number.isInteger(n)) errors.push(`${key}: 정수 아님`);
        if (rule.min !== undefined && n < rule.min) errors.push(`${key}: 최소값 미만`);
        if (rule.max !== undefined && n > rule.max) errors.push(`${key}: 최대값 초과`);
        out[key] = n;
        break;
      }
      case "boolean": {
        if (typeof v !== "boolean") { errors.push(`${key}: 불리언 아님`); break; }
        out[key] = v;
        break;
      }
      case "enum": {
        if (typeof v !== "string" || !rule.values.includes(v)) {
          errors.push(`${key}: 허용된 값 아님`);
          break;
        }
        out[key] = v;
        break;
      }
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data: out as T };
}

// ---------------------------------------------------------------------
// Origin 검증 (CSRF 방어 보조)
// ---------------------------------------------------------------------
// Server Actions 는 Next.js 가 자동 처리하지만, API 라우트는 직접 검증 필요.
const ALLOWED_ORIGINS = [
  "https://my-etf-site.vercel.app",
  "http://localhost:3000",
];

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

// ---------------------------------------------------------------------
// 표준 에러 응답
// ---------------------------------------------------------------------
export function badRequest(errors: string[]) {
  return Response.json(
    { error: "유효하지 않은 요청", details: errors },
    { status: 400 }
  );
}

export function forbidden(message = "허용되지 않은 출처") {
  return Response.json({ error: message }, { status: 403 });
}
