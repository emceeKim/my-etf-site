import { type ETFItem, type ETFSignal, type ETFRisk } from "@/data/etf-data";

type Props = {
  etf: ETFItem;
  signalStyle: Record<ETFSignal, string>;
  riskStyle: Record<ETFRisk, string>;
  onBack: () => void;
};

export default function ETFDetail({ etf, signalStyle, riskStyle, onBack }: Props) {
  return (
    <div>
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-blue-500 font-medium mb-4"
      >
        ← 목록으로
      </button>

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
        <div className="p-5 border-b border-gray-50">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{etf.ticker}</h2>
              <div className="text-xs text-gray-400 mt-0.5">{etf.name}</div>
              <div className="text-xs text-gray-300 mt-0.5">{etf.category} · {etf.subcategory}</div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${signalStyle[etf.signal]}`}>
                {etf.signal}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskStyle[etf.risk]}`}>
                위험도 {etf.risk}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{etf.description}</p>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-3 divide-x divide-gray-50">
          <div className="p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">운용보수</div>
            <div className="font-bold text-gray-900">{etf.fee}</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">배당</div>
            <div className="font-bold text-gray-900 text-xs">{etf.dividend}</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">분류</div>
            <div className="font-bold text-gray-900 text-xs">{etf.subcategory}</div>
          </div>
        </div>
      </div>

      {/* 기간별 수익률 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
        <div className="text-sm font-bold text-gray-700 mb-3">기간별 수익률</div>
        <div className="grid grid-cols-5 gap-2">
          {etf.returns.map((r) => (
            <div key={r.period} className="bg-gray-50 rounded-xl py-2 text-center">
              <div className="text-xs text-gray-400 mb-1">{r.period}</div>
              <div className={`text-sm font-bold ${r.value.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
                {r.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 구성 종목 Top 10 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
        <div className="text-sm font-bold text-gray-700 mb-3">구성 종목 Top 10</div>
        <div className="flex flex-col gap-2">
          {etf.top10.map((stock, i) => (
            <div key={stock.ticker} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300 w-4">{i + 1}</span>
                <span className="text-sm text-gray-700">{stock.name}</span>
                {stock.ticker !== "-" && (
                  <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-lg">
                    {stock.ticker}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* 비중 바 */}
                <div className="w-16 bg-gray-100 rounded-full h-1.5 hidden sm:block">
                  <div
                    className="bg-blue-400 h-1.5 rounded-full"
                    style={{ width: stock.weight }}
                  />
                </div>
                <span className="text-xs font-semibold text-blue-500 w-10 text-right">
                  {stock.weight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 섹터 비중 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
        <div className="text-sm font-bold text-gray-700 mb-3">섹터 비중</div>
        <div className="flex flex-col gap-2">
          {etf.sectorWeights.map((s) => (
            <div key={s.sector} className="flex items-center gap-3">
              <div className="text-xs text-gray-600 w-24 shrink-0">{s.sector}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-400 h-2 rounded-full transition-all"
                  style={{ width: s.weight }}
                />
              </div>
              <div className="text-xs font-semibold text-gray-600 w-10 text-right">
                {s.weight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MIC AI 신호 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
        <div className="text-sm font-bold text-gray-700 mb-2">MIC AI 신호 근거</div>
        <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 leading-relaxed">
          {etf.signal === "매수" &&
            "현재 200일 이평선 위 + RSI 정상 + 경기 국면 적합 → 매수 구간으로 판단합니다."}
          {etf.signal === "관망" &&
            "고점 대비 하락 또는 지표 중립 상태 → 추가 신호 확인 후 진입을 권고합니다."}
          {etf.signal === "매도" &&
            "200일 이평선 하향 이탈 + VIX 상승 → 비중 축소를 권고합니다."}
        </div>
      </div>

      {/* 한국 투자자 안내 */}
      {etf.extra && (
        <div className="bg-blue-50 rounded-2xl p-4 mb-3 border border-blue-100">
          <div className="text-xs font-bold text-blue-700 mb-1">
            한국 투자자 안내
          </div>
          <div className="text-xs text-blue-600 leading-relaxed">{etf.extra}</div>
        </div>
      )}

      {/* 면책 조항 */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-400 leading-relaxed">
        본 정보는 참고용이며 투자 권유가 아닙니다. 과거 수익률이 미래 수익률을 보장하지 않습니다.
      </div>
    </div>
  );
}
