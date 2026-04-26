import { type ETFItem, type ETFSignal, type ETFRisk } from "@/data/etf-data";

type Props = {
  etf: ETFItem;
  signalStyle: Record<ETFSignal, string>;
  riskStyle: Record<ETFRisk, string>;
  onClick: () => void;
};

export default function ETFCard({ etf, signalStyle, riskStyle, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-left hover:border-blue-200 transition-colors w-full"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 티커 아이콘 */}
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gray-600">
              {etf.ticker.slice(0, 3)}
            </span>
          </div>
          {/* 이름 */}
          <div className="min-w-0">
            <div className="font-bold text-gray-900 text-sm truncate">
              {etf.ticker}
            </div>
            <div className="text-xs text-gray-400 truncate">{etf.subcategory}</div>
          </div>
        </div>
        {/* 배지 */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              signalStyle[etf.signal]
            }`}
          >
            {etf.signal}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              riskStyle[etf.risk]
            }`}
          >
            {etf.risk}
          </span>
          <span className="text-gray-300 text-xs">›</span>
        </div>
      </div>
    </button>
  );
}
