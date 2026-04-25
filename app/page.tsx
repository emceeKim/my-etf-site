"use client";
import { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("model");
  const [openDebate, setOpenDebate] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menus = [
    { id: "model", label: "MIC AI Model" },
    { id: "etf", label: "이달의 ETF" },
    { id: "returns", label: "수익률 비교" },
  ];

  const debates = [
    {
      id: "r1",
      round: "Round 1",
      title: "현재 경기 국면 진단",
      summary: "AI 4개 모델이 현재 경제 상황을 어떻게 읽는가",
      content: `【거시분석가 AI】
PCE 인플레이션 2.7%로 목표치 2% 상회 중. 실업률 4.4%로 상승 추세. ISM 제조업 PMI 48~49 수축권 유지. 현재는 경기 둔화 초입 국면으로 판단. 방어 섹터 비중 확대 필요.

【모멘텀 분석가 AI】
반박. PMI 수축이 맞지만 AI 반도체 수요는 PMI와 무관하게 독립적으로 폭증 중. NVDA·TSMC·브로드컴 등 실적은 경기 사이클을 이탈한 구조적 성장. 기술주 모멘텀 유지 주장.

【리스크 관리자 AI】
장단기금리차(10Y-2Y) 역전 지속 중. 역사적으로 역전 후 12~18개월 내 침체 확률 70%. 헤지 비중 30% 이상 권고. QQQ 단독 집중은 위험.

【검증자 AI】
세 모델 모두 부분적으로 맞음. 결론: 성장(QQQ) 50% + 방어(IEF) 30% + 현금 20% 혼합 포트폴리오가 현 국면에 최적.`
    },
    {
      id: "r2",
      round: "Round 2",
      title: "섹터 로테이션 전략 충돌",
      summary: "어느 섹터에 지금 돈을 넣어야 하는가",
      content: `【거시분석가 AI】
경기 둔화 국면 섹터 로테이션 공식: 헬스케어(XLV) > 유틸리티(XLU) > 필수소비재(XLP) 순으로 방어 섹터 선호. 금리 인하 사이클 진입 시 채권(IEF)도 매력 상승.

【모멘텀 분석가 AI】
섹터 로테이션 공식은 AI 혁명 이전 시대 프레임. 2026년 현재 AI 인프라 투자는 경기 사이클과 무관. SOXX(반도체), QQQ(나스닥) 비중 확대. HBM4 양산 본격화로 수혜 지속.

【리스크 관리자 AI】
모멘텀 편향 경고. AI가 좋다는 뉴스를 보고 AI ETF를 사는 것 자체가 이미 편향된 판단. 지표와 섹터가 같은 방향을 가리킬 때만 진입해야 함.

【검증자 AI】
최종 조율: QQQ 40% + XLV 25% + IEF 25% + 현금 10%. 공격과 방어의 균형점.`
    },
    {
      id: "r3",
      round: "Round 3",
      title: "방위산업 vs 헬스케어",
      summary: "2026년 불확실성 헤지 수단 논쟁",
      content: `【거시분석가 AI】
지정학적 불확실성(트럼프 관세, 대만) 고조 상황에서 방위산업 ETF(ITA) 주목. NATO 국방비 증가 + 미국 국방예산 확대로 구조적 수혜.

【모멘텀 분석가 AI】
방위산업 동의. 단, 헬스케어(XLV)도 병행 필요. 고령화 + AI 신약 개발 가속으로 헬스케어는 경기 방어 + 성장 동시 포착 가능한 유일한 섹터.

【리스크 관리자 AI】
방위산업은 정책 리스크 큼. 헬스케어가 더 안정적인 방어 수단. IEF(국채)가 진짜 헤지.

【검증자 AI】
결론: 방위산업 소량 편입 OK. 핵심 헤지는 IEF. 헬스케어는 QQQ 보완재로 10~15% 편입 권고.`
    },
    {
      id: "r4",
      round: "Round 4",
      title: "최종 포트폴리오 합의",
      summary: "4라운드 토론 끝에 도출된 MIC AI 최종 결론",
      content: `【최종 합의 — MIC AI 멀티에이전트 토론 결과】

현재 경기 국면: 둔화 초입 (Slowdown Phase)
- ISM PMI 48~49 수축권
- 장단기금리차 역전 지속
- 실업률 상승 추세 (4.4%)
- PCE 인플레이션 2.7% (목표 상회)

최종 추천 포트폴리오
1위 QQQ (나스닥 100) — 40%
   AI 구조적 성장, PMI 무관 독립 모멘텀
2위 SPY (S&P 500) — 25%
   미국 경제 기초체력, 안정적 분산
3위 IEF (미국 국채 7-10년) — 25%
   금리 인하 사이클 수혜, 핵심 헤지
+ 현금 10% 유보 (변동성 대응)

핵심 원칙
"지표와 섹터가 같은 방향을 가리킬 때만 진입"`
    }
  ];

  const indicators = [
    { name: "ISM PMI", value: "48.7", status: "위험", desc: "수축권 (50 미만)" },
    { name: "장단기금리차", value: "-0.3%", status: "위험", desc: "10Y-2Y 역전 지속" },
    { name: "실업률", value: "4.4%", status: "주의", desc: "상승 추세" },
    { name: "PCE 인플레이션", value: "2.7%", status: "주의", desc: "목표치 2% 상회" },
    { name: "S&P 500", value: "5,400", status: "보통", desc: "200일 이평선 위" },
    { name: "VIX 공포지수", value: "18.2", status: "보통", desc: "안정권 유지" },
  ];

  const statusStyle: Record<string, string> = {
    "위험": "text-red-500 bg-red-50",
    "주의": "text-yellow-600 bg-yellow-50",
    "보통": "text-green-600 bg-green-50",
  };

  const etfs = [
    { rank: "1위", rankColor: "text-yellow-500 bg-yellow-50", ticker: "QQQ", name: "나스닥 100 ETF", ret: "+18.4%", comment: "AI 구조적 성장, 반도체 섹터 주도 — 포트폴리오 40% 권고" },
    { rank: "2위", rankColor: "text-blue-400 bg-blue-50", ticker: "SPY", name: "S&P 500 ETF", ret: "+12.1%", comment: "미국 경제 연착륙 기대, 안정적 분산 — 포트폴리오 25% 권고" },
    { rank: "3위", rankColor: "text-gray-400 bg-gray-100", ticker: "IEF", name: "미국 국채 7-10년 ETF", ret: "+4.2%", comment: "금리 인하 사이클 수혜, 핵심 헤지 수단 — 포트폴리오 25% 권고" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 상단 헤더 (모바일 + PC 공통) */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-blue-500">MIC AI Labs</div>
            <div className="text-base font-bold text-gray-900">ETF Insight</div>
          </div>

          {/* PC 메뉴 */}
          <nav className="hidden md:flex gap-1">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveMenu(menu.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeMenu === menu.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => { setActiveMenu(menu.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-colors ${
                  activeMenu === menu.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* MIC AI Model */}
        {activeMenu === "model" && (
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">About</span>
              <h1 className="text-xl font-bold text-gray-900 mb-1">MIC AI Model</h1>
              <p className="text-gray-400 text-sm">AI 멀티에이전트 토론으로 도출한 ETF 투자 판단 시스템</p>
            </div>

            {/* 경제지표 */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-700 mb-3">현재 경제지표</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {indicators.map((ind) => (
                  <div key={ind.name} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{ind.name}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[ind.status]}`}>
                        {ind.status}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{ind.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{ind.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 판단 기준 */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-700 mb-3">ETF 판단 기준</h2>
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-3">
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  MIC AI Model은 4개의 AI 에이전트가 매월 토론을 통해 ETF를 선정합니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 font-medium">
                  핵심 원칙: "지표와 섹터가 같은 방향을 가리킬 때만 진입"
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "경기 국면 판단", desc: "ISM PMI, 장단기금리차, 실업률" },
                  { label: "모멘텀 검증", desc: "섹터별 상대강도, 200일 이평선" },
                  { label: "리스크 평가", desc: "VIX, 최대낙폭, 변동성 지수" },
                  { label: "최종 합의", desc: "4개 AI 토론 후 가중 평균 도출" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="text-sm font-bold text-gray-900 mb-1">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI 토론 기록 */}
            <div>
              <h2 className="text-sm font-bold text-gray-700 mb-3">AI 멀티에이전트 토론 기록</h2>
              <div className="flex flex-col gap-2">
                {debates.map((debate) => (
                  <div key={debate.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenDebate(openDebate === debate.id ? null : debate.id)}
                      className="w-full text-left px-4 py-4 flex items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                            {debate.round}
                          </span>
                          <span className="text-sm font-bold text-gray-900 truncate">{debate.title}</span>
                        </div>
                        <div className="text-xs text-gray-400">{debate.summary}</div>
                      </div>
                      <span className="text-gray-300 text-sm ml-3 shrink-0">
                        {openDebate === debate.id ? "▲" : "▼"}
                      </span>
                    </button>
                    {openDebate === debate.id && (
                      <div className="px-4 pb-4 border-t border-gray-50">
                        <pre className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap mt-3 font-sans">
                          {debate.content}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 이달의 ETF */}
        {activeMenu === "etf" && (
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">Monthly Pick</span>
              <h1 className="text-xl font-bold text-gray-900 mb-1">이달의 추천 ETF</h1>
              <p className="text-gray-400 text-sm">AI 멀티에이전트 토론으로 선정한 2026년 4월 추천 ETF</p>
            </div>
            <div className="flex flex-col gap-3">
              {etfs.map((etf) => {
                const [textColor, bgColor] = etf.rankColor.split(" ");
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

              {/* 텔레그램 배너 */}
              <div className="bg-blue-500 rounded-2xl p-5 text-white text-center mt-2">
                <div className="font-bold text-base mb-1">텔레그램 채널 구독</div>
                <div className="text-blue-100 text-sm mb-4">매월 AI 분석 결과를 가장 먼저 받아보세요</div>
                <a
                  href="https://t.me/your_channel"
                  className="inline-block bg-white text-blue-500 font-bold text-sm px-6 py-2 rounded-xl"
                >
                  채널 바로가기
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 수익률 비교 */}
        {activeMenu === "returns" && (
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">Comparison</span>
              <h1 className="text-xl font-bold text-gray-900 mb-1">수익률 비교</h1>
              <p className="text-gray-400 text-sm">ETF 기간별 수익률 비교</p>
            </div>

            {/* 모바일: 카드형 */}
            <div className="flex flex-col gap-3 md:hidden">
              {[
                { ticker: "QQQ", name: "나스닥 100", m1: "+3.2%", m6: "+9.1%", y1: "+18.4%" },
                { ticker: "SPY", name: "S&P 500", m1: "+2.1%", m6: "+6.4%", y1: "+12.1%" },
                { ticker: "IEF", name: "미국 국채", m1: "+0.8%", m6: "+2.3%", y1: "+4.2%" },
              ].map((etf) => (
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

            {/* PC: 테이블형 */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 px-5 py-3 text-xs font-semibold text-gray-400">
                <div>ETF</div>
                <div className="text-right">1개월</div>
                <div className="text-right">6개월</div>
                <div className="text-right">1년</div>
              </div>
              {[
                { ticker: "QQQ", name: "나스닥 100", m1: "+3.2%", m6: "+9.1%", y1: "+18.4%" },
                { ticker: "SPY", name: "S&P 500", m1: "+2.1%", m6: "+6.4%", y1: "+12.1%" },
                { ticker: "IEF", name: "미국 국채", m1: "+0.8%", m6: "+2.3%", y1: "+4.2%" },
              ].map((etf, i, arr) => (
                <div key={etf.ticker} className={`grid grid-cols-4 px-5 py-4 items-center ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
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
