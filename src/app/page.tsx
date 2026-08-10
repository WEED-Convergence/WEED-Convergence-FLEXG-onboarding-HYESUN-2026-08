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

const [step3, step5, step6, step7, step8, step9]: StepData[] = [
  {
    id: 3,
    title: "승인 대기",
    desc: "\"가입 승인 검토중입니다\" 상태 노출 · 승인되면 이메일/오픈채팅방 안내 수신",
    afterLabel: "승인 완료 → 어드민 진입",
  },
  {
    id: 4,
    title: "심사용 세팅",
    desc: "PG 심사 통과를 위한 최소 조건 세팅",
    subItems: ["공급사 등록 (자체배송 시 필수)", "템플릿 선택 시 자동 등록된 샘플 상품 확인"],
  },
  {
    id: 5,
    title: "사업자 정보 등록",
    desc: "사업자 정보 · 통신판매업신고번호 입력",
    path: "/Setting/info",
  },
  {
    id: 6,
    title: "유선번호 등록",
    desc: "고객 문의용 유선번호 입력",
  },
  {
    id: 7,
    title: "추가 세팅",
    desc: "쇼핑몰 운영에 필요한 부가 기능 설정",
    subItems: [
      "발신번호 신청",
      "SNS 간편 로그인 등록 (카카오, 네이버)",
      "알림톡 등록",
    ],
  },
  {
    id: 8,
    title: "운영 완성도를 높이는 권장 설정 안내",
    desc: "필수 세팅은 아니지만, 검색 유입 · 정산 편의 · 브랜드 완성도를 높이는 항목을 입력하도록 유도",
    subItems: ["SEO 설정", "팝빌 (무통장 자동 입금 서비스) 신청", "디자인 설정"],
  },
];

function Box({ id, title, desc, subItems, path, highlight }: StepData) {
  return (
    <div
      id={id > 0 ? `step-${id}` : undefined}
      className={`w-[280px] rounded-lg px-4 py-3 ${
        highlight
          ? "border-2 border-red-500 bg-red-50 text-red-900"
          : "border border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)]"
      }`}
    >
      <div className="flex items-center gap-2">
        {id > 0 ? (
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${
              highlight ? "bg-red-600" : "bg-[var(--text-primary)]"
            }`}
          >
            {id}
          </span>
        ) : null}
        <span className="text-[14px] font-medium">{title}</span>
      </div>
      <p className={`mt-1 text-[12px] ${highlight ? "text-red-700" : "text-[var(--text-secondary)]"}`}>
        {desc}
      </p>
      {subItems ? (
        <ul className="mt-2 space-y-0.5">
          {subItems.map((item) => (
            <li
              key={item}
              className={`text-[11px] ${highlight ? "text-red-700" : "text-[var(--text-secondary)]"}`}
            >
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
    <div className="w-[260px] rounded-lg border border-dashed border-[#0F6E56] bg-[#E1F5EE] px-3.5 py-2.5">
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

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1
        id="top"
        className="mb-6 self-start text-lg font-semibold text-slate-900"
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
      <MessageBlock
        label="알림톡"
        title="미진행 리마인드"
        desc="2단계(템플릿 선택) 미완료 상태 일정시간 지속 시 발송"
      />
      <ArrowDown />

      <Box {...step3} />

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
      <ArrowDown label={step3.afterLabel} />

      <Box {...step5} />
      <ArrowDown />
      <Box {...step6} />
      <ArrowDown />
      <Box {...step7} />
      <ArrowDown />
      <Box {...step8} />

      <ArrowDown />
      <MessageBlock
        label="알림톡"
        title="정체구간 리마인드"
        desc="4~7단계 중 미완료 항목이 며칠 이상 지속 시 발송"
      />
      <ArrowDown />
      <MessageBlock
        label="알림톡"
        title="오픈 가능 안내"
        desc="7단계 완료 직후, 오픈 가능 상태 진입 안내"
      />
      <ArrowDown />

      <Box {...step9} />
    </div>
  );
}
