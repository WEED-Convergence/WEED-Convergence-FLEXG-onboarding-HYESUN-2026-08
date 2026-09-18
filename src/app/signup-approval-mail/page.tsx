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

function FlexGLogo() {
  return (
    <svg viewBox="0 0 118 32" width="98" height="26" fill="none">
      <text
        x="0"
        y="24"
        fontFamily="Arial, sans-serif"
        fontSize="26"
        fontWeight={800}
        fontStyle="italic"
        letterSpacing="-0.5"
        fill="#141414"
      >
        FLEX
      </text>
      <g transform="translate(88 2)">
        <rect x="1.5" y="1.5" width="25" height="25" rx="6" stroke="#141414" strokeWidth="3" />
        <line x1="7" y1="11" x2="22" y2="11" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function MailHeader() {
  return (
    <div className="w-full shrink-0 border-b border-[var(--divider)] bg-white px-8 py-6">
      <FlexGLogo />
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--accent)">
      <path d="M12 2L13.8 9.2L21 11L13.8 12.8L12 20L10.2 12.8L3 11L10.2 9.2L12 2Z" />
    </svg>
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
      <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
        08507. 서울특별시 금천구 가산디지털1로 128 STXV타워 401호 (주)위드소프트
      </p>
      <p className="mt-3 text-[11px] leading-relaxed text-[var(--text-muted)]">
        대표이사 : 김형준, 김동재 &nbsp;&nbsp;고객센터 : 02-839-5060 &nbsp;&nbsp;Fax : 02-863-5864 &nbsp;&nbsp;사업자등록번호 : 158-86-01603
      </p>
      <p className="mt-3 text-[11px] leading-relaxed text-[var(--text-muted)]">
        대표메일 : weedsoft@weedsoft.co.kr &nbsp;&nbsp;개인정보관리책임자 : weedsoft@weedsoft.co.kr
      </p>
      <p className="mt-3 text-[11px] text-[var(--placeholder)]">ⓒ WEEDSOFT Corp.</p>
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

          <div className="mt-6 flex items-center gap-2">
            <div className="rounded-md bg-[var(--accent)] px-7 py-3 text-[13px] font-semibold text-white">
              오픈 체크리스트 바로가기
            </div>
            <span className="animate-bounce">
              <SparkleIcon />
            </span>
          </div>

          <SignupInfoCard />

          <div
            className="mt-10 flex h-[90px] w-full items-center justify-center rounded-[12px] text-[12px]"
            style={{ border: "1px solid #E4E2D8", backgroundColor: "var(--surface-1)", color: "#888780" }}
          >
            배너 3개
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-[var(--text-muted)]">
            본 메일은 발신 전용 메일로서 회신이 불가능합니다. 문의사항은 홈페이지 우측 하단 HELP로 문의 주세요.
          </p>
        </main>

        <MailFooter />
      </div>
    </div>
  );
}
