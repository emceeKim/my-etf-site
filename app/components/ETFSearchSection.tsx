"use client";
import { useState, useMemo } from "react";
import {
  ETF_DATABASE,
  CATEGORIES,
  SUBCATEGORIES,
  CATEGORY_DESC,
  PORTFOLIO_TYPES,
  type ETFItem,
} from "@/app/data/etf-data";
import ETFCard from "./ETFCard";
import ETFDetail from "./ETFDetail";

// ─── 상태별 스타일 ────────────────────────────────
const STATUS_STYLE = {
  위험: "text-red-500 bg-red-50",
  주의: "text-yellow-600 bg-yellow-50",
  보통: "text-green-600 bg-green-50",
} as const;

const SIGNAL_STYLE = {
  매수: "text-green-600 bg-green-50",
  관망: "text-yellow-600 bg-yellow-50",
  매도: "text-red-500 bg-red-50",
} as const;

const RISK_STYLE = {
  낮음: "text-green-600 bg-green-50",
  중간: "text-yellow-600 bg-yellow-50",
  높음: "text-red-500 bg-red-50",
  "매우 높음": "text-red-700 bg-red-100",
} as const;

export { STATUS_STYLE, SIGNAL_STYLE, RISK_STYLE };

// ─── 탭 타입 ──────────────────────────────────────
type Tab = "search" | "portfolio";

export default function ETFSearchSection() {
  const [tab, setTab] = useState<Tab>("search");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSub, setSelectedSub] = useState("전체");
  const [selectedETF, setSelectedETF] = useState<ETFItem | null>(null);

  // ─── 필터링 ───────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ETF_DATABASE.filter((etf) => {
      const matchQ =
        !q ||
        etf.ticker.toLowerCase().includes(q) ||
        etf.name.toLowerCase().includes(q) ||
        etf.description.toLowerCase().includes(q) ||
        etf.subcategory.toLowerCase().includes(q);
      const matchCat =
        selectedCategory === "전체" || etf.category === selectedCategory;
      const matchSub =
        selectedSub === "전체" || etf.subcategory === selectedSub;
      return matchQ && matchCat && matchSub;
    });
  }, [query, selectedCategory, selectedSub]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSub("전체");
    setSelectedETF(null);
  };

  // ─── ETF 상세 뷰 ──────────────────────────────
  if (selectedETF) {
    return (
      <ETFDetail
        etf={selectedETF}
        signalStyle={SIGNAL_STYLE}
        riskStyle={RISK_STYLE}
        onBack={() => setSelectedETF(null)}
      />
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-6">
        <span className="inline-block bg-blue-50 text-blue-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          ETF 백과사전
        </span>
        <h1 className="text-xl font-bold text-gray-900 mb-1">ETF 정보</h1>
        <p className="text-gray-400 text-sm">
          검색·분류별 탐색·구성 종목·AI 평가를 한눈에 확인하세요
        </p>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-5">
        {(["search", "portfolio"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === t
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-500 border border-gray-100 shadow-sm"
            }`}
          >
            {t === "search" ? "ETF 탐색" : "성향별 추천"}
          </button>
        ))}
      </div>

      {/* ─── ETF 탐색 탭 ─────────────────────────── */}
      {tab === "search" && (
        <>
          {/* 검색창 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="ETF 검색 (예: QQQ, 나스닥, 반도체, 금...)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedETF(null);
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-400"
              />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              팁: 티커(QQQ), 키워드(반도체), 투자 목적(배당) 등으로 검색
            </div>
          </div>

          {/* 대분류 */}
          <div className="mb-3">
            <div className="text-xs font-semibold text-gray-400 mb-2 px-1">
              대분류
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500 border border-gray-100 shadow-sm hover:border-blue-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 대분류 설명 */}
            {selectedCategory !== "전체" && CATEGORY_DESC[selectedCategory] && (
              <div className="mt-2 bg-blue-50 rounded-xl px-4 py-2 text-xs text-blue-700">
                {CATEGORY_DESC[selectedCategory]}
              </div>
            )}
          </div>

          {/* 소분류 */}
          {selectedCategory !== "전체" && (
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-400 mb-2 px-1">
                소분류
              </div>
              <div className="flex gap-2 flex-wrap">
                {SUBCATEGORIES[selectedCategory]?.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setSelectedSub(sub);
                      setSelectedETF(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedSub === sub
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-500 border border-gray-100 shadow-sm hover:border-gray-300"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 결과 목록 */}
          <div className="text-xs text-gray-400 mb-3 px-1">
            {filtered.length}개 ETF
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-gray-500 text-sm font-medium mb-1">
                검색 결과가 없어요
              </div>
              <div className="text-gray-400 text-xs">
                다른 키워드로 시도해보세요
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((etf) => (
                <ETFCard
                  key={etf.ticker}
                  etf={etf}
                  signalStyle={SIGNAL_STYLE}
                  riskStyle={RISK_STYLE}
                  onClick={() => setSelectedETF(etf)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ─── 성향별 추천 탭 ──────────────────────── */}
      {tab === "portfolio" && (
        <div className="flex flex-col gap-4">
          {PORTFOLIO_TYPES.map((pt) => (
            <div
              key={pt.type}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-gray-900 text-sm">
                    {pt.type}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {pt.target}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                {pt.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {pt.picks.map((p) => (
                  <button
                    key={p.ticker}
                    onClick={() => {
                      const found = ETF_DATABASE.find(
                        (e) => e.ticker === p.ticker
                      );
                      if (found) {
                        setTab("search");
                        setSelectedETF(found);
                      }
                    }}
                    className="bg-gray-50 hover:bg-blue-50 rounded-xl px-3 py-2 text-center transition-colors"
                  >
                    <div className="font-bold text-gray-900 text-sm">
                      {p.ticker}
                    </div>
                    <div className="text-xs text-blue-500 font-semibold">
                      {p.weight}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      <div className="mt-6">
        <div className="text-xs font-semibold text-gray-400 mb-3 px-1">
          자주 묻는 질문
        </div>
        <div className="flex flex-col gap-2">
          {[
            {
              q: "ETF와 주식의 차이는 무엇인가요?",
              a: "ETF는 주식처럼 거래소에서 거래되지만 하나의 ETF 안에 수십~수백 개의 종목이 담겨 있습니다. 달걀을 한 바구니에 담지 않는 분산 투자가 자동으로 이루어집니다.",
            },
            {
              q: "운용보수가 중요한가요?",
              a: "매우 중요합니다. 운용보수 0.5% 차이가 30년 복리 투자 시 최종 자산에서 10~15% 차이를 만들 수 있습니다. 같은 지수를 추종한다면 보수가 낮은 ETF를 선택하세요.",
            },
            {
              q: "MIC AI 신호는 100% 맞나요?",
              a: "아닙니다. AI 신호는 참고 지표이며 투자 결정의 최종 책임은 본인에게 있습니다. 저희는 신호 적중률을 실시간으로 공개하며, 실패한 추천도 투명하게 기록합니다.",
            },
            {
              q: "연금저축 계좌에서 살 수 있는 ETF는?",
              a: "국내 증시에 상장된 ETF만 연금 계좌에서 매수 가능합니다. TIGER 미국나스닥100, KODEX 미국S&P500, TIGER 미국채10년선물 등이 대표적입니다.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="text-sm font-bold text-gray-900 mb-1.5">
                Q. {faq.q}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 면책 조항 */}
      <div className="mt-6 bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-400 leading-relaxed">
        본 ETF 정보는 정보 제공 목적으로만 작성되었으며, 특정 ETF의 매수·매도를
        권유하는 것이 아닙니다. 투자에 대한 최종 판단과 책임은 투자자 본인에게
        있으며, 과거 수익률이 미래 수익률을 보장하지 않습니다.
      </div>
    </div>
  );
}
