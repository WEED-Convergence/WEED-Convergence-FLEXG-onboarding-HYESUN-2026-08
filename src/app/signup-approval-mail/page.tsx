export const metadata = {
  title: "회원가입 승인 완료 시 메일",
};

interface InfoRow {
  label: string;
  value: string;
  link?: boolean;
}

const infoRows: InfoRow[] = [
  { label: "사업자명", value: "위드소프트" },
  { label: "쇼핑몰 아이디", value: "flexgtest22" },
  { label: "쇼핑몰 주소", value: "https://flexgtest22.flexg.shop", link: true },
  { label: "쇼핑몰 관리자 주소", value: "https://flexgtest22.flexgate.co.kr", link: true },
  { label: "가입일", value: "2026-08-10 13:10:11" },
];

function MailHeader() {
  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-center bg-[#1A1A1A]">
      <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[11px] font-semibold text-slate-900">
        F
      </span>
      <span className="ml-2 text-[15px] font-semibold tracking-tight text-white">
        FLEX-G
      </span>
    </div>
  );
}

function SignupInfoCard() {
  return (
    <div className="mt-10 w-full text-left">
      <p className="text-[14px] font-semibold text-[var(--text-primary)]">
        나의 가입 정보
      </p>
      <div className="mt-3 overflow-hidden rounded-[10px] border border-[var(--border)]">
        {infoRows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center gap-4 px-4 py-3 ${
              i < infoRows.length - 1 ? "border-b border-[var(--divider)]" : ""
            }`}
          >
            <span className="w-[120px] shrink-0 text-[12px] text-[var(--text-muted)]">
              {row.label}
            </span>
            <span
              className={`text-[13px] ${
                row.link ? "text-[#378ADD]" : "text-[var(--text-primary)]"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MailFooter() {
  return (
    <footer className="w-full border-t border-[var(--divider)] px-8 pb-8 pt-6 text-center">
      <p className="text-[12px] font-semibold text-[var(--text-secondary)]">FLEX-G</p>
      <p className="mt-2 text-[11px] leading-relaxed text-[var(--text-muted)]">
        서울특별시 금천구 벚꽃로 298 대륭포스트타워6차 313호
        <br />
        대표이사 김형준·김동재 &nbsp;|&nbsp; 사업자번호 158-86-01603
        <br />
        고객센터 070-7771-5866 &nbsp;|&nbsp; 운영시간 평일 10:00~18:00
      </p>
      <p className="mt-3 text-[11px] text-[var(--placeholder)]">
        본 메일은 발신 전용입니다.
      </p>
    </footer>
  );
}

export default function SignupApprovalMailPage() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-10">
      <div className="mx-auto w-[560px] overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--bg)] shadow-sm">
        <MailHeader />

        <main className="flex w-full flex-col items-center px-8 pb-10 pt-12 text-center">
          <p className="text-[15px] text-[var(--text-secondary)]">
            위드소프트님의
          </p>
          <h1 className="mt-2 text-[17px] font-semibold text-[var(--text-primary)]">
            <span className="text-[var(--accent)]">쇼핑몰이 개설</span>되었습니다.
          </h1>
          <p className="mt-3 text-[13px] text-[var(--text-muted)]">
            오픈 체크리스트로 쇼핑몰을 더 빠르게 시작해 보세요.
          </p>

          <div className="mt-6 rounded-md bg-[var(--accent)] px-7 py-3 text-[13px] font-semibold text-white">
            오픈 체크리스트 바로가기
          </div>

          <SignupInfoCard />

          <div
            className="mt-10 flex h-[90px] w-full items-center justify-center rounded-[12px] text-[12px]"
            style={{ border: "1px solid #E4E2D8", backgroundColor: "var(--surface-1)", color: "#888780" }}
          >
            배너
          </div>
        </main>

        <MailFooter />
      </div>
    </div>
  );
}
