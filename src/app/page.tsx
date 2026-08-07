interface StepData {
  id: number;
  title: string;
  desc: string;
  subItems?: string[];
  path?: string;
  emphasis?: boolean;
  afterLabel?: string;
}

const stepsBeforeBranch: StepData[] = [
  {
    id: 1,
    title: "회원가입 완료",
    desc: "가입 절차를 마친 시점으로, 온보딩 프로세스의 시작점",
  },
  {
    id: 2,
    title: "템플릿 선택",
    desc: "쇼핑몰 디자인 템플릿 선택",
  },
  {
    id: 3,
    title: "상품 구성 선택",
    desc: "쇼핑몰을 어떤 상태로 시작할지 선택하는 핵심 분기 단계",
  },
];

const branchOptions: StepData[] = [
  {
    id: 0,
    title: "상품 있는 쇼핑몰",
    desc: "샘플 상품이 채워진 상태로 시작",
    emphasis: true,
  },
  {
    id: 0,
    title: "빈 템플릿",
    desc: "상품 없이 빈 상태로 시작",
    emphasis: true,
  },
];

const [step4, step5, step6, step7, step8, step9, step10]: StepData[] = [
  {
    id: 4,
    title: "승인 대기",
    desc: "\"가입 승인 검토중입니다\" 상태 노출 · 승인되면 이메일/오픈채팅방 안내 수신",
    afterLabel: "승인 완료 → 어드민 진입",
  },
  {
    id: 5,
    title: "PG 신청",
    desc: "안내에 따라 PG(결제대행) 신청 진행",
  },
  {
    id: 6,
    title: "심사용 세팅",
    desc: "PG 심사 통과를 위한 최소 조건 세팅",
    subItems: ["상품 3개 이상 등록", "공급사 등록 (자체배송 시 필수)"],
  },
  {
    id: 7,
    title: "사업자 정보 등록",
    desc: "사업자 정보 · 통신판매업신고번호 입력",
    path: "/Setting/info",
  },
  {
    id: 8,
    title: "유선번호 등록",
    desc: "고객 문의용 유선번호 입력",
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
  },
  {
    id: 10,
    title: "운영 완성도를 높이는 권장 설정 안내",
    desc: "필수 세팅은 아니지만, 검색 유입 · 정산 편의 · 브랜드 완성도를 높이는 항목을 입력하도록 유도",
    subItems: ["SEO 설정", "팝빌 (무통장 자동 입금 서비스) 신청", "디자인 설정"],
  },
];

function Box({ id, title, desc, subItems, path, emphasis }: StepData) {
  return (
    <div
      id={id > 0 ? `step-${id}` : undefined}
      className={`w-full rounded-lg ${
        emphasis ? "border-2" : "border"
      } border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-[var(--text-primary)]`}
    >
      <div className="flex items-center gap-2">
        {id > 0 ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--text-primary)] text-[10px] font-semibold text-white">
            {id}
          </span>
        ) : null}
        <span className="text-[14px] font-medium">{title}</span>
      </div>
      <p className="mt-1 text-[12px] text-[var(--text-secondary)]">{desc}</p>
      {subItems ? (
        <ul className="mt-2 space-y-0.5">
          {subItems.map((item) => (
            <li key={item} className="text-[11px] text-[var(--text-secondary)]">
              · {item}
            </li>
          ))}
        </ul>
      ) : null}
      {path ? (
        <p className="mt-1.5 text-[11px] text-[var(--text-secondary)]">
          경로: {path}
        </p>
      ) : null}
    </div>
  );
}

function MessageBlock({
  label,
  title,
  desc,
  note,
}: {
  label: "알림톡" | "해피콜";
  title: string;
  desc?: string;
  note?: string;
}) {
  return (
    <div className="w-[90%] rounded-lg border border-dashed border-[#0F6E56] bg-[#E1F5EE] px-3.5 py-2.5">
      <p className="text-[11px] font-semibold text-[#0F6E56]">{label}</p>
      {note ? (
        <p className="mt-0.5 text-[10px] text-[#0F6E56]/80">{note}</p>
      ) : null}
      <p className="mt-1 text-[13px] font-medium text-[#04342C]">{title}</p>
      {desc ? (
        <p className="mt-0.5 text-[11px] text-[#0F6E56]">{desc}</p>
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

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto flex max-w-[1100px] items-start gap-8">
        {/* 좌측: 인덱스 목록 영역 */}
        <aside className="w-[200px] shrink-0">
          <a
            href="#top"
            className="text-[13px] font-semibold text-slate-900 hover:underline"
          >
            플렉스지 판매자 온보딩 프로세스
          </a>
        </aside>

        {/* 가운데: 콘텐츠 영역 */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto flex max-w-[640px] flex-col items-center">
            <h1
              id="top"
              className="mb-6 self-start text-lg font-semibold text-slate-900"
            >
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

            <MessageBlock
              label="알림톡"
              title="미진행 리마인드"
              desc="2~3단계 미완료 상태 일정시간 지속 시 발송"
            />
            <ArrowDown />

            <Box {...step4} />

            <ArrowDown />
            <MessageBlock
              label="알림톡"
              title="승인 완료 안내"
              desc="오픈채팅방 입장 링크 안내"
            />
            <ArrowDown />
            <MessageBlock
              label="해피콜"
              title="가입 경로 확인 · 오픈채팅방 재안내"
              note="메시지로 오픈채팅방 미인입 시"
            />
            <ArrowDown label={step4.afterLabel} />

            <Box {...step5} />
            <ArrowDown />
            <Box {...step6} />
            <ArrowDown />
            <Box {...step7} />
            <ArrowDown />
            <Box {...step8} />
            <ArrowDown />
            <Box {...step9} />

            <ArrowDown />
            <MessageBlock
              label="알림톡"
              title="정체구간 리마인드"
              desc="6~9단계 중 미완료 항목이 며칠 이상 지속 시 발송"
            />
            <ArrowDown />
            <MessageBlock
              label="알림톡"
              title="오픈 가능 안내"
              desc="9단계 완료 직후, 오픈 가능 상태 진입 안내"
            />
            <ArrowDown />

            <Box {...step10} />
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
