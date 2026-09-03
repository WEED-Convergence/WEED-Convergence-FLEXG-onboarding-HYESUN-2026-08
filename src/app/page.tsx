interface StepData {
  id: number;
  title: string;
  desc: string;
  subItems?: string[];
  path?: string;
  highlight?: boolean;
  afterLabel?: string;
}

const stepsIntro: StepData[] = [
  {
    id: 1,
    title: "회원가입 완료",
    desc: "가입 절차를 마친 시점으로, 온보딩 프로세스의 시작점",
  },
  {
    id: 2,
    title: "템플릿 선택",
    desc: "쇼핑몰 디자인 템플릿 선택 (선택한 템플릿에 카테고리별 샘플 상품이 자동으로 등록되어 있음)",
    highlight: true,
  },
];

// 아래 4개 박스는 오픈 체크리스트의 4개 카테고리(결제 준비 · 운영 필수 · 권장 설정 · 매출 확장)와
// 각 카테고리 내 항목 순서를 그대로 반영합니다. 체크리스트가 바뀌면 이 배열도 함께 갱신해야 합니다.
const [step3, step4, step5, step6, step7]: StepData[] = [
  {
    id: 3,
    title: "승인 대기",
    desc: "\"가입 승인 검토중입니다\" 상태 노출 · 승인되면 이메일과 알림톡 발송",
    afterLabel: "승인 완료 → 어드민 진입",
  },
  {
    id: 4,
    title: "결제 준비",
    desc: "오픈 체크리스트 · 결제 준비 카테고리",
    subItems: [
      "PG 신청하기",
      "공급사 등록하기",
      "상품 등록하기",
      "사업자 정보 등록하기",
    ],
  },
  {
    id: 5,
    title: "운영 필수",
    desc: "오픈 체크리스트 · 운영 필수 카테고리",
    subItems: ["발신번호 신청하기", "알림톡 등록하기", "현금영수증 설정하기", "SNS 간편 로그인 등록하기"],
  },
  {
    id: 6,
    title: "권장 설정",
    desc: "오픈 체크리스트 · 권장 설정 카테고리",
    subItems: ["검색 노출 정보 등록하기", "약관 확인하기", "보안 설정하기"],
  },
  {
    id: 7,
    title: "매출 확장",
    desc: "오픈 체크리스트 · 매출 확장 카테고리",
    subItems: ["CRM 설정하기", "라이브커머스 설정하기"],
  },
];

function Box({ id, title, path, highlight }: StepData) {
  return (
    <div
      id={id > 0 ? `step-${id}` : undefined}
      className={`w-[280px] rounded-lg px-4 py-3 ${
        highlight
          ? "border-2 border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent-text)]"
          : "border border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)]"
      }`}
    >
      <div className="flex items-center gap-2">
        {id > 0 ? (
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${
              highlight ? "bg-[var(--accent)]" : "bg-[var(--text-primary)]"
            }`}
          >
            {id}
          </span>
        ) : null}
        <span className="text-[13px] font-semibold">{title}</span>
      </div>
      {path ? (
        <p className="mt-1.5 text-[11px] text-[var(--text-secondary)]">
          경로: {path}
        </p>
      ) : null}
    </div>
  );
}

function ArrowDown({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none" className="text-[var(--text-muted)]">
        <line x1="8" y1="0" x2="8" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 27L3.5 20H12.5L8 27Z" fill="currentColor" />
      </svg>
      {label ? (
        <span className="mt-0.5 max-w-[240px] text-center text-[11px] leading-snug text-[var(--text-secondary)]">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1
        id="top"
        className="mb-6 self-start text-[16px] font-semibold text-[var(--text-primary)]"
      >
        플렉스지 판매자 온보딩 프로세스
      </h1>

      {stepsIntro.map((step, idx) => (
        <div key={step.id} className="flex w-full flex-col items-center">
          <Box {...step} />
          {idx < stepsIntro.length - 1 ? <ArrowDown /> : null}
        </div>
      ))}

      <ArrowDown />

      <Box {...step3} />

      <ArrowDown label={step3.afterLabel} />

      <Box {...step4} />

      <ArrowDown />

      <Box {...step5} />
      <ArrowDown />

      <Box {...step6} />
      <ArrowDown />
      <Box {...step7} />
    </div>
  );
}
