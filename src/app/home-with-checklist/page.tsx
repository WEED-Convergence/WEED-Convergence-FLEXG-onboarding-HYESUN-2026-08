export const metadata = {
  title: "홈",
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#F2F1EC" strokeWidth="1.8">
      <path d="M4 11L12 4L20 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10V20H18V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-400 text-[11px] font-semibold text-slate-300">
      ?
    </span>
  );
}

function InfoIcon() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[var(--border)] text-[11px] font-semibold text-[var(--text-muted)]">
      i
    </span>
  );
}

interface MenuItem {
  label: string;
  badge?: boolean;
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
  { label: "LIVE", badge: true },
  { label: "메시지" },
  { label: "게시판" },
  { label: "APP" },
  { label: "셀러" },
  { label: "제휴", badge: true },
];

function AdminGNB() {
  return (
    <header className="flex h-11 w-full shrink-0 items-center justify-between bg-[#1B1B1B] px-6">
      <div className="flex items-center gap-5">
        <HomeIcon />
        <nav className="flex items-center gap-4">
          {menuItems.map((item) => (
            <span key={item.label} className="relative text-[12px] text-slate-300">
              {item.label}
              {item.badge ? (
                <span className="absolute -right-2 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#D8342A] text-[11px] font-semibold text-white">
                  N
                </span>
              ) : null}
            </span>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-[12px] text-slate-300">
          서비스 알림
          <span className="flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#D8342A] px-1 text-[11px] font-semibold text-white">
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

interface Banner {
  bg: string;
  line1: string;
  line2: string;
}

const banners: Banner[] = [
  { bg: "#D8342A", line1: "쇼핑몰 라이브커머스 망설였다면", line2: "지금이 완벽한 타이밍!" },
  { bg: "#F2A623", line1: "미수금 없는 발주 시스템,", line2: "올해만 가입비 0원" },
  { bg: "#2D6FD1", line1: "잘 팔리는 쇼핑몰은", line2: "전략부터 다릅니다! · 컨설팅 신청하기" },
  { bg: "#2E9E4C", line1: "발주가 많아질수록 필요한건?", line2: "자동화 시스템 · 발주모아 시작하기" },
  { bg: "#5B3FA6", line1: "광고비를 줄여도", line2: "매출이 오르는 이유 · 자세히 알아보기" },
];

function BannerCard({ bg, line1, line2 }: Banner) {
  return (
    <div
      className="flex h-24 flex-col justify-center gap-1 rounded-lg px-4 text-white"
      style={{ backgroundColor: bg }}
    >
      <p className="text-[12px] font-medium leading-snug">{line1}</p>
      <p className="text-[12px] font-semibold leading-snug">{line2}</p>
    </div>
  );
}

function DonutProgress({ percent }: { percent: number }) {
  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--divider)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChecklistCard({
  name,
  total,
  highlighted,
}: {
  name: string;
  total: number;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-[10px] bg-white px-4 py-4 text-center ${
        highlighted ? "border-2 border-[var(--accent)]" : "border border-[var(--border)]"
      }`}
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <DonutProgress percent={0} />
        <span className="absolute text-[11px] font-semibold text-[var(--text-primary)]">0%</span>
      </div>
      <p className="mt-2 text-[12px] font-medium text-[var(--text-primary)]">{name}</p>
      <p className="mt-1 text-[11px] text-[var(--text-muted)]">0/{total}개 항목</p>
    </div>
  );
}

function GuideTooltip() {
  return (
    <div className="absolute left-full top-1/2 z-10 ml-3 w-[200px] -translate-y-1/2 rounded-lg bg-[var(--accent)] p-3">
      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-[var(--accent)]" />
      <p className="text-[12px] font-medium text-white">PG 신청부터 시작할까요?</p>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--accent-bg)]">
        결제 준비를 마치면 오픈이 빨라져요.
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-[var(--accent-bg)]">닫기</span>
        <span className="rounded bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--accent)]">
          시작하기
        </span>
      </div>
    </div>
  );
}

interface ChecklistCategory {
  name: string;
  total: number;
  highlighted?: boolean;
}

const checklistCategories: ChecklistCategory[] = [
  { name: "결제 준비", total: 5, highlighted: true },
  { name: "운영 필수", total: 3 },
  { name: "권장 설정", total: 2 },
  { name: "매출 확장", total: 3 },
];

interface Stat {
  label: string;
  value: number;
  danger?: boolean;
}

const stats: Stat[] = [
  { label: "미입금확인", value: 3 },
  { label: "신규주문", value: 0 },
  { label: "배송준비", value: 0 },
  { label: "배송중", value: 0 },
  { label: "배송완료", value: 0 },
  { label: "취소요청", value: 0, danger: true },
  { label: "반품요청", value: 0, danger: true },
  { label: "교환요청", value: 0, danger: true },
  { label: "미답변 상품문의", value: 0 },
];

function StatCard({ label, value, danger }: Stat) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-[var(--border)] py-4">
      <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
      <p
        className="text-[16px] font-semibold"
        style={{ color: danger ? "var(--accent)" : "var(--text-primary)" }}
      >
        {value}
      </p>
    </div>
  );
}

export default function HomeWithChecklistPage() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg)]">
      <div className="min-w-[1180px]">
      <AdminGNB />

      <div className="px-8 py-6">
        <div className="flex items-start justify-between gap-6">
          <div className="shrink-0">
            <p className="text-[13px] font-medium text-[var(--text-primary)]">
              오늘도 플렉스지와 판매는 불티나게
            </p>
            <p className="mt-1 text-[11px] text-[var(--text-muted)]">2026.08.10 월요일</p>
          </div>
          <div className="grid flex-1 grid-cols-5 gap-2.5">
            {banners.map((banner) => (
              <BannerCard key={banner.line1} {...banner} />
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-[18px]">
          <p className="text-[12px] text-[var(--text-muted)]">오픈 체크리스트</p>
          <div className="mt-3 flex items-start gap-3">
            {checklistCategories.map((category) => (
              <div key={category.name} className="relative flex-1">
                <ChecklistCard {...category} />
                {category.highlighted ? <GuideTooltip /> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-medium text-[var(--text-primary)]">오늘의 할일</p>
              <InfoIcon />
              <span className="text-[11px] text-[var(--text-muted)]">
                최근 30일 기준으로 집계된 주문 상태별 건 수입니다.
              </span>
            </div>
            <span className="text-[12px] text-[var(--text-muted)]">더보기 &gt;</span>
          </div>
          <div className="mt-3 grid grid-cols-9 gap-2.5">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
