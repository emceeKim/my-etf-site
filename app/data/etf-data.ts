// ================================================
// MIC AI Labs — ETF 데이터 파일
// 매월 이 파일만 수정하면 전체 홈페이지 자동 반영
// ================================================

export type ETFSignal = "매수" | "관망" | "매도";
export type ETFRisk = "낮음" | "중간" | "높음" | "매우 높음";

export type ETFItem = {
  ticker: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  fee: string;
  dividend: string;
  risk: ETFRisk;
  signal: ETFSignal;
  top10: { name: string; ticker: string; weight: string }[];
  sectorWeights: { sector: string; weight: string }[];
  returns: { period: string; value: string }[];
  extra: string; // 한국 투자자 특이사항
};

// ================================================
// 대분류 / 소분류 구조
// ================================================
export const CATEGORIES = [
  "전체",
  "미국 주식",
  "채권",
  "원자재",
  "글로벌",
  "한국 상장",
] as const;

export const SUBCATEGORIES: Record<string, string[]> = {
  전체: [],
  "미국 주식": ["전체", "기술주", "대형주", "전체시장", "반도체", "헬스케어", "배당주"],
  채권: ["전체", "미국 단기국채", "미국 중기국채", "미국 장기국채", "하이일드"],
  원자재: ["전체", "금", "원유", "농산물"],
  글로벌: ["전체", "신흥국", "선진국"],
  "한국 상장": ["전체", "국내 상장 해외", "국내 주식"],
};

export const CATEGORY_DESC: Record<string, string> = {
  "미국 주식":
    "나스닥·S&P 500 등 미국 증시 상장 주식을 추종합니다. 성장성이 높지만 변동성도 함께 높은 편입니다.",
  채권:
    "국채·회사채 등 채권에 투자합니다. 주식 시장 하락 시 상대적으로 안정적이며 포트폴리오 완충재 역할을 합니다.",
  원자재:
    "금·원유·농산물 등 실물 자산을 추종합니다. 인플레이션 헤지 수단으로 활용되며 주식·채권과 상관관계가 낮습니다.",
  글로벌:
    "미국 외 해외 시장에 투자합니다. 선진국(유럽·일본)과 신흥국(중국·인도)으로 나뉩니다.",
  "한국 상장":
    "국내 증권시장(KRX)에 상장된 ETF로 원화로 직접 투자할 수 있습니다. 연금저축·IRP·ISA 계좌에서도 매수 가능한 종목이 많습니다.",
};

// ================================================
// ETF 상세 데이터
// ================================================
export const ETF_DATABASE: ETFItem[] = [
  // ─── 미국 주식 / 기술주 ───────────────────────
  {
    ticker: "QQQ",
    name: "Invesco QQQ Trust",
    category: "미국 주식",
    subcategory: "기술주",
    description:
      "나스닥 100 지수를 추종합니다. 애플·마이크로소프트·엔비디아 등 대형 기술주 100개로 구성되며, AI 혁명 수혜를 가장 직접적으로 받는 ETF입니다.",
    fee: "0.20%",
    dividend: "없음 (성장형)",
    risk: "높음",
    signal: "매수",
    top10: [
      { name: "애플", ticker: "AAPL", weight: "8.9%" },
      { name: "마이크로소프트", ticker: "MSFT", weight: "8.4%" },
      { name: "엔비디아", ticker: "NVDA", weight: "7.1%" },
      { name: "아마존", ticker: "AMZN", weight: "5.2%" },
      { name: "메타", ticker: "META", weight: "4.8%" },
      { name: "알파벳 A", ticker: "GOOGL", weight: "4.2%" },
      { name: "알파벳 C", ticker: "GOOG", weight: "3.9%" },
      { name: "브로드컴", ticker: "AVGO", weight: "3.1%" },
      { name: "테슬라", ticker: "TSLA", weight: "2.8%" },
      { name: "코스트코", ticker: "COST", weight: "2.3%" },
    ],
    sectorWeights: [
      { sector: "기술", weight: "65%" },
      { sector: "임의소비재", weight: "9%" },
      { sector: "헬스케어", weight: "6%" },
      { sector: "산업재", weight: "4%" },
      { sector: "기타", weight: "16%" },
    ],
    returns: [
      { period: "1개월", value: "+3.2%" },
      { period: "6개월", value: "+9.1%" },
      { period: "1년", value: "+18.4%" },
      { period: "3년", value: "+42.1%" },
      { period: "5년", value: "+118.3%" },
    ],
    extra: "연금저축·IRP 불가 (해외 상장). TIGER 미국나스닥100으로 대체 가능.",
  },
  // ─── 미국 주식 / 대형주 ───────────────────────
  {
    ticker: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    category: "미국 주식",
    subcategory: "대형주",
    description:
      "S&P 500 지수를 추종하는 세계 최대 ETF입니다. 미국 대형주 500개에 분산 투자하며, 가장 거래량이 많아 유동성이 뛰어납니다.",
    fee: "0.09%",
    dividend: "분기 배당",
    risk: "중간",
    signal: "관망",
    top10: [
      { name: "애플", ticker: "AAPL", weight: "7.2%" },
      { name: "마이크로소프트", ticker: "MSFT", weight: "6.8%" },
      { name: "엔비디아", ticker: "NVDA", weight: "5.9%" },
      { name: "아마존", ticker: "AMZN", weight: "4.1%" },
      { name: "메타", ticker: "META", weight: "2.7%" },
      { name: "알파벳 A", ticker: "GOOGL", weight: "2.2%" },
      { name: "버크셔 해서웨이", ticker: "BRK.B", weight: "1.8%" },
      { name: "알파벳 C", ticker: "GOOG", weight: "1.8%" },
      { name: "JP모건", ticker: "JPM", weight: "1.6%" },
      { name: "일라이 릴리", ticker: "LLY", weight: "1.5%" },
    ],
    sectorWeights: [
      { sector: "기술", weight: "31%" },
      { sector: "금융", weight: "13%" },
      { sector: "헬스케어", weight: "11%" },
      { sector: "임의소비재", weight: "10%" },
      { sector: "기타", weight: "35%" },
    ],
    returns: [
      { period: "1개월", value: "+2.1%" },
      { period: "6개월", value: "+6.4%" },
      { period: "1년", value: "+12.1%" },
      { period: "3년", value: "+28.4%" },
      { period: "5년", value: "+84.2%" },
    ],
    extra: "연금저축·IRP 불가. KODEX 미국S&P500 또는 TIGER 미국S&P500으로 대체 가능.",
  },
  // ─── 미국 주식 / 반도체 ───────────────────────
  {
    ticker: "SOXX",
    name: "iShares Semiconductor ETF",
    category: "미국 주식",
    subcategory: "반도체",
    description:
      "반도체 산업에 집중 투자하는 ETF입니다. 엔비디아·TSMC·퀄컴 등 글로벌 반도체 핵심 기업 30여 개로 구성됩니다. AI 수요 폭증으로 최근 주목받는 섹터입니다.",
    fee: "0.35%",
    dividend: "없음",
    risk: "매우 높음",
    signal: "관망",
    top10: [
      { name: "엔비디아", ticker: "NVDA", weight: "8.2%" },
      { name: "브로드컴", ticker: "AVGO", weight: "8.1%" },
      { name: "TSMC", ticker: "TSM", weight: "7.9%" },
      { name: "퀄컴", ticker: "QCOM", weight: "4.8%" },
      { name: "AMD", ticker: "AMD", weight: "4.5%" },
      { name: "텍사스 인스트루먼트", ticker: "TXN", weight: "4.2%" },
      { name: "어플라이드 머티리얼즈", ticker: "AMAT", weight: "4.1%" },
      { name: "마이크론", ticker: "MU", weight: "3.8%" },
      { name: "ASML", ticker: "ASML", weight: "3.7%" },
      { name: "인텔", ticker: "INTC", weight: "3.2%" },
    ],
    sectorWeights: [
      { sector: "반도체", weight: "100%" },
    ],
    returns: [
      { period: "1개월", value: "+4.1%" },
      { period: "6개월", value: "+11.3%" },
      { period: "1년", value: "+22.7%" },
      { period: "3년", value: "+58.4%" },
      { period: "5년", value: "+189.2%" },
    ],
    extra: "변동성 매우 높음. 경기 침체 시 50% 이상 하락 사례 있음. 비중 20% 이내 권고.",
  },
  // ─── 미국 주식 / 헬스케어 ─────────────────────
  {
    ticker: "XLV",
    name: "Health Care Select Sector SPDR",
    category: "미국 주식",
    subcategory: "헬스케어",
    description:
      "헬스케어 섹터 ETF입니다. 제약·바이오·의료기기 기업 중심으로 구성됩니다. 경기 방어주로서 침체기에도 상대적으로 안정적인 성과를 보입니다.",
    fee: "0.10%",
    dividend: "분기 배당",
    risk: "낮음",
    signal: "매수",
    top10: [
      { name: "일라이 릴리", ticker: "LLY", weight: "12.1%" },
      { name: "유나이티드헬스", ticker: "UNH", weight: "9.8%" },
      { name: "애브비", ticker: "ABBV", weight: "6.2%" },
      { name: "존슨앤존슨", ticker: "JNJ", weight: "5.9%" },
      { name: "메르크", ticker: "MRK", weight: "5.4%" },
      { name: "써모 피셔", ticker: "TMO", weight: "4.1%" },
      { name: "다나허", ticker: "DHR", weight: "3.2%" },
      { name: "화이자", ticker: "PFE", weight: "3.0%" },
      { name: "암젠", ticker: "AMGN", weight: "2.9%" },
      { name: "보스턴 사이언티픽", ticker: "BSX", weight: "2.7%" },
    ],
    sectorWeights: [
      { sector: "제약", weight: "28%" },
      { sector: "헬스케어 서비스", weight: "22%" },
      { sector: "바이오테크", weight: "18%" },
      { sector: "의료기기", weight: "17%" },
      { sector: "기타", weight: "15%" },
    ],
    returns: [
      { period: "1개월", value: "+1.4%" },
      { period: "6개월", value: "+5.2%" },
      { period: "1년", value: "+9.8%" },
      { period: "3년", value: "+18.4%" },
      { period: "5년", value: "+52.1%" },
    ],
    extra: "연금저축·IRP 불가. TIGER 미국헬스케어 등으로 일부 대체 가능.",
  },
  // ─── 채권 / 중기국채 ──────────────────────────
  {
    ticker: "IEF",
    name: "iShares 7-10 Year Treasury Bond ETF",
    category: "채권",
    subcategory: "미국 중기국채",
    description:
      "만기 7~10년 미국 국채에 투자합니다. 안정성과 수익성의 균형점으로 금리 인하 사이클 진입 시 수익이 발생합니다. 포트폴리오 핵심 헤지 수단입니다.",
    fee: "0.15%",
    dividend: "월 배당",
    risk: "낮음",
    signal: "매수",
    top10: [
      { name: "미국 국채 4.625% 2030", ticker: "-", weight: "4.2%" },
      { name: "미국 국채 4.375% 2031", ticker: "-", weight: "4.1%" },
      { name: "미국 국채 3.875% 2030", ticker: "-", weight: "3.9%" },
      { name: "미국 국채 4.250% 2032", ticker: "-", weight: "3.8%" },
      { name: "미국 국채 4.500% 2033", ticker: "-", weight: "3.6%" },
      { name: "미국 국채 3.500% 2033", ticker: "-", weight: "3.4%" },
      { name: "미국 국채 4.000% 2032", ticker: "-", weight: "3.3%" },
      { name: "미국 국채 3.750% 2031", ticker: "-", weight: "3.1%" },
      { name: "미국 국채 4.125% 2033", ticker: "-", weight: "3.0%" },
      { name: "미국 국채 3.625% 2031", ticker: "-", weight: "2.9%" },
    ],
    sectorWeights: [
      { sector: "미국 국채 (7~10년)", weight: "100%" },
    ],
    returns: [
      { period: "1개월", value: "+0.8%" },
      { period: "6개월", value: "+2.3%" },
      { period: "1년", value: "+4.2%" },
      { period: "3년", value: "-8.4%" },
      { period: "5년", value: "+2.1%" },
    ],
    extra: "연금저축·IRP 불가. TIGER 미국채10년선물 등으로 일부 대체 가능.",
  },
  // ─── 채권 / 장기국채 ──────────────────────────
  {
    ticker: "TLT",
    name: "iShares 20+ Year Treasury Bond ETF",
    category: "채권",
    subcategory: "미국 장기국채",
    description:
      "만기 20년 이상 미국 장기국채에 투자합니다. 금리 변동에 가장 민감하게 반응합니다. 침체기 강력한 헤지 수단이나 금리 상승 시 큰 손실 가능합니다.",
    fee: "0.15%",
    dividend: "월 배당",
    risk: "중간",
    signal: "관망",
    top10: [
      { name: "미국 국채 4.750% 2053", ticker: "-", weight: "5.1%" },
      { name: "미국 국채 4.500% 2052", ticker: "-", weight: "4.8%" },
      { name: "미국 국채 4.000% 2051", ticker: "-", weight: "4.4%" },
      { name: "미국 국채 3.875% 2050", ticker: "-", weight: "4.2%" },
      { name: "미국 국채 3.625% 2053", ticker: "-", weight: "3.9%" },
      { name: "미국 국채 3.000% 2048", ticker: "-", weight: "3.7%" },
      { name: "미국 국채 2.875% 2049", ticker: "-", weight: "3.5%" },
      { name: "미국 국채 2.250% 2050", ticker: "-", weight: "3.3%" },
      { name: "미국 국채 2.000% 2051", ticker: "-", weight: "3.1%" },
      { name: "미국 국채 1.875% 2051", ticker: "-", weight: "3.0%" },
    ],
    sectorWeights: [
      { sector: "미국 국채 (20년 이상)", weight: "100%" },
    ],
    returns: [
      { period: "1개월", value: "+1.1%" },
      { period: "6개월", value: "+3.4%" },
      { period: "1년", value: "-2.1%" },
      { period: "3년", value: "-28.4%" },
      { period: "5년", value: "-18.2%" },
    ],
    extra: "금리 1% 변동 시 가격 15~18% 변동. 레버리지처럼 반응하므로 비중 조절 필수.",
  },
  // ─── 원자재 / 금 ──────────────────────────────
  {
    ticker: "GLD",
    name: "SPDR Gold Shares",
    category: "원자재",
    subcategory: "금",
    description:
      "금 현물 가격을 추종합니다. 수천 년간 안전자산으로 인정받은 금에 ETF 형태로 투자합니다. 달러 약세·인플레이션·지정학적 리스크 상승 시 강세를 보입니다.",
    fee: "0.40%",
    dividend: "없음",
    risk: "중간",
    signal: "매수",
    top10: [
      { name: "금 현물", ticker: "GOLD", weight: "100%" },
    ],
    sectorWeights: [
      { sector: "금 현물", weight: "100%" },
    ],
    returns: [
      { period: "1개월", value: "+2.8%" },
      { period: "6개월", value: "+8.4%" },
      { period: "1년", value: "+14.2%" },
      { period: "3년", value: "+32.1%" },
      { period: "5년", value: "+72.4%" },
    ],
    extra: "운용보수가 높은 편. 더 저렴한 대안으로 IAU(0.25%) 있음. 한국 상장: ACE 골드선물 레버리지.",
  },
  // ─── 한국 상장 / 국내 상장 해외 ───────────────
  {
    ticker: "TIGER 미국나스닥100",
    name: "TIGER 미국나스닥100",
    category: "한국 상장",
    subcategory: "국내 상장 해외",
    description:
      "QQQ와 동일한 나스닥 100 지수를 국내 증시에서 원화로 투자할 수 있는 ETF입니다. 연금저축·IRP·ISA 계좌에서 매수 가능하며 환노출 방식입니다.",
    fee: "0.07%",
    dividend: "없음",
    risk: "높음",
    signal: "매수",
    top10: [
      { name: "애플", ticker: "AAPL", weight: "8.9%" },
      { name: "마이크로소프트", ticker: "MSFT", weight: "8.4%" },
      { name: "엔비디아", ticker: "NVDA", weight: "7.1%" },
      { name: "아마존", ticker: "AMZN", weight: "5.2%" },
      { name: "메타", ticker: "META", weight: "4.8%" },
      { name: "알파벳 A", ticker: "GOOGL", weight: "4.2%" },
      { name: "알파벳 C", ticker: "GOOG", weight: "3.9%" },
      { name: "브로드컴", ticker: "AVGO", weight: "3.1%" },
      { name: "테슬라", ticker: "TSLA", weight: "2.8%" },
      { name: "코스트코", ticker: "COST", weight: "2.3%" },
    ],
    sectorWeights: [
      { sector: "기술", weight: "65%" },
      { sector: "임의소비재", weight: "9%" },
      { sector: "헬스케어", weight: "6%" },
      { sector: "기타", weight: "20%" },
    ],
    returns: [
      { period: "1개월", value: "+3.0%" },
      { period: "6개월", value: "+8.7%" },
      { period: "1년", value: "+17.9%" },
      { period: "3년", value: "+40.2%" },
      { period: "5년", value: "+112.4%" },
    ],
    extra: "연금저축·IRP·ISA 모두 가능. 환노출 방식 (달러 강세 시 추가 수익). 운용보수 QQQ 대비 매우 저렴.",
  },
  // ─── 글로벌 / 신흥국 ──────────────────────────
  {
    ticker: "EEM",
    name: "iShares MSCI Emerging Markets ETF",
    category: "글로벌",
    subcategory: "신흥국",
    description:
      "중국·인도·브라질·한국 등 신흥국 주식에 투자합니다. 고위험 고수익 성격이며 달러 강세 시 환율 영향으로 수익률이 낮아질 수 있습니다.",
    fee: "0.68%",
    dividend: "반기 배당",
    risk: "높음",
    signal: "관망",
    top10: [
      { name: "TSMC", ticker: "TSM", weight: "7.8%" },
      { name: "삼성전자", ticker: "005930", weight: "4.2%" },
      { name: "텐센트", ticker: "700", weight: "3.9%" },
      { name: "알리바바", ticker: "BABA", weight: "2.8%" },
      { name: "릴라이언스 인더스트리", ticker: "RELIANCE", weight: "2.1%" },
      { name: "메이투안", ticker: "3690", weight: "1.8%" },
      { name: "인포시스", ticker: "INFY", weight: "1.6%" },
      { name: "PDD홀딩스", ticker: "PDD", weight: "1.5%" },
      { name: "HDFC은행", ticker: "HDFCBANK", weight: "1.4%" },
      { name: "아이씨비씨", ticker: "1398", weight: "1.3%" },
    ],
    sectorWeights: [
      { sector: "기술", weight: "22%" },
      { sector: "금융", weight: "21%" },
      { sector: "임의소비재", weight: "13%" },
      { sector: "에너지", weight: "8%" },
      { sector: "기타", weight: "36%" },
    ],
    returns: [
      { period: "1개월", value: "+1.2%" },
      { period: "6개월", value: "+3.8%" },
      { period: "1년", value: "+5.4%" },
      { period: "3년", value: "-4.2%" },
      { period: "5년", value: "+12.8%" },
    ],
    extra: "운용보수 높음(0.68%). 더 저렴한 대안으로 IEMG(0.09%) 있음.",
  },
];

// ================================================
// 이달의 추천 ETF (매월 여기만 수정)
// ================================================
export const THIS_MONTH_PICKS = [
  {
    rank: "1위",
    ticker: "KODEX 미국반도체",
    comment: "HBM4 양산 본격화 — AI 수요 구조적 성장 수혜. 공격형 포트폴리오 40% 권고",
    aiSummary: "4개 AI 전원 매수. 모멘텀 분석가 AI가 '지금이 핵심 진입 구간'으로 강조.",
  },
  {
    rank: "2위",
    ticker: "TIGER 미국나스닥100",
    comment: "빅테크 AI 수익화 코어 ETF — 연금·IRP 가능, 총보수 0.07% 최저 수준",
    aiSummary: "안정형·균형형 모두 동의. 검증자 AI가 핵심 성장 코어로 채택.",
  },
  {
    rank: "3위",
    ticker: "HANARO 전력설비투자",
    comment: "AI 데이터센터 전력인프라 수혜 — LS ELECTRIC·효성중공업·HD현대일렉트릭",
    aiSummary: "거시분석가 AI와 모멘텀 분석가 AI 공동 추천. 중장기 구조적 수혜 확실.",
  },
  {
    rank: "4위",
    ticker: "ACE 미국배당다우존스",
    comment: "미국판 SCHD 전략 — 배당 성장 + 안정적 현금흐름. 안정형 60% 권고",
    aiSummary: "리스크 관리자 AI 강력 추천. 시장 변동성 확대 시 방어 포지션.",
  },
  {
    rank: "5위",
    ticker: "TIGER AI반도체TOP10",
    comment: "국내 AI 반도체 밸류체인 TOP10 — SK하이닉스·삼성전자·한미반도체",
    aiSummary: "모멘텀 분석가 AI 추천. 3개월 수익률 상위권, HBM 직접 수혜주.",
  },
];

// ================================================
// 경제지표 (매월 여기만 수정)
// ================================================
export const ECONOMIC_INDICATORS = [
  { name: "ISM PMI", value: "48.7", status: "위험" as const, desc: "수축권 (50 미만)" },
  { name: "장단기금리차", value: "-0.3%", status: "위험" as const, desc: "10Y-2Y 역전 지속" },
  { name: "실업률", value: "4.4%", status: "주의" as const, desc: "상승 추세" },
  { name: "PCE 인플레이션", value: "2.7%", status: "주의" as const, desc: "목표치 2% 상회" },
  { name: "S&P 500", value: "5,400", status: "보통" as const, desc: "200일 이평선 위" },
  { name: "VIX 공포지수", value: "18.2", status: "보통" as const, desc: "안정권 유지" },
];

// ================================================
// 투자 성향별 추천 (텍스트 데이터)
// ================================================
export const PORTFOLIO_TYPES = [
  {
    type: "적립식 장기 투자",
    target: "20~40대 직장인",
    desc: "매월 일정 금액을 꾸준히 투자하는 분께 적합합니다. 타이밍을 맞추려 하지 말고 꾸준히 매수하는 것이 가장 중요합니다.",
    picks: [
      { ticker: "SPY", weight: "50%" },
      { ticker: "QQQ", weight: "30%" },
      { ticker: "IEF", weight: "20%" },
    ],
  },
  {
    type: "은퇴 준비",
    target: "50대",
    desc: "원금 보전을 중시하면서 안정적인 수익을 원하는 분께 적합합니다. 변동성을 줄이고 배당 수익도 함께 노립니다.",
    picks: [
      { ticker: "IEF", weight: "40%" },
      { ticker: "SPY", weight: "30%" },
      { ticker: "XLV", weight: "20%" },
      { ticker: "GLD", weight: "10%" },
    ],
  },
  {
    type: "공격적 성장",
    target: "30대 위험 감수 가능",
    desc: "단기 변동성을 감내하고 장기 고수익을 원하는 분께 적합합니다. 단기 하락에 흔들리지 않는 멘탈이 필요합니다.",
    picks: [
      { ticker: "QQQ", weight: "50%" },
      { ticker: "SOXX", weight: "30%" },
      { ticker: "SPY", weight: "20%" },
    ],
  },
  {
    type: "경기 불안 대비",
    target: "안전 자산 선호",
    desc: "시장 변동성이 클 때 자산을 지키고 싶은 분께 적합합니다. 수익보다 손실 방어가 목표입니다.",
    picks: [
      { ticker: "IEF", weight: "50%" },
      { ticker: "GLD", weight: "30%" },
      { ticker: "XLV", weight: "20%" },
    ],
  },
];
