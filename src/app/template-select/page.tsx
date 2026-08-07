export const metadata = {
  title: "템플릿 선택",
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
    <div className="flex h-[200px] w-[110px] flex-col gap-1.5 rounded-2xl border border-slate-300 bg-white p-2">
      <div className="h-2 w-full shrink-0 rounded-sm bg-slate-200" />
      <div
        className="h-[54px] w-full shrink-0 rounded-sm"
        style={{ backgroundColor: colors[0] }}
      />
      <div
        className="h-9 w-full shrink-0 rounded-sm"
        style={{ backgroundColor: colors[1] }}
      />
      <div
        className="h-6 w-full shrink-0 rounded-sm"
        style={{ backgroundColor: colors[2] }}
      />
      <div className="mt-auto space-y-1 pb-1">
        <div className="h-1 w-3/4 rounded-full bg-slate-200" />
        <div className="h-1 w-1/2 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default function TemplateSelectPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto grid w-fit grid-cols-4 gap-5">
        {categories.map((category) => (
          <div key={category.name} className="flex w-[110px] flex-col items-center">
            <PhoneMockup colors={category.colors} />
            <p className="mt-2 text-center text-[12px] font-medium text-slate-800">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
