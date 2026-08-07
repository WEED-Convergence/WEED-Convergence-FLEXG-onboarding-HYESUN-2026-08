export const metadata = {
  title: "템플릿 미리보기",
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
];

function PhoneMockup({
  colors,
  overlay,
}: {
  colors: [string, string, string];
  overlay?: boolean;
}) {
  return (
    <div className="flex h-[280px] w-[154px] flex-col gap-2 rounded-2xl border border-slate-300 bg-white p-3">
      <div className="h-[11px] w-full shrink-0 rounded-sm bg-slate-200" />
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
            <span className="rounded-full border border-white px-3 py-1 text-[10px] font-medium text-white">
              미리보기
            </span>
            <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-medium text-white">
              적용
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-auto space-y-1.5 pb-1">
        <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
        <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function GNB() {
  const navLinks = ["서비스", "요금", "고객사례", "고객지원", "제휴·제안"];
  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#1A1A1A] px-10">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[11px] font-bold text-slate-900">
          F
        </span>
        <span className="text-[18px] font-extrabold tracking-tight text-white">
          FLEX-G
        </span>
      </div>
      <nav className="flex items-center gap-8 text-[14px] font-medium text-slate-300">
        {navLinks.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-[14px] font-medium text-slate-300">로그인</span>
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
          <p className="text-[16px] font-extrabold text-white">FLEX-G</p>
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

function CloseIcon() {
  return (
    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center text-slate-400">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5L19 19M19 5L5 19" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ShopIcon({ type }: { type: "menu" | "bag" }) {
  const common = {
    fill: "none",
    stroke: "#4B5563",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "menu") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
        <path d="M4 6H20M4 12H20M4 18H20" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
      <path d="M6 8H18L17 21H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8" />
    </svg>
  );
}

const productTiles = ["#F6D9DE", "#F3C6C0", "#F8E0D8", "#F0B8B0", "#F5D6CE", "#EFC9D2"];

function ShopGNB() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
      <ShopIcon type="menu" />
      <span className="text-[13px] font-bold tracking-[0.2em] text-slate-900">MUSE</span>
      <ShopIcon type="bag" />
    </div>
  );
}

function FashionSitePreview() {
  return (
    <div className="mx-auto h-full w-[320px] overflow-y-auto rounded-lg border border-slate-300 bg-white">
      <ShopGNB />

      <div
        className="flex h-[130px] items-center justify-center"
        style={{ backgroundColor: "#EDE0E5" }}
      >
        <span className="text-[11px] tracking-[0.15em] text-[#8B3A5C]">
          2026 F/W COLLECTION
        </span>
      </div>

      <div className="flex items-center gap-4 border-b border-slate-200 px-4 py-2.5 text-[11px]">
        <span className="font-bold text-slate-900">전체</span>
        <span className="text-slate-400">아우터</span>
        <span className="text-slate-400">상의</span>
        <span className="text-slate-400">바지</span>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        {productTiles.map((color, i) => (
          <div key={`${color}-${i}`} className="flex flex-col gap-1.5">
            <div
              className="aspect-square w-full rounded-md"
              style={{ backgroundColor: color }}
            />
            <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
            <div className="h-1.5 w-2/5 rounded-full bg-[#C24B3D]" />
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-[#F7F5F3] px-4 py-6 text-slate-500">
        <div className="flex flex-col items-start gap-4">
          <nav className="flex flex-wrap gap-3 text-[10px]">
            <span>고객센터</span>
            <span>이용안내</span>
            <span>이용약관</span>
            <span>개인정보처리방침</span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full border border-slate-300" />
            <span className="h-6 w-6 rounded-full border border-slate-300" />
          </div>
        </div>
        <p className="mt-5 text-[10px] leading-relaxed text-slate-400">
          MUSE STUDIO &nbsp;|&nbsp; 대표 홍길동 &nbsp;|&nbsp; 사업자등록번호 000-00-00000
          <br />
          고객센터 1544-0000 (평일 10:00~17:00)
        </p>
        <p className="mt-4 text-[10px] text-slate-400">ⓒ MUSE. All rights reserved.</p>
      </div>
    </div>
  );
}

export default function TemplatePreviewPage() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200">
      <GNB />

      <div className="relative w-full bg-white">
        <main className="w-full bg-white">
          <section className="flex flex-col items-center px-10 pt-16 text-center">
            <p className="text-[18px] text-slate-500">환영합니다.</p>
            <h1 className="mt-2 text-[24px] font-bold text-slate-900">
              <span className="text-red-600">플렉스지 회원가입이 완료</span>되었습니다.
            </h1>
            <p className="mt-3 text-[14px] text-slate-400">
              이제 쇼핑몰 디자인을 선택해주세요.
            </p>
          </section>

          <section className="mx-auto mt-12 grid w-fit grid-cols-3 gap-5 px-10 pb-16">
            {categories.map((category) => (
              <div key={category.name} className="flex w-[154px] flex-col items-center">
                <PhoneMockup colors={category.colors} overlay={category.overlay} />
                <p className="mt-2 text-center text-[16px] font-bold text-slate-800">
                  {category.name}
                </p>
              </div>
            ))}
          </section>
        </main>

        {/* 딤 오버레이 + 팝업: 콘텐츠 영역에만 적용 (GNB/푸터 제외) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="relative flex h-4/5 w-4/5 flex-col items-center rounded-2xl bg-white p-5">
            <CloseIcon />

            <p className="text-[14px] font-medium text-slate-700">패션 템플릿 미리보기</p>

            <div className="w-full flex-1 overflow-hidden py-4">
              <FashionSitePreview />
            </div>

            <div className="flex w-full max-w-[320px] gap-3">
              <span className="flex-1 rounded-lg border border-slate-300 py-2.5 text-center text-[13px] font-medium text-slate-700">
                닫기
              </span>
              <span className="flex-1 rounded-lg bg-[#D8342A] py-2.5 text-center text-[13px] font-medium text-white">
                이 템플릿 적용
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
