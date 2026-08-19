export const metadata = {
  title: "승인 대기",
};

function GNB() {
  const navLinks = ["서비스", "요금", "고객사례", "고객지원", "제휴·제안"];
  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#1A1A1A] px-10">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[11px] font-semibold text-slate-900">
          F
        </span>
        <span className="text-[16px] font-semibold tracking-tight text-white">
          FLEX-G
        </span>
      </div>
      <nav className="flex items-center gap-8 text-[13px] font-medium text-slate-300">
        {navLinks.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-medium text-slate-300">로그인</span>
        <span className="rounded-full bg-red-600 px-5 py-2 text-[13px] font-semibold text-white">
          쇼핑몰 만들기
        </span>
      </div>
    </header>
  );
}

function FooterIcon({ path }: { path: string }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-slate-300">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Footer() {
  const serviceLinks = ["서비스", "요금", "고객사례", "고객지원", "제휴·제안"];
  const policyLinks = ["회사소개", "이용약관", "개인정보처리방침"];

  return (
    <footer className="w-full shrink-0 bg-[#1A1A1A] px-10 pt-8 pb-6 text-slate-300">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
        <nav className="flex flex-wrap gap-6 text-[13px]">
          {serviceLinks.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </nav>
        <nav className="flex flex-wrap gap-6 text-[13px]">
          {policyLinks.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </nav>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[16px] font-semibold text-white">FLEX-G</p>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-400">
            서울특별시 금천구 벚꽃로 298 대륭포스트타워6차 313호
            <br />
            대표이사 김형준·김동재 &nbsp;|&nbsp; 사업자번호 158-86-01603
            <br />
            고객센터 070-7771-5866 &nbsp;|&nbsp; 운영시간 평일 10:00~18:00
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FooterIcon path="M4 4H20V17H12L7 21V17H4V4Z" />
          <FooterIcon path="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C10.9 4 12 4.8 12 4.8C12 4.8 13.1 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" />
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[12px] text-slate-300">
            Family Site
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] text-slate-500">ⓒ WEEDSOFT Corp.</p>
    </footer>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="white" strokeWidth="2.4">
      <path d="M4.5 12.5L9.5 17.5L19.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type StepStatus = "done" | "active" | "upcoming";

interface Step {
  num: number;
  label: string;
  status: StepStatus;
}

const steps: Step[] = [
  { num: 1, label: "회원가입", status: "done" },
  { num: 2, label: "템플릿 선택", status: "done" },
  { num: 3, label: "승인 대기", status: "active" },
];

function StepCircle({ step }: { step: Step }) {
  if (step.status === "done") {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--success)]">
        <CheckIcon />
      </div>
    );
  }
  if (step.status === "active") {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--text-secondary)] text-[12px] font-medium text-white">
        {step.num}
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft-bg)] text-[12px] font-medium text-[var(--text-muted)]">
      {step.num}
    </div>
  );
}

function StepIndicator() {
  return (
    <div className="mt-10 flex w-full items-start">
      {steps.map((step, i) => (
        <div key={step.num} className="flex flex-1 items-start last:flex-none">
          <div className="flex w-16 flex-col items-center">
            <StepCircle step={step} />
            <span
              className="mt-2 text-center text-[11px]"
              style={{
                color:
                  step.status === "active"
                    ? "var(--text-primary)"
                    : step.status === "upcoming"
                      ? "var(--text-muted)"
                      : "var(--text-secondary)",
                fontWeight: step.status === "active" ? 600 : 400,
              }}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <div className="mt-[13px] h-px flex-1 bg-[var(--divider)]" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function ApprovalPendingPage() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border)]">
      <GNB />

      <main className="flex w-full flex-col items-center bg-[var(--bg)] px-10 py-20">
        <div className="flex w-[520px] flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft-bg)]">
            <ClockIcon />
          </div>

          <h1 className="mt-5 text-[16px] font-semibold text-[var(--text-primary)]">
            가입 승인을 검토하고 있습니다
          </h1>

          <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            영업일 기준 보통 1일 이내에 완료됩니다.
            <br />
            승인이 완료되면{" "}
            <span className="font-medium text-[var(--accent)]">이메일과 알림톡</span>을
            보내드립니다.
          </p>

          <StepIndicator />
        </div>
      </main>

      <Footer />
    </div>
  );
}
