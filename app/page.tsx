"use client";
import { useState } from "react";

export default function Home() {
  const [activeProfile, setActiveProfile] = useState(0);
  const [activeStep, setActiveStep] = useState(2);

  const profiles = [
    {
      emoji: "🛡",
      label: "안정 추구형",
      desc: "원금 보존 최우선. 수익보다 손실 최소화를 더 중시합니다.",
      risk: 25,
      riskColor: "#3EC97A",
    },
    {
      emoji: "⚖️",
      label: "균형 추구형",
      desc: "수익과 안정 사이의 균형을 원합니다. 단기 손실은 감내 가능합니다.",
      risk: 55,
      riskColor: "#E8A838",
    },
    {
      emoji: "🚀",
      label: "성장 추구형",
      desc: "고수익을 목표로, 높은 변동성과 단기 손실을 기꺼이 감수합니다.",
      risk: 85,
      riskColor: "#E05252",
    },
  ];
  const indicators = [
    { name: "ISM 제조업 PMI", value: "48.7", status: "danger", statusLabel: "위험", desc: "수축권 — 50 미만 3개월 연속", criterion: "50 미만 → 수축 신호", source: "ISM (2026.04)" },
    { name: "장단기 금리차 (10Y–2Y)", value: "–0.3%", status: "danger", statusLabel: "위험", desc: "역전 지속 — 경기침체 선행 신호", criterion: "음수(역전) → 위험", source: "Fed FRED (2026.04)" },
    { name: "실업률 (U-3)", value: "4.4%", status: "warn", statusLabel: "주의", desc: "3개월 연속 상승 추세", criterion: "4.0~4.5% → 주의", source: "BLS (2026.04)" },
    { name: "PCE 인플레이션", value: "2.7%", status: "warn", statusLabel: "주의", desc: "Fed 목표치 2% 상회 지속", criterion: "2~3% → 주의", source: "BEA / Fed (2026.04)" },
    { name: "S&P 500", value: "5,400", status: "safe", statusLabel: "안정", desc: "200일 이동평균선 위 유지", criterion: "200일 MA 상회 → 안정", source: "Yahoo Finance (2026.04)" },
    { name: "VIX 공포 지수", value: "18.2", status: "safe", statusLabel: "안정", desc: "20 미만 — 안정권 유지", criterion: "20 미만 → 안정", source: "CBOE (2026.04)" },
  ];

  const portfolio = [
    { color: "#00D2C8", name: "KODEX 반도체", meta: "삼성자산운용 · 국내상장 · 보수 0.45%", ratio: 40, reason: "HBM4 양산 본격화, AI 데이터센터 수요 증가로 반도체 섹터 구조적 성장 국면 포착 (알고리즘 판단)" },
    { color: "#7C5FD0", name: "TIGER 나스닥100", meta: "미래에셋자산운용 · 국내상장 · 보수 0.07%", ratio: 30, reason: "빅테크 AI 수익화 단계 진입, 코어 ETF로서 포트폴리오 안정성 기여 (알고리즘 판단)" },
    { color: "#E8A838", name: "HANARO 전력인프라", meta: "NH아문디자산운용 · 국내상장 · 보수 0.45%", ratio: 20, reason: "AI 데이터센터 전력 수요 급증, 전력인프라 구조적 성장 테마 포착 (알고리즘 판단)" },
    { color: "#3EC97A", name: "ACE 고배당가치주", meta: "한국투자신탁운용 · 국내상장 · 보수 0.29%", ratio: 10, reason: "고배당 방어 성격으로 포트폴리오 변동성 완충 역할 기대 (알고리즘 판단)" },
  ];

  const logicFilters = [
    { filter: "F1 (추세)", cond: "200일MA 위", val: "S&P 5,400", pass: true },
    { filter: "F2 (변동성)", cond: "VIX < 25", val: "VIX 18.2", pass: true },
    { filter: "F3 (모멘텀)", cond: "반도체 3M > 0%", val: "+12.4%", pass: true },
    { filter: "F4 (펀더멘털)", cond: "PCE < 3%", val: "2.7%", pass: true },
    { filter: "DCB (경기)", cond: "PMI > 47", val: "48.7", pass: true },
    { filter: "장단기차", cond: "양수 권장", val: "–0.3%", pass: false },
  ];

  const devilScenarios = [
    {
      num: "시나리오 1", title: "대중국 수출 규제 강화",
      desc: "미국의 반도체 수출 규제가 추가 확대될 경우, KODEX 반도체 편입 종목(SK하이닉스 등)에 직접 충격 가능",
      prob: "~25%", loss: "–18%",
    },
    {
      num: "시나리오 2", title: "AI Capex 급감",
      desc: "빅테크 AI 투자가 예상보다 빠르게 축소될 경우, 반도체·전력인프라 수혜 시점이 지연될 위험",
      prob: "~18%", loss: "–12%",
    },
    {
      num: "시나리오 3", title: "알고리즘 데이터 편향",
      desc: "이 알고리즘은 2024–2026년 데이터로 훈련됨. 이 구간 외 시장 패턴에 대한 대응력 미검증",
      prob: "구조적", loss: "ACE 10%",
    },
  ];
  const steps = [
    { num: "✓", label: "투자자 유형", state: "done" },
    { num: "✓", label: "시장 국면", state: "done" },
    { num: "3", label: "매칭 결과", state: "current" },
    { num: "4", label: "검증 인터페이스", state: "pending" },
    { num: "5", label: "본인 판단", state: "pending" },
  ];

  const trackStats = [
    { num: "+18.4%", positive: true, label: "12개월 누적 수익률", note: "vs KOSPI +6.2% (2025.04–2026.04)" },
    { num: "73%", positive: false, label: "월별 방향 적중률", note: "12개월 중 9개월 정방향 (n=12)" },
    { num: "–14.2%", positive: false, negative: true, label: "최대 낙폭 (MDD)", note: "2025년 8월 조정 구간" },
    { num: "1.29", positive: false, label: "샤프 지수", note: "무위험수익률 3.5% 기준" },
  ];

  const s: React.CSSProperties & Record<string, string> = {};

  const badgeStyle = (status: string) => {
    if (status === "danger") return { background: "rgba(224,82,82,0.10)", color: "#E05252", border: "1px solid rgba(224,82,82,0.2)" };
    if (status === "warn") return { background: "rgba(245,166,35,0.10)", color: "#E8A838", border: "1px solid rgba(232,168,56,0.2)" };
    return { background: "rgba(62,201,122,0.10)", color: "#3EC97A", border: "1px solid rgba(62,201,122,0.2)" };
  };

  const badgeIcon = (status: string) => {
    if (status === "danger") return "▲";
    if (status === "warn") return "◆";
    return "✓";
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif; background: #060912; color: #F0F4FF; min-height: 100vh; overflow-x: hidden; }
        .etf-wrap { max-width: 960px; margin: 0 auto; padding: 0 20px 80px; }
        .etf-header { position: sticky; top: 0; z-index: 100; backdrop-filter: blur(20px); background: rgba(6,9,18,0.85); border-bottom: 1px solid rgba(255,255,255,0.07); padding: 14px 20px; }
        .etf-header-inner { max-width: 960px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .etf-logo-brand { font-size: 10px; font-weight: 700; color: #00D2C8; letter-spacing: 2px; }
        .etf-logo-product { font-size: 18px; font-weight: 800; color: #F0F4FF; }
        .etf-nav { display: flex; gap: 2px; }
        .etf-nav-btn { padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; background: transparent; color: #8899BB; }
        .legal-bar { background: rgba(245,166,35,0.10); border: 1px solid rgba(245,166,35,0.22); border-radius: 10px; padding: 11px 16px; margin: 24px 0 32px; display: flex; align-items: flex-start; gap: 10px; }
        .legal-text { font-size: 11.5px; color: #D4A84B; line-height: 1.6; font-weight: 500; }
        .legal-text strong { color: #F5C842; }
        .wizard-progress { display: flex; align-items: center; margin-bottom: 40px; overflow-x: auto; padding-bottom: 4px; }
        .step-pill { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 100px; font-size: 12px; font-weight: 700; border: 1px solid transparent; white-space: nowrap; cursor: pointer; }
        .step-pill.done { background: rgba(0,210,200,0.12); color: #00D2C8; border-color: rgba(0,210,200,0.25); }
        .step-pill.current { background: #00D2C8; color: #060912; }
        .step-pill.pending { background: transparent; color: #4A5878; border-color: rgba(255,255,255,0.07); }
        .step-num { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; }
        .step-pill.done .step-num { background: #00D2C8; color: #060912; }
        .step-pill.current .step-num { background: rgba(0,0,0,0.2); color: #060912; }
        .step-pill.pending .step-num { background: #131e33; color: #4A5878; }
        .step-connector { width: 28px; height: 1px; background: rgba(255,255,255,0.07); flex-shrink: 0; }
        .section-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #00D2C8; text-transform: uppercase; margin-bottom: 10px; }
        .section-tag::before { content: ''; display: block; width: 14px; height: 2px; background: #00D2C8; border-radius: 2px; }
        .section-title { font-size: 22px; font-weight: 800; color: #F0F4FF; margin-bottom: 6px; line-height: 1.3; }
        .section-sub { font-size: 13px; color: #8899BB; margin-bottom: 28px; line-height: 1.6; }
        .profile-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .profile-card { background: #0D1525; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px; cursor: pointer; position: relative; }
        .profile-card.selected { border-color: #00D2C8; background: rgba(0,210,200,0.12); }
        .profile-card.selected::after { content: '✓'; position: absolute; top: 12px; right: 12px; width: 20px; height: 20px; border-radius: 50%; background: #00D2C8; color: #060912; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .profile-emoji { font-size: 22px; margin-bottom: 10px; }
        .profile-label { font-size: 13px; font-weight: 700; color: #F0F4FF; margin-bottom: 4px; }
        .profile-desc { font-size: 11px; color: #8899BB; line-height: 1.5; }
        .profile-risk { margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.07); font-size: 10px; color: #4A5878; }
        .risk-bar { height: 3px; background: rgba(255,255,255,0.07); border-radius: 2px; margin-top: 5px; }
        .market-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .indicator-card { background: #0D1525; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px; }
        .ind-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .ind-name { font-size: 11px; font-weight: 600; color: #8899BB; }
        .sig-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 100px; }
        .ind-value { font-size: 28px; font-weight: 800; color: #F0F4FF; margin-bottom: 3px; }
        .ind-desc { font-size: 11px; color: #8899BB; margin-bottom: 10px; }
        .ind-criterion { padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.07); font-size: 10px; color: #4A5878; line-height: 1.5; }
        .market-summary { margin-top: 16px; background: #0D1525; border: 1px solid rgba(0,210,200,0.25); border-radius: 14px; padding: 20px 24px; display: flex; align-items: center; gap: 20px; }
        .market-phase-label { font-size: 11px; color: #8899BB; margin-bottom: 4px; }
        .market-phase-name { font-size: 20px; font-weight: 800; color: #F0F4FF; }
        .market-phase-note { font-size: 11px; color: #00D2C8; margin-top: 2px; }
        .market-divider { width: 1px; height: 48px; background: rgba(255,255,255,0.07); flex-shrink: 0; }
        .market-gauge { flex: 1; }
        .gauge-label { font-size: 10px; color: #4A5878; margin-bottom: 6px; display: flex; justify-content: space-between; }
        .gauge-track { height: 6px; background: rgba(255,255,255,0.07); border-radius: 3px; position: relative; }
        .gauge-fill { height: 6px; border-radius: 3px; background: linear-gradient(90deg, #3EC97A, #E8A838, #E05252); width: 100%; }
        .gauge-cursor { position: absolute; top: -3px; width: 12px; height: 12px; border-radius: 50%; background: #F0F4FF; border: 2px solid #060912; transform: translateX(-50%); }
        .track-banner { background: #0D1525; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 20px 24px; margin-bottom: 56px; display: flex; align-items: stretch; overflow: hidden; }
        .track-stat { flex: 1; text-align: center; padding: 0 20px; border-right: 1px solid rgba(255,255,255,0.07); }
        .track-stat:last-child { border-right: none; }
        .track-num { font-size: 26px; font-weight: 800; color: #F0F4FF; margin-bottom: 3px; }
        .track-label { font-size: 10px; color: #8899BB; }
        .track-note { font-size: 9px; color: #4A5878; margin-top: 3px; }
        .match-note { background: rgba(0,210,200,0.12); border: 1px solid rgba(0,210,200,0.25); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #00D2C8; font-weight: 500; line-height: 1.6; }
        .etf-list { display: flex; flex-direction: column; gap: 10px; }
        .etf-row { background: #0D1525; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px 18px; display: flex; align-items: center; gap: 16px; }
        .etf-color-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
        .etf-info { flex: 1; }
        .etf-name { font-size: 14px; font-weight: 700; color: #F0F4FF; }
        .etf-meta { font-size: 11px; color: #8899BB; margin-top: 2px; }
        .etf-ratio { font-size: 22px; font-weight: 800; flex-shrink: 0; }
        .etf-reason { font-size: 10px; color: #4A5878; margin-top: 4px; line-height: 1.4; }
        .verify-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .verify-card { background: #0D1525; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 22px; }
        .verify-card-title { font-size: 12px; font-weight: 700; color: #8899BB; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .verify-card-title .vdot { width: 6px; height: 6px; border-radius: 50%; background: #00D2C8; }
        .backtest-legend { display: flex; gap: 16px; margin-bottom: 12px; }
        .bt-leg-item { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #8899BB; }
        .bt-leg-color { width: 16px; height: 2px; border-radius: 1px; }
        .logic-table { width: 100%; border-collapse: collapse; font-size: 11px; }
        .logic-table th { text-align: left; padding: 6px 8px; color: #4A5878; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .logic-table td { padding: 8px 8px; color: #8899BB; border-bottom: 1px solid rgba(255,255,255,0.07); vertical-align: top; }
        .logic-table tr:last-child td { border-bottom: none; }
        .logic-val { color: #00D2C8; font-weight: 700; }
        .logic-pass { color: #3EC97A; font-weight: 700; font-size: 10px; }
        .logic-fail { color: #E05252; font-weight: 700; font-size: 10px; }
        .devil-card { background: #0D1525; border: 1px solid rgba(224,82,82,0.22); border-radius: 14px; padding: 22px; grid-column: span 2; }
        .devil-card-title { font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; color: #E05252; }
        .devil-card-title .ddot { width: 6px; height: 6px; border-radius: 50%; background: #E05252; }
        .devil-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .devil-scenario { background: rgba(224,82,82,0.10); border: 1px solid rgba(224,82,82,0.18); border-radius: 10px; padding: 14px; }
        .devil-num { font-size: 11px; font-weight: 700; color: #E05252; margin-bottom: 6px; }
        .devil-title { font-size: 12px; font-weight: 700; color: #F0F4FF; margin-bottom: 6px; }
        .devil-desc { font-size: 10px; color: #8899BB; line-height: 1.6; }
        .devil-quant { margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(224,82,82,0.15); display: flex; gap: 14px; }
        .devil-stat-label { font-size: 9px; color: #4A5878; margin-bottom: 2px; }
        .devil-stat-val { font-size: 13px; font-weight: 800; color: #E05252; }
        .decision-box { background: #0D1525; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 28px; }
        .decision-affirm { background: rgba(0,210,200,0.12); border: 1px solid rgba(0,210,200,0.25); border-radius: 10px; padding: 16px 20px; margin-bottom: 16px; font-size: 12px; color: #8899BB; line-height: 1.7; }
        .decision-affirm strong { color: #00D2C8; }
        .decision-buttons { display: flex; gap: 12px; flex-wrap: wrap; }
        .decision-btn { padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; font-family: inherit; }
        .decision-btn.primary { background: #00D2C8; color: #060912; }
        .decision-btn.secondary { background: transparent; color: #8899BB; border: 1px solid rgba(255,255,255,0.07); }
        .etf-footer { border-top: 1px solid rgba(255,255,255,0.07); padding: 24px 20px; text-align: center; font-size: 10px; color: #4A5878; line-height: 1.7; }
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr 1fr; }
          .market-grid { grid-template-columns: 1fr 1fr; }
          .verify-grid { grid-template-columns: 1fr; }
          .devil-card { grid-column: span 1; }
          .devil-grid { grid-template-columns: 1fr; }
          .track-banner { flex-wrap: wrap; }
          .track-stat { flex: 1 1 40%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); padding: 12px 0; }
          .track-stat:last-child { border-bottom: none; }
          .market-summary { flex-direction: column; align-items: flex-start; }
          .market-divider { width: 100%; height: 1px; }
          .etf-nav { display: none; }
        }
        @media (max-width: 480px) {
          .profile-grid { grid-template-columns: 1fr; }
          .market-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 18px; }
          .ind-value { font-size: 22px; }
          .decision-buttons { flex-direction: column; }
          .decision-btn { text-align: center; }
        }
      `}</style>
      {/* HEADER */}
      <header className="etf-header">
        <div className="etf-header-inner">
          <div>
            <div className="etf-logo-brand">MIC AI LABS</div>
            <div className="etf-logo-product">ETF Insight</div>
          </div>
          <nav className="etf-nav">
            <button className="etf-nav-btn" style={{ background: "transparent", color: "#8899BB" }}>AI 분석</button>
            <button className="etf-nav-btn">백테스트</button>
            <button className="etf-nav-btn">로직 공개</button>
          </nav>
        </div>
      </header>

      <div className="etf-wrap">
        {/* LEGAL BAR */}
        <div className="legal-bar">
          <span style={{ fontSize: 13, marginTop: 1, flexShrink: 0 }}>⚠</span>
          <span className="legal-text">
            본 서비스는 <strong>투자자문업 미등록 정보 제공 서비스</strong>입니다. 아래 분석은 알고리즘 기반 참고 정보이며, 특정 ETF 매수·매도를 권유하지 않습니다. 투자 판단과 그 결과에 대한 책임은 전적으로 투자자 본인에게 있습니다. <strong>[자본시장법 제17조, 제46조 준수]</strong>
          </span>
        </div>

        {/* WIZARD PROGRESS */}
        <div className="wizard-progress">
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div className={`step-pill ${step.state}`}>
                <span className="step-num">{step.num}</span> {step.label}
              </div>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>

        {/* STEP 1 — 투자자 유형 */}
        <section style={{ marginBottom: 56 }}>
          <div className="section-tag">Step 1</div>
          <h2 className="section-title">나는 어떤 투자자인가요?</h2>
          <p className="section-sub">투자 성향을 먼저 정의하면, 이 분석이 내 상황에 얼마나 맞는지 파악할 수 있습니다.<br />한 가지를 선택하세요.</p>
          <div className="profile-grid">
            {profiles.map((p, i) => (
              <div key={i} className={`profile-card ${activeProfile === i ? "selected" : ""}`} onClick={() => setActiveProfile(i)} role="radio" aria-checked={activeProfile === i} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveProfile(i); } }}>
                <div className="profile-emoji">{p.emoji}</div>
                <div className="profile-label">{p.label}</div>
                <div className="profile-desc">{p.desc}</div>
                <div className="profile-risk">
                  위험 감수 수준
                  <div className="risk-bar"><div style={{ height: 3, width: `${p.risk}%`, background: p.riskColor, borderRadius: 2 }} /></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 2 — 시장 국면 */}
        <section style={{ marginBottom: 56 }}>
          <div className="section-tag">Step 2</div>
          <h2 className="section-title">지금 시장은 어떤 상태인가요?</h2>
          <p className="section-sub">알고리즘이 수집한 2026년 4월 경제지표입니다. 각 지표의 기준과 출처를 함께 표시합니다.</p>
          <div className="market-grid">
            {indicators.map((ind, i) => (
              <div key={i} className="indicator-card">
                <div className="ind-top">
                  <span className="ind-name">{ind.name}</span>
                  <span className="sig-badge" style={badgeStyle(ind.status)}>
                    <span>{badgeIcon(ind.status)}</span> {ind.statusLabel}
                  </span>
                </div>
                <div className="ind-value">{ind.value}</div>
                <div className="ind-desc">{ind.desc}</div>
                <div className="ind-criterion">기준: {ind.criterion}<br /><span style={{ color: "#4A5878" }}>출처: {ind.source}</span></div>
              </div>
            ))}
          </div>
          <div className="market-summary">
            <div>
              <div className="market-phase-label">알고리즘 판정 국면</div>
              <div className="market-phase-name">AI 슈퍼사이클 ⚡</div>
              <div className="market-phase-note">F1·F2·F3·F4·DCB 필터 전체 통과</div>
            </div>
            <div className="market-divider" />
            <div className="market-gauge">
              <div className="gauge-label"><span>안전</span><span>주의</span><span>위험</span></div>
              <div className="gauge-track">
                <div className="gauge-fill" />
                <div className="gauge-cursor" style={{ left: "42%" }} />
              </div>
              <div style={{ fontSize: 10, color: "#4A5878", marginTop: 6 }}>현재 위험도 42% — 6개 지표 중 2개 위험 / 2개 주의 / 2개 안정</div>
            </div>
          </div>
        </section>

        {/* TRACK RECORD */}
        <div className="track-banner">
          {trackStats.map((t, i) => (
            <div key={i} className="track-stat">
              <div className="track-num" style={{ color: t.positive ? "#3EC97A" : t.negative ? "#E05252" : "#F0F4FF" }}>{t.num}</div>
              <div className="track-label">{t.label}</div>
              <div className="track-note">{t.note}</div>
            </div>
          ))}
        </div>

        {/* STEP 3 — 매칭 결과 */}
        <section style={{ marginBottom: 56 }}>
          <div className="section-tag">Step 3</div>
          <h2 className="section-title">균형 추구형 투자자를 위한<br />참고 포트폴리오 예시</h2>
          <p className="section-sub">아래는 알고리즘 분석 기반의 <strong>참고용 비중 예시</strong>이며, 특정 ETF의 매수·매도 권유가 아닙니다.<br />본인의 투자 목적·기간·재정 상황을 반드시 추가로 고려하세요.</p>
          <div className="match-note">
            💡 현재 시장 국면(AI 슈퍼사이클 + 위험도 42%)에서, 역사적 데이터 기준으로 <strong>균형 추구형 투자자</strong>가 검토를 고려할 만한 ETF 조합을 보여드립니다.
          </div>
          {/* SVG 비중 차트 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#8899BB", marginBottom: 10, fontWeight: 600 }}>참고 비중 예시 (합계 100%)</div>
            <svg viewBox="0 0 760 52" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <rect x="0" y="0" width="304" height="52" rx="10" fill="#00D2C8" opacity="0.85"/>
              <text x="152" y="30" textAnchor="middle" fill="#060912" fontSize="13" fontWeight="800" fontFamily="Pretendard, sans-serif">KODEX 40%</text>
              <rect x="308" y="0" width="228" height="52" rx="10" fill="#7C5FD0" opacity="0.85"/>
              <text x="422" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800" fontFamily="Pretendard, sans-serif">TIGER 30%</text>
              <rect x="540" y="0" width="152" height="52" rx="10" fill="#E8A838" opacity="0.85"/>
              <text x="616" y="30" textAnchor="middle" fill="#060912" fontSize="12" fontWeight="800" fontFamily="Pretendard, sans-serif">HANARO 20%</text>
              <rect x="696" y="0" width="64" height="52" rx="10" fill="#3EC97A" opacity="0.85"/>
              <text x="728" y="30" textAnchor="middle" fill="#060912" fontSize="11" fontWeight="800" fontFamily="Pretendard, sans-serif">10%</text>
            </svg>
          </div>
          <div className="etf-list">
            {portfolio.map((etf, i) => (
              <div key={i} className="etf-row">
                <div className="etf-color-dot" style={{ background: etf.color }} />
                <div className="etf-info">
                  <div className="etf-name">{etf.name}</div>
                  <div className="etf-meta">{etf.meta}</div>
                  <div className="etf-reason">{etf.reason}</div>
                </div>
                <div className="etf-ratio" style={{ color: etf.color }}>{etf.ratio}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 4 — 검증 인터페이스 */}
        <section style={{ marginBottom: 56 }}>
          <div className="section-tag">Step 4</div>
          <h2 className="section-title">직접 검증하세요</h2>
          <p className="section-sub">이 분석의 근거와 한계를 확인할 수 있습니다. 신뢰는 알고리즘이 주는 것이 아니라 직접 검증하는 것입니다.</p>
          <div className="verify-grid">
            {/* 백테스트 */}
            <div className="verify-card">
              <div className="verify-card-title"><span className="vdot" />백테스트 트랙 레코드 (12개월)</div>
              <div className="backtest-legend">
                <div className="bt-leg-item"><div className="bt-leg-color" style={{ background: "#00D2C8" }} />ETF Insight 알고리즘</div>
                <div className="bt-leg-item"><div className="bt-leg-color" style={{ background: "#4A5878" }} />KOSPI 200</div>
              </div>
              <svg viewBox="0 0 380 140" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
                <defs>
                  <linearGradient id="algGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D2C8" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#00D2C8" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="110" x2="380" y2="110" stroke="#1C2840" strokeWidth="1"/>
                <line x1="0" y1="80" x2="380" y2="80" stroke="#1C2840" strokeWidth="1" strokeDasharray="4,4"/>
                <line x1="0" y1="50" x2="380" y2="50" stroke="#1C2840" strokeWidth="1" strokeDasharray="4,4"/>
                <polyline points="0,110 40,107 80,112 120,106 160,104 200,108 240,102 280,100 320,96 360,97" fill="none" stroke="#4A5878" strokeWidth="1.5"/>
                <polygon points="0,110 40,104 80,112 120,100 160,90 200,95 240,80 280,75 320,65 360,62 360,110 0,110" fill="url(#algGrad)"/>
                <polyline points="0,110 40,104 80,112 120,100 160,90 200,95 240,80 280,75 320,65 360,62" fill="none" stroke="#00D2C8" strokeWidth="2"/>
                <text x="365" y="58" fill="#00D2C8" fontSize="9" fontFamily="Pretendard,sans-serif" fontWeight="700">+18.4%</text>
                <text x="365" y="94" fill="#4A5878" fontSize="9" fontFamily="Pretendard,sans-serif">+6.2%</text>
                <text x="0" y="128" fill="#2A3A5A" fontSize="8" fontFamily="Pretendard,sans-serif">&apos;25.04</text>
                <text x="160" y="128" fill="#2A3A5A" fontSize="8" fontFamily="Pretendard,sans-serif">&apos;25.10</text>
                <text x="330" y="128" fill="#2A3A5A" fontSize="8" fontFamily="Pretendard,sans-serif">&apos;26.04</text>
                <line x1="200" y1="90" x2="200" y2="95" stroke="#E05252" strokeWidth="1" strokeDasharray="2,2"/>
                <text x="165" y="88" fill="#E05252" fontSize="8" fontFamily="Pretendard,sans-serif">MDD –14.2%</text>
              </svg>
              <div style={{ fontSize: 9, color: "#4A5878", marginTop: 8, lineHeight: 1.5 }}>※ 백테스트는 과거 데이터 기반 시뮬레이션입니다. 실제 운용 결과와 다를 수 있습니다.</div>
            </div>
            {/* 로직 공개 */}
            <div className="verify-card">
              <div className="verify-card-title"><span className="vdot" />이번 달 결정 로직 (전체 공개)</div>
              <table className="logic-table">
                <thead>
                  <tr><th>필터</th><th>조건</th><th>측정값</th><th>결과</th></tr>
                </thead>
                <tbody>
                  {logicFilters.map((f, i) => (
                    <tr key={i}>
                      <td>{f.filter}</td>
                      <td>{f.cond}</td>
                      <td className="logic-val">{f.val}</td>
                      <td className={f.pass ? "logic-pass" : "logic-fail"}>{f.pass ? "PASS" : "유의"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ fontSize: 9, color: "#4A5878", marginTop: 10, lineHeight: 1.5 }}>※ 5개 필터 전체 통과 시 &apos;진입 검토&apos; 구간으로 판정. &apos;유의&apos; 항목은 참고 위험 요인입니다.</div>
            </div>
            {/* Devil&apos;s Advocate */}
            <div className="devil-card">
              <div className="devil-card-title"><span className="ddot" />이 분석이 틀릴 수 있는 3가지 시나리오 (정량 추정)</div>
              <div className="devil-grid">
                {devilScenarios.map((d, i) => (
                  <div key={i} className="devil-scenario">
                    <div className="devil-num">{d.num}</div>
                    <div className="devil-title">{d.title}</div>
                    <div className="devil-desc">{d.desc}</div>
                    <div className="devil-quant">
                      <div>
                        <div className="devil-stat-label">{i < 2 ? "발생 확률 (역사적 기준)" : "알고리즘 한계"}</div>
                        <div className="devil-stat-val">{d.prob}</div>
                      </div>
                      <div>
                        <div className="devil-stat-label">{i < 2 ? "이 경우 예상 손실" : "헷지 방법"}</div>
                        <div className="devil-stat-val">{d.loss}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STEP 5 — 본인 판단 */}
        <section style={{ marginBottom: 56 }}>
          <div className="section-tag">Step 5</div>
          <h2 className="section-title">이제 본인이 판단하세요</h2>
          <p className="section-sub">위 분석은 참고 자료입니다. 최종 투자 결정은 본인의 판단으로 이루어져야 합니다.</p>
          <div className="decision-box">
            <div className="decision-affirm">
              저는 위 분석 내용을 검토하였으며, 이 포트폴리오 예시가 <strong>투자 권유가 아닌 참고 정보</strong>임을 이해합니다. 투자 결과에 대한 책임이 본인에게 있음을 확인합니다. 시나리오 1~3의 손실 가능성과 알고리즘의 한계를 인지하였습니다.
            </div>
            <div className="decision-buttons">
              <button className="decision-btn primary" onClick={() => alert("투자 판단은 본인의 책임입니다. 증권사 앱을 통해 직접 거래하세요.")}>
                ✓ 이해했습니다 — 참고로 활용하겠습니다
              </button>
              <button className="decision-btn secondary">↩ 다시 검토하겠습니다</button>
              <button className="decision-btn secondary">📊 전체 백테스트 데이터 보기</button>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="etf-footer">
        <p>MIC AI Labs · ETF Insight v2.0 · 알고리즘 분석 참고 서비스</p>
        <p style={{ marginTop: 6 }}>본 서비스는 자본시장과 금융투자업에 관한 법률 제17조(미등록 영업 금지) 및 제46조(투자권유 적합성) 준수를 원칙으로 합니다.</p>
        <p style={{ marginTop: 6 }}>데이터 출처: ISM · BLS · BEA · Fed FRED · CBOE · Yahoo Finance | 2026년 4월 기준</p>
      </footer>
    </>
  );
}
