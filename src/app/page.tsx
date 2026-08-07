type Variant = "seller" | "core" | "wait";

interface StepData {
  id: number;
  title: string;
  desc: string;
  subItems?: string[];
  path?: string;
  variant: Variant;
  afterLabel?: string;
}

const boxStyles: Record<Variant, string> = {
  seller: "bg-[#E6F1FB] border-[#378ADD] text-[#0C447C]",
  core: "bg-[#EEEDFE] border-[#7F77DD] text-[#3C3489]",
  wait: "bg-[#F1EFE8] border-[#B4B2A9] text-[#444441]",
};

const badgeStyles: Record<Variant, string> = {
  seller: "bg-[#378ADD]",
  core: "bg-[#7F77DD]",
  wait: "bg-[#B4B2A9]",
};

const stepsBeforeBranch: StepData[] = [
  {
    id: 1,
    title: "회원가입 완료",
    desc: "가입 절차를 마친 시점으로, 온보딩 프로세스의 시작점",
    variant: "seller",
  },
  {
    id: 2,
    title: "템플릿 선택",
    desc: "쇼핑몰 디자인 템플릿 선택",
    variant: "seller",
  },
  {
    id: 3,
    title: "상품 구성 선택",
    desc: "쇼핑몰을 어떤 상태로 시작할지 선택하는 핵심 분기 단계",
    variant: "seller",
  },
];

const branchOptions: StepData[] = [
  {
    id: 0,
    title: "상품 있는 쇼핑몰",
    desc: "샘플 상품이 채워진 상태로 시작",
    variant: "core",
  },
  {
    id: 0,
    title: "빈 템플릿",
    desc: "상품 없이 빈 상태로 시작",
    variant: "core",
  },
];

const stepsAfterBranch: StepData[] = [
  {
    id: 4,
    title: "승인 대기",
    desc: "\"가입 승인 검토중입니다\" 상태 노출 · 승인되면 이메일/오픈채팅방 안내 수신",
    variant: "wait",
    afterLabel: "승인 완료 → 어드민 진입",
  },
  {
    id: 5,
    title: "PG 신청",
    desc: "안내에 따라 PG(결제대행) 신청 진행",
    variant: "seller",
  },
  {
    id: 6,
    title: "심사용 세팅",
    desc: "PG 심사 통과를 위한 최소 조건 세팅",
    subItems: ["상품 3개 이상 등록", "공급사 등록 (자체배송 시 필수)"],
    variant: "seller",
  },
  {
    id: 7,
    title: "사업자 정보 등록",
    desc: "사업자 정보 · 통신판매업신고번호 입력",
    path: "/Setting/info",
    variant: "seller",
  },
  {
    id: 8,
    title: "유선번호 등록",
    desc: "고객 문의용 유선번호 입력",
    variant: "seller",
  },
  {
    id: 9,
    title: "추가 세팅",
    desc: "쇼핑몰 운영에 필요한 부가 기능 설정",
    subItems: [
      "발신번호 신청",
      "SNS 간편 로그인 등록 (카카오, 네이버)",
      "알림톡 등록",
    ],
    variant: "seller",
  },
  {
    id: 10,
    title: "운영 완성도를 높이는 권장 설정 안내",
    desc: "필수 세팅은 아니지만, 검색 유입 · 정산 편의 · 브랜드 완성도를 높이는 항목을 입력하도록 유도",
    subItems: ["SEO 설정", "팝빌 (무통장 자동 입금 서비스) 신청", "디자인 설정"],
    variant: "seller",
  },
];

function Box({ id, title, desc, subItems, path, variant }: StepData) {
  return (
    <div
      id={id > 0 ? `step-${id}` : undefined}
      className={`w-full rounded-lg border px-4 py-3 ${boxStyles[variant]}`}
    >
      <div className="flex items-center gap-2">
        {id > 0 ? (
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${badgeStyles[variant]}`}
          >
            {id}
          </span>
        ) : null}
        <span className="text-[14px] font-medium">{title}</span>
      </div>
      <p className="mt-1 text-[12px] opacity-80">{desc}</p>
      {subItems ? (
        <ul className="mt-2 space-y-0.5">
          {subItems.map((item) => (
            <li key={item} className="text-[11px] opacity-70">
              · {item}
            </li>
          ))}
        </ul>
      ) : null}
      {path ? (
        <p className="mt-1.5 text-[11px] opacity-60">경로: {path}</p>
      ) : null}
    </div>
  );
}

function ArrowDown({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none" className="text-slate-400">
        <line x1="8" y1="0" x2="8" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 27L3.5 20H12.5L8 27Z" fill="currentColor" />
      </svg>
      {label ? (
        <span className="mt-0.5 max-w-[240px] text-center text-[11px] leading-snug text-slate-500">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function BranchSplit() {
  return (
    <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="h-10 w-full text-slate-400" fill="none">
      <path d="M100,0 L100,16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100,16 L50,16 L50,34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100,16 L150,16 L150,34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 40L45.5 33H54.5L50 40Z" fill="currentColor" />
      <path d="M150 40L145.5 33H154.5L150 40Z" fill="currentColor" />
    </svg>
  );
}

function BranchMerge() {
  return (
    <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="h-10 w-full text-slate-400" fill="none">
      <path d="M50,0 L50,20 L100,20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M150,0 L150,20 L100,20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100,20 L100,33" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100 40L95.5 33H104.5L100 40Z" fill="currentColor" />
    </svg>
  );
}

const indexItems = [...stepsBeforeBranch, ...stepsAfterBranch].map((s) => ({
  id: s.id,
  title: s.title,
  variant: s.variant,
}));

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto flex max-w-[1100px] items-start gap-8">
        {/* 좌측: 인덱스 목록 영역 */}
        <aside className="w-[200px] shrink-0">
          <p className="mb-3 text-[13px] font-semibold text-slate-900">플렉스지 판매자 온보딩 프로세스</p>
          <nav className="space-y-0.5">
            {indexItems.map((item) => (
              <a
                key={item.id}
                href={`#step-${item.id}`}
                className={`flex items-center gap-2 rounded-md border-l-2 px-2 py-1.5 text-[13px] ${
                  item.variant === "core" || item.id === 3
                    ? "border-l-[#7F77DD] text-[#3C3489]"
                    : "border-l-transparent text-slate-600"
                }`}
              >
                <span className="w-4 shrink-0 text-[11px] tabular-nums opacity-60">
                  {item.id}
                </span>
                <span className="truncate">{item.title}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* 가운데: 콘텐츠 영역 */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto flex max-w-[640px] flex-col items-center">
            <h1 className="mb-6 self-start text-lg font-semibold text-slate-900">
              플렉스지 판매자 온보딩 프로세스
            </h1>

            {stepsBeforeBranch.map((step, idx) => (
              <div key={step.id} className="flex w-full flex-col items-center">
                <Box {...step} />
                {idx < stepsBeforeBranch.length - 1 ? <ArrowDown /> : null}
              </div>
            ))}

            <BranchSplit />
            <div className="flex w-full justify-center gap-4">
              {branchOptions.map((option, idx) => (
                <div key={idx} className="w-1/2">
                  <Box {...option} />
                </div>
              ))}
            </div>
            <BranchMerge />

            {stepsAfterBranch.map((step, idx) => (
              <div key={step.id} className="flex w-full flex-col items-center">
                <Box {...step} />
                {idx < stepsAfterBranch.length - 1 ? (
                  <ArrowDown label={step.afterLabel} />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 화면 설명 영역 */}
        <aside className="w-[280px] shrink-0">
          <p className="text-[12px] font-semibold text-slate-400">프로세스 개요</p>
        </aside>
      </div>
    </main>
  );
}
