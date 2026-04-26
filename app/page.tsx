"use client";
import { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("model");
  const [debateOpen, setDebateOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menus = [
    { id: "model", label: "MIC AI Model" },
    { id: "etf", label: "이달의 ETF" },
    { id: "returns", label: "수익률 비교" },
  ];

  const finalConclusion = {
    phase: "둔화 초입",
    phaseDesc: "Slowdown Phase",
    portfolio: [
      { ticker: "QQQ", name: "나스닥 100", pct: 40, reason: "AI 구조적 성장, PMI 무관 독립 모멘텀" },
      { ticker: "SPY", name: "S&P 500", pct: 25, reason: "미국 경제 기초체력, 안정적 분산" },
      { ticker: "IEF", name: "미국 국채 7-10년", pct: 25, reason: "금리 인하 사이클 수혜, 핵심 헤지" },
      { ticker: "현금", name: "변동성 대응 유보", pct: 10, reason: "조정 시 추가 매수용" },
    ],
    principle: "지표와 섹터가 같은 방향을 가리킬 때만 진입",
  };
  const portfolioColors = ["bg-blue-500", "bg-blue-300", "bg-slate-400", "bg-gray-300"];

  const debateRounds = [
    {
      round: "Round 1",
      title: "현재 경기 국면 진단",
      summary: "AI 4개 모델이 현재 경제 상황을 어떻게 읽는가",
      content: "【거시분석가 AI】 PCE 2.7%로 목표치 상회, 실업률 4.4% 상승 추세, ISM PMI 수축권. 방어 섹터 비중 확대 필요.\n\n【모멘텀 분석가 AI】 PMI 수축이지만 AI 반도체 수요는 독립적 폭증 중. NVDA·TSMC 실적은 경기 사이클 이탈한 구조적 성장.\n\n【리스크 관리자 AI】 장단기금리차 역전 지속. 역전 후 12~18개월 내 침체 확률 70%. 헤지 비중 30% 이상 권고.\n\n【검증자 AI】 결론: 성장(QQQ) 50% + 방어(IEF) 30% + 현금 20% 혼합 포트폴리오가 현 국면에 최적.",
    },
    {
      round: "Round 2",
      title: "섹터 로테이션 전략 충돌",
      summary: "어느 섹터에 지금 돈을 넣어야 하는가",
      content: "【거시분석가 AI】 경기 둔화 섹터 로테이션 공식: 헬스케어(XLV) > 유틸리티(XLU) > 필수소비재(XLP). 금리 인하 시 채권(IEF)도 매력 상승.\n\n【모멘텀 분석가 AI】 섹터 로테이션 공식은 AI 혁명 이전 프레임. AI 인프라 투자는 경기 사이클과 무관. SOXX·QQQ 비중 확대.\n\n【리스크 관리자 AI】 AI ETF를 보고 사는 것 자체가 편향된 판단. 지표와 섹터가 같은 방향을 가리킬 때만 진입.\n\n【검증자 AI】 최종 조율: QQQ 40% + XLV 25% + IEF 25% + 현금 10%.",
    },
    {
      round: "Round 3",
      title: "방위산업 vs 헬스케어",
      summary: "2026년 불확실성 헤지 수단 논쟁",
      content: "【거시분석가 AI】 지정학적 불확실성(트럼프 관세, 대만) 고조로 방위산업 ETF(ITA) 주목. NATO 국방비·미국 국방예산 구조적 수혜.\n\n【모멘텀 분석가 AI】 방위산업 동의. 단, 헬스케어(XLV)도 병행 필요. 고령화+AI 신약 개발로 경기 방어+성장 동시 포착 가능.\n\n【리스크 관리자 AI】 방위산업은 정책 리스크 큼. 헬스케어가 더 안정적. IEF(국채)가 진짜 헤지.\n\n【검증자 AI】 결론: 방위산업 소량 편입 OK. 핵심 헤지는 IEF. 헬스케어는 QQQ 보완재로 10~15% 편입 권고.",
    },
  ];

  const indicators = [
    { name: "ISM PMI", value: "48.7", status: "위험", desc: "수축권 (50 미만)", criterion: "50 이하 → 위험" },
    { name: "장단기금리차", value: "-0.3%", status: "위험", desc: "10Y-2Y 역전 지속", criterion: "음수(역전) → 위험" },
    { name: "실업률", value: "4.4%", status: "주의", desc: "상승 추세", criterion: "4.0~4.5% → 주의" },
    { name: "PCE 인플레이션", value: "2.7%", status: "주의", desc: "목표치 2% 상회", criterion: "2~3% → 주의" },
    { name: "S&P 500", value: "5,400", status: "보통", desc: "200일 이평선 위", criterion: "200일선 위 → 보통" },
    { name: "VIX 공포지수", value: "18.2", status: "보통", desc: "안정권 유지", criterion: "20 미만 → 안정" },
  ];

  const statusStyle: Record<string, { badge: string; dot: string }> = {
    위험: { badge: "text-red-600 bg-red-50 border border-red-100", dot: "bg-red-500" },
    주의: { badge: "text-yellow-700 bg-yellow-50 border border-yellow-100", dot: "bg-yellow-400" },
    보통: { badge: "text-green-700 bg-green-50 border border-green-100", dot: "bg-green-500" },
  };

  const etfs = [
    { rank: "1위", rankColor: "text-yellow-500 bg-yellow-50", ticker: "QQQ", name: "나스닥 100 ETF", ret: "+18.4%", comment: "AI 구조적 성장, 반도체 섹터 주도 — 포트폴리오 40% 권고" },
    { rank: "2위", rankColor: "text-blue-400 bg-blue-50", ticker: "SPY", name: "S&P 500 ETF", ret: "+12.1%", comment: "미국 경제 연착륙 기대, 안정적 분산 — 포트폴리오 25% 권고" },
    { rank: "3위", rankColor: "text-gray-400 bg-gray-100", ticker: "IEF", name: "미국 국채 7-10년 ETF", ret: "+4.2%", comment: "금리 인하 사이클 수혜, 핵심 헤지 수단 — 포트폴리오 25% 권고" },
  ];

  const returnsData = [
    { ticker: "QQQ", name: "나스닥 100", m1: "+3.2%", m6: "+9.1%", y1: "+18.4%" },
    { ticker: "SPY", name: "S&P 500", m1: "+2.1%", m6: "+6.4%", y1: "+12.1%" },
    { ticker: "IEF", name: "미국 국채", m1: "+0.8%", m6: "+2.3%", y1: "+4.2%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-blue-500">MIC AI Labs</div>
            <div className="text-base font-bold text-gray-900">ETF Insight</div>
          </div>
          <nav className="hidden md:flex gap-1">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveMenu(menu.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeMenu === menu.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </nav>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기/닫기"
          >
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => { setActiveMenu(menu.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-colors ${
                  activeMenu === menu.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">

        {activeMenu === "model" && (
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                2026년 4월 분석 완료
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
                지금 사야 할 ETF,<br />AI 4개가 토론해서 골랐습니다
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                거시분석 · 모멘텀 · 리스크 · 검증 AI가 매달 충돌하고 합의한 결론입니다.
              </p>
            </div>

            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg bg-blue-600">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">AI 최종 판단</span>
                  <span className="text-blue-200 text-xs">4라운드 토론 합의</span>
                </div>
                <div className="mb-5">
                  <div className="bg-white/10 rounded-xl px-4 py-3 inline-block">
                    <div className="text-blue-200 text-xs mb-0.5">현재 경기 국면</div>
                    <div className="text-white font-extrabold text-xl leading-tight">{finalConclusion.phase}</div>
                    <div className="text-blue-300 text-xs">{finalConclusion.phaseDesc}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-blue-200 text-xs mb-2 font-medium">추천 포트폴리오 비중</div>
                  <div className="flex rounded-xl overflow-hidden h-9 mb-3">
                    {finalConclusion.portfolio.map((item, i) => (
                      <div
                        key={item.ticker}
                        className={`${portfolioColors[i]} flex items-center justify-center text-xs font-bold text-white`}
                        style={{ width: `${item.pct}%` }}
                      >
                        {item.pct >= 15 ? `${item.ticker} ${item.pct}%` : `${item.pct}%`}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {finalConclusion.portfolio.map((item, i) => (
                      <div key={item.ticker} className="flex items-start gap-2">
                        <div className={`w-2.5 h-2.5 rounded-sm mt-0.5 shrink-0 ${portfolioColors[i]}`}></div>
                        <div>
                          <span className="text-white font-bold text-xs">{item.ticker}</span>
                          <span className="text-blue-200 text-xs ml-1">{item.pct}%</span>
                          <div className="text-blue-300 text-xs leading-snug">{item.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <p className="text-blue-100 text-xs italic">
                    {`💡 "${finalConclusion.principle}"`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-700">현재 경제지표</h2>
                <span className="text-xs text-gray-400">각 항목 하단에 판정 기준 표시</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {indicators.map((ind) => {
                  const style = statusStyle[ind.status];
                  return (
                    <div key={ind.name} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">{ind.name}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${style.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${style.dot}`}></span>
                          {ind.status}
                        </span>
                      </div>
                      <div className="text-xl font-extrabold text-gray-900 mb-1">{ind.value}</div>
                      <div className="text-xs text-gray-400">{ind.desc}</div>
                      <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
                        기준: {ind.criterion}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-700 mb-3">AI 토론 과정</h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setDebateOpen(!debateOpen)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-gray-900 mb-0.5">어떻게 이 결론이 나왔나?</div>
                    <div className="text-xs text-gray-400">경기진단 → 섹터전략 → 헤지논쟁, 3라운드 토론 요약 보기</div>
                  </div>
                  <span className={`text-gray-400 ml-3 shrink-0 transition-transform duration-200 ${debateOpen ? "rotate-180" : ""}`}>
                    &#x25BC;
                  </span>
                </button>
                {debateOpen && (
                  <div className="border-t border-gray-100">
                    {debateRounds.map((round, i) => (
                      <div
                        key={round.round}
                        className={`px-5 py-4 ${i < debateRounds.length - 1 ? "border-b border-gray-50" : ""}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                            {round.round}
                          </span>
                          <span className="text-sm font-bold text-gray-800">{round.title}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{round.summary}</p>
                        <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap font-sans bg-gray-50 rounded-xl p-3">
                          {round.content}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeMenu === "etf" && (
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">Monthly Pick</span>
              <h1 className="text-xl font-bold text-gray-900 mb-1">이달의 추천 ETF</h1>
              <p className="text-gray-400 text-sm">AI 멀티에이전트 토론으로 선정한 2026년 4월 추천 ETF</p>
            </div>
            <div className="flex flex-col gap-3">
              {etfs.map((etf) => {
                const parts = etf.rankColor.split(" ");
                const textColor = parts[0];
                const bgColor = parts[1];
                return (
                  <div key={etf.ticker} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}>
                          <span className={`font-bold text-sm ${textColor}`}>{etf.rank}</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{etf.ticker}</div>
                          <div className="text-xs text-gray-400">{etf.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-500 font-bold text-lg">{etf.ret}</div>
                        <div className="text-xs text-gray-400">연간 수익률</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl px-4 py-2 text-xs text-gray-500">{etf.comment}</div>
                  </div>
                );
              })}
              <div className="bg-blue-500 rounded-2xl p-5 text-white text-center mt-2">
                <div className="font-bold text-base mb-1">텔레그램 채널 구독</div>
                <div className="text-blue-100 text-sm mb-4">매월 AI 분석 결과를 가장 먼저 받아보세요</div>
                <a href="https://t.me/your_channel" className="inline-block bg-white text-blue-500 font-bold text-sm px-6 py-2 rounded-xl">
                  채널 바로가기
                </a>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "returns" && (
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">Comparison</span>
              <h1 className="text-xl font-bold text-gray-900 mb-1">수익률 비교</h1>
              <p className="text-gray-400 text-sm">ETF 기간별 수익률 비교</p>
            </div>
            <div className="flex flex-col gap-3 md:hidden">
              {returnsData.map((etf) => (
                <div key={etf.ticker} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900">{etf.ticker}</div>
                      <div className="text-xs text-gray-400">{etf.name}</div>
                    </div>
                    <div className="text-green-500 font-bold text-lg">{etf.y1}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[{ label: "1개월", val: etf.m1 }, { label: "6개월", val: etf.m6 }, { label: "1년", val: etf.y1 }].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-xl py-2">
                        <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                        <div className="text-sm font-bold text-green-500">{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 px-5 py-3 text-xs font-semibold text-gray-400">
                <div>ETF</div>
                <div className="text-right">1개월</div>
                <div className="text-right">6개월</div>
                <div className="text-right">1년</div>
              </div>
              {returnsData.map((etf, i) => (
                <div
                  key={etf.ticker}
                  className={`grid grid-cols-4 px-5 py-4 items-center ${i < returnsData.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{etf.ticker}</div>
                    <div className="text-xs text-gray-400">{etf.name}</div>
                  </div>
                  <div className="text-right text-green-500 font-semibold text-sm">{etf.m1}</div>
                  <div className="text-right text-green-500 font-semibold text-sm">{etf.m6}</div>
                  <div className="text-right text-green-500 font-semibold text-sm">{etf.y1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
