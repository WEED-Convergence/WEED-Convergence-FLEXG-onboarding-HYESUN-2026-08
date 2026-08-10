import ChecklistPanel from "./ChecklistPanel";

export const metadata = {
  title: "오픈 체크리스트",
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#1B1B1B" strokeWidth="1.8">
      <path d="M4 11L12 4L20 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10V20H18V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-400 text-[9px] font-semibold text-slate-300">
      ?
    </span>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#9A9890" strokeWidth="1.8">
      <path d="M9 15L15 9" strokeLinecap="round" />
      <path
        d="M10.5 6.5L12 5C13.6569 3.34315 16.3431 3.34315 18 5C19.6569 6.65685 19.6569 9.34315 18 11L16.5 12.5M13.5 17.5L12 19C10.3431 20.6569 7.65685 20.6569 6 19C4.34315 17.3431 4.34315 14.6569 6 13L7.5 11.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface MenuItem {
  label: string;
  badge?: boolean;
  danger?: boolean;
}

const menuItems: MenuItem[] = [
  { label: "상품" },
  { label: "주문" },
  { label: "발주" },
  { label: "CS" },
  { label: "정산" },
  { label: "매출" },
  { label: "통계" },
  { label: "회원" },
  { label: "CRM" },
  { label: "LIVE", badge: true, danger: true },
  { label: "메시지" },
  { label: "게시판" },
  { label: "APP" },
  { label: "셀러" },
  { label: "제휴", badge: true },
];

function AdminGNB() {
  return (
    <header className="flex h-11 w-full shrink-0 items-center justify-between bg-[#1B1B1B] px-4">
      <div className="flex min-w-0 items-center gap-5">
        <div className="flex min-w-0 max-w-[140px] items-center gap-1.5">
          <span className="truncate text-[11px] text-[#8C8A82]">판매는 불티나게, ...</span>
          <LinkIcon />
        </div>

        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#8ED14F]">
          <HomeIcon />
        </span>

        <nav className="flex items-center gap-4">
          {menuItems.map((item) => (
            <span
              key={item.label}
              className="relative text-[12px]"
              style={{ color: item.danger ? "#F04B3C" : "#D4D2C9" }}
            >
              {item.label}
              {item.badge ? (
                <span className="absolute -right-2 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#D8342A] text-[7px] font-bold text-white">
                  N
                </span>
              ) : null}
            </span>
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="flex items-center gap-1 text-[12px] text-slate-300">
          서비스 알림
          <span className="flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#D8342A] px-1 text-[9px] font-semibold text-white">
            133
          </span>
        </span>
        <QuestionIcon />
        <span className="rounded bg-[#2E9E4C] px-3 py-1.5 text-[12px] font-medium text-white">
          쇼핑몰 바로 적용
        </span>
      </div>
    </header>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#B9B7AE" strokeWidth="1.6">
      <path d="M7 3H14L19 8V21H7V3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3V8H19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#B9B7AE" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3V5M12 19V21M21 12H19M5 12H3M18.4 5.6L17 7M7 17L5.6 18.4M18.4 18.4L17 17M7 7L5.6 5.6" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#B9B7AE" strokeWidth="1.6">
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M5 16H4.5C4 16 4 15.5 4 15V5C4 4.5 4.5 4 5 4H15C15.5 4 16 4.5 16 5V6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#8C8A82" strokeWidth="1.8">
      <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#8C8A82" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21L16.5 16.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#B9B7AE" strokeWidth="2">
      <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface OrderMenuItem {
  label: string;
  sub?: boolean;
  badge?: number;
}

const orderMenuTop: OrderMenuItem[] = [
  { label: "상품별 주문관리" },
  { label: "옵션별 주문현황" },
];

const orderStatusMenu: OrderMenuItem[] = [
  { label: "전체" },
  { label: "미입금확인" },
  { label: "신규주문" },
  { label: "수락대기" },
  { label: "배송준비" },
  { label: "부분배송중" },
  { label: "배송중" },
  { label: "배송완료" },
  { label: "배송예약" },
  { label: "주문자요청 배송전", badge: 8 },
  { label: "주문자요청 배송후", badge: 81 },
  { label: "주문취소" },
  { label: "반품관리" },
  { label: "교환관리" },
  { label: "휴지통" },
  { label: "주문대기" },
];

function AdminLNB() {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col bg-[#1F1E1C] px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-white">weedtuklink</span>
        <span className="rounded-full border border-[#4A4844] px-2.5 py-1 text-[10px] text-[#B9B7AE]">
          로그아웃
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <DocumentIcon />
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8ED14F] text-[11px] font-bold text-[#1B1B1B]">
          A
        </span>
        <GearIcon />
        <CopyIcon />
      </div>

      <div className="mt-4 rounded-lg bg-[#2A2926] p-3">
        <div className="flex items-center gap-2.5">
          <span className="h-9 w-9 shrink-0 rounded-md bg-[#4A4844]" />
          <div className="min-w-0">
            <p className="truncate text-[10px] text-[#9A9890]">기본 제공 테마</p>
            <p className="truncate text-[12px] font-medium text-[#8ED14F]">기본 디자인</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold italic text-white">FLEX-G</span>
            <span className="rounded-full bg-[#3B3A36] px-2 py-0.5 text-[9px] text-[#B9B7AE]">
              Page 미연동
            </span>
          </div>
          <ArrowRightIcon />
        </div>
      </div>

      <div className="mt-3 flex items-center text-[11px] text-[#B9B7AE]">
        <span className="flex-1 text-center">쇼핑몰 바로가기</span>
        <span className="h-3 w-px bg-[#4A4844]" />
        <span className="flex-1 text-center">디자인 설정</span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 rounded-md border border-[#4A4844] px-2 py-1.5">
        <span className="flex items-center gap-0.5 text-[10px] text-[#B9B7AE]">
          이름
          <ChevronDownIcon />
        </span>
        <span className="h-3 w-px bg-[#4A4844]" />
        <input
          readOnly
          value=""
          placeholder=""
          className="w-full bg-transparent text-[11px] text-[#B9B7AE] outline-none"
        />
        <SearchIcon />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[12px] font-bold text-white">주문</span>
        <span className="rounded bg-[#E8951F] px-2 py-0.5 text-[10px] font-semibold text-white">
          가이드
        </span>
      </div>

      <nav className="mt-2 space-y-0.5 overflow-y-auto">
        {orderMenuTop.map((item) => (
          <p key={item.label} className="rounded px-1.5 py-1.5 text-[13px] text-[#D4D2C9]">
            {item.label}
          </p>
        ))}

        <p className="px-1.5 pt-1.5 text-[13px] font-semibold text-white">거래상태별 주문관리</p>

        <div className="pl-2.5">
          {orderStatusMenu.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded px-1.5 py-1.5 text-[13px] text-[#D4D2C9]"
            >
              <span>{item.label}</span>
              {item.badge ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D8342A] px-1 text-[9px] font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default function OpenChecklistPopupPage() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <div className="min-w-[1180px]">
        <AdminGNB />
        <div className="flex items-stretch">
          <AdminLNB />
          <main className="flex-1 overflow-hidden">
            <ChecklistPanel />
          </main>
        </div>
      </div>
    </div>
  );
}
