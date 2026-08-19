export const metadata = {
  title: "회원가입 완료 + 템플릿 선택",
};

interface Category {
  name: string;
  colors: [string, string, string];
  overlay?: boolean;
}

const categories: Category[] = [
  { name: "농수산·축산/식품", colors: ["#DCEFDF", "#C3E6CB", "#EAF7EC"] },
  { name: "인플루언서/셀럽샵", colors: ["#FCE4EC", "#F8D7E3", "#FDEFF3"] },
  { name: "패션", colors: ["#EDE7F6", "#DCD0F0", "#F3EEFB"], overlay: true },
  { name: "뷰티", colors: ["#FDE2E4", "#FAD2DA", "#FEF0F1"] },
  { name: "가구/인테리어", colors: ["#F0E6D8", "#E4D4BE", "#F7F0E6"] },
  { name: "디지털/가전", colors: ["#DCEEFB", "#C6E2F5", "#EAF5FC"] },
  { name: "생활/스포츠", colors: ["#FFF3CD", "#FCE8B4", "#FFF8E1"] },
  { name: "라이브커머스", colors: ["#FDE4D6", "#FAD0B8", "#FEF1E9"] },
  { name: "출산/유아동", colors: ["#DFF3F1", "#C2E8E3", "#EEF9F7"] },
  { name: "건강기능식품/다이어트", colors: ["#EAF2D7", "#D7E8B0", "#F3F8E8"] },
];

function PhoneMockup({
  colors,
  overlay,
}: {
  colors: [string, string, string];
  overlay?: boolean;
}) {
  return (
    <div className="flex h-[280px] w-[154px] flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3">
      <div className="h-[11px] w-full shrink-0 rounded-sm bg-[var(--divider)]" />
      <div className="relative flex shrink-0 flex-col gap-2">
        <div
          className="h-[76px] w-full shrink-0 rounded-sm"
          style={{ backgroundColor: colors[0] }}
        />
        <div
          className="h-[50px] w-full shrink-0 rounded-sm"
          style={{ backgroundColor: colors[1] }}
        />
        <div
          className="h-[34px] w-full shrink-0 rounded-sm"
          style={{ backgroundColor: colors[2] }}
        />
        {overlay ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-sm bg-black/55">
            <span className="rounded-full border border-white px-3 py-1 text-[11px] font-medium text-white">
              미리보기
            </span>
            <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-medium text-white">
              적용
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-auto space-y-1.5 pb-1">
        <div className="h-1.5 w-3/4 rounded-full bg-[var(--divider)]" />
        <div className="h-1.5 w-1/2 rounded-full bg-[var(--divider)]" />
      </div>
    </div>
  );
}

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

export default function SignupCompletePage() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border)]">
      <GNB />

      <main className="w-full bg-[var(--bg)]">
        <section className="flex flex-col items-center px-10 pt-16 text-center">
          <p className="text-[16px] text-[var(--text-secondary)]">환영합니다.</p>
          <h1 className="mt-2 text-[16px] font-semibold text-[var(--text-primary)]">
            <span className="text-[var(--accent)]">플렉스지 회원가입이 완료</span>되었습니다.
          </h1>
          <p className="mt-3 text-[13px] text-[var(--text-muted)]">
            이제 쇼핑몰 디자인을 선택해주세요.
          </p>
        </section>

        <section className="mx-auto mt-12 grid w-fit grid-cols-3 gap-5 px-10 pb-16">
          {categories.map((category) => (
            <div key={category.name} className="flex w-[154px] flex-col items-center">
              <PhoneMockup colors={category.colors} overlay={category.overlay} />
              <p className="mt-2 text-center text-[16px] font-semibold text-[var(--text-primary)]">
                {category.name}
              </p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
