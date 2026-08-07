export const metadata = {
  title: "상품 구성 선택",
};

interface Category {
  name: string;
  colors: [string, string, string];
}

const categories: Category[] = [
  { name: "농수산·축산/식품", colors: ["#DCEFDF", "#C3E6CB", "#EAF7EC"] },
  { name: "인플루언서/셀럽샵", colors: ["#FCE4EC", "#F8D7E3", "#FDEFF3"] },
  { name: "패션", colors: ["#EDE7F6", "#DCD0F0", "#F3EEFB"] },
  { name: "뷰티", colors: ["#FDE2E4", "#FAD2DA", "#FEF0F1"] },
  { name: "가구/인테리어", colors: ["#F0E6D8", "#E4D4BE", "#F7F0E6"] },
  { name: "디지털/가전", colors: ["#DCEEFB", "#C6E2F5", "#EAF5FC"] },
  { name: "생활/스포츠", colors: ["#FFF3CD", "#FCE8B4", "#FFF8E1"] },
];

function PhoneMockup({ colors }: { colors: [string, string, string] }) {
  return (
    <div className="flex h-[280px] w-[154px] flex-col gap-2 rounded-2xl border border-slate-300 bg-white p-3">
      <div className="h-[11px] w-full shrink-0 rounded-sm bg-slate-200" />
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
      <div className="mt-auto space-y-1.5 pb-1">
        <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
        <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default function ProductSelectionPage() {
  return (
    <div className="relative">
      {/* 배경: 템플릿 선택 화면 */}
      <div className="mx-auto grid w-fit grid-cols-3 gap-5">
        {categories.map((category) => (
          <div key={category.name} className="flex w-[154px] flex-col items-center">
            <PhoneMockup colors={category.colors} />
            <p className="mt-2 text-center text-[16px] font-bold text-slate-800">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* 딤 오버레이 + 레이어 팝업 (가운데 콘텐츠 영역 안에서만 적용) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45">
        <div className="relative w-[320px] rounded-2xl bg-[var(--surface-2)] px-6 pb-6 pt-7 shadow-lg">
          <button
            aria-hidden
            className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center text-[var(--text-secondary)]"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <p className="text-center text-[16px] font-medium text-[var(--text-primary)]">
            판매하실 상품이 있으신가요?
          </p>
          <p className="mt-2 text-center text-[13px] text-[var(--text-secondary)]">
            PG 심사에는 상품 3개 이상이 필요해요.
          </p>

          <div className="mt-6 flex flex-col gap-[10px]">
            <button className="w-full rounded-lg border border-[var(--border)] py-2.5 text-center text-[14px] font-medium text-[var(--text-primary)]">
              직접 등록할게요
            </button>
            <button className="w-full rounded-lg border border-[var(--border)] py-2.5 text-center text-[14px] font-medium text-[var(--text-primary)]">
              추천 상품으로 채워주세요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
