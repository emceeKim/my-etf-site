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
    phase: "AI 슈퍼사이클",
    phaseDesc: "AI Supercycle Phase",
    portfolio: [
      { ticker: "KODEX 반도체", name: "KODEX 미국반도체", pct: 40, reason: "HBM4 양산 본격화, AI 수요 구조적 성장 수혜" },
      { ticker: "TIGER 나스닥", name: "TIGER 미국나스닥100", pct: 30, reason: "빅테크 AI 수익화 + 안정적 성장 코어 ETF" },
      { ticker: "HANARO 전력", name: "HANARO 전력설비투자", pct: 20, reason: "AI 데이터센터 전력인프라 구조적 성장" },
      { ticker: "ACE 배당", name: "ACE 미국배당다우존스", pct: 10, reason: "고배당 방어, 변동성 구간 완충재" },
    ],
    principle: "AI 반도체 슈퍼사이클과 전력인프라가 같은 방향을 가리키는 지금이 진입 시점",
  };
  const portfolioColors = ["bg-blue-600", "bg-blue-400", "bg-orange-400", "bg-green-400"];

  const debateRounds = [
    {
      round: "Round 1",
      title: "현재 경기 국면 진단",
      summary: "AI 4개 모델이 2026년 4월 시장을 어떻게 읽는가",
      content: "【거시분석가 AI】 AI 슈퍼사이클 진입 확인. 미국 증시 강세 지속, 관세 영향 제한적. 단, 대중국 반도체 수출 규제·달러 환율·금리 방향성은 주요 리스크.\n\n【모멘텀 분석가 AI】 HBM4 양산 본격화로 메모리 반도체 사이클 본격 상승. KODEX 미국반도체, TIGER AI반도체TOP10 모멘텀 최상. 지금이 핵심 진입 구간.\n\n【리스크 관리자 AI】 AI 집중 편입은 변동성 위험. 고배당(ACE 배당)으로 포트폴리오 하단을 받치고, 전력인프라로 분산 필요. 한 ETF 30% 이상 집중 지양.\n\n【검증자 AI】 결론: 공격형(반도체 40%) + 성장형(나스닥 30%) + 인프라(전력 20%) + 방어(배당 10%) 균형형 포트폴리오 채택.",
    },
    {
      round: "Round 2",
      title: "반도체 vs 전력인프라 핵심 논쟁",
      summary: "AI 수혜의 중심축은 어디인가",
      content: "【거시분석가 AI】 AI 데이터센터 전력 수요 급증. LS ELECTRIC·효성중공업·HD현대일렉트릭의 미국·유럽 수출 성장률 확대. HANARO 전력설비는 중장기 수혜 확실.\n\n【모멘텀 분석가 AI】 전력인프라 동의. 그러나 단기 모멘텀 최강은 반도체. KODEX 미국반도체와 TIGER AI반도체TOP10이 3개월 수익률 상위권. 선택이 아닌 병행이 정답.\n\n【리스크 관리자 AI】 반도체 집중 리스크: 대중국 수출 규제 강화 시 변동성 확대 가능. TIGER 나스닥100으로 반도체 외 빅테크 분산 필요.\n\n【검증자 AI】 최종 조율: 반도체(40%) + 나스닥(30%) + 전력(20%) + 배당(10%). 리스크 헤지와 성장 동시 포착.",
    },
    {
      round: "Round 3",
      title: "국내 상장 ETF 투자 전략",
      summary: "연금·ISA 계좌 최적 활용법",
      content: "【거시분석가 AI】 이달 5선 모두 국내 상장 ETF. 연금저축·IRP 계좌에서 세제 혜택 + 원화 투자 가능. TIGER 나스닥100(133690)과 ACE 배당(402970)은 연금 계좌 대표 종목.\n\n【모멘텀 분석가 AI】 KODEX 미국반도체(379800), TIGER AI반도체TOP10(476040)은 공격적 성장 계좌(ISA·일반)에 적합. 환노출 방식으로 달러 강세 구간 추가 수익 가능.\n\n【리스크 관리자 AI】 분산 포인트: 5개 ETF가 서로 다른 섹터와 성향. 안정형은 배당+나스닥, 공격형은 반도체+전력, 균형형은 전체 혼합.\n\n【검증자 AI】 결론: 월 적립식 매수 시 이 5개 ETF 조합이 세제 혜택·분산·성장 3박자를 모두 충족. 매월 리밸런싱 권고.",
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
    { rank: "1위", rankColor: "text-yellow-500 bg-yellow-50", ticker: "KODEX 미국반도체", name: "삼성자산운용 · 379800 · 공격형 🔴", ret: "+28.7%", comment: "HBM4 양산 본격화 — 엔비디아·TSMC·브로드컴 집중 편입. AI 수요 구조적 성장 수혜" },
    { rank: "2위", rankColor: "text-blue-400 bg-blue-50", ticker: "TIGER 미국나스닥100", name: "미래에셋 · 133690 · 성장형 🟠", ret: "+17.9%", comment: "빅테크 AI 수익화 코어 ETF — 연금저축·IRP·ISA 가능. 총보수 0.07% 최저 수준" },
    { rank: "3위", rankColor: "text-orange-400 bg-orange-50", ticker: "HANARO 전력설비투자", name: "NH-Amundi · 466940 · 성장형 🟠", ret: "+22.1%", comment: "LS ELECTRIC·효성중공업·HD현대일렉트릭 집중 편입 — AI 데이터센터 전력인프라 수혜" },
    { rank: "4위", rankColor: "text-green-500 bg-green-50", ticker: "ACE 미국배당다우존스", name: "한국투자신탁 · 402970 · 안정형 🟢", ret: "+11.4%", comment: "미국판 SCHD 전략 — 배당 성장 + 안정적 현금흐름. 시장 변동성 방어 포지션" },
    { rank: "5위", rankColor: "text-purple-500 bg-purple-50", ticker: "TIGER AI반도체TOP10", name: "미래에셋 · 476040 · 공격형 🔴", ret: "+31.4%", comment: "국내 AI 반도체 밸류체인 TOP10 — SK하이닉스·삼성전자·한미반도체. HBM 직접 수혜주" },
  ];

  const returnsData = [
    { ticker: "KODEX 미국반도체", name: "AI 반도체 (379800)", m1: "+5.2%", m6: "+15.3%", y1: "+28.7%" },
    { ticker: "TIGER AI반도체TOP10", name: "국내 AI 반도체 (476040)", m1: "+6.1%", m6: "+18.2%", y1: "+31.4%" },
    { ticker: "HANARO 전력설비", name: "AI 전력인프라 (466940)", m1: "+4.1%", m6: "+12.4%", y1: "+22.1%" },
    { ticker: "TIGER 미국나스닥100", name: "미국 빅테크 (133690)", m1: "+3.0%", m6: "+8.7%", y1: "+17.9%" },
    { ticker: "ACE 미국배당다우존스", name: "미국 고배당 (402970)", m1: "+1.8%", m6: "+5.2%", y1: "+11.4%" },
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
