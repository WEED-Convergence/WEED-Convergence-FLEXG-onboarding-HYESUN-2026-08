import ChecklistPanel from "./ChecklistPanel";

export const metadata = {
  title: "오픈 체크리스트",
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5L19 19M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

export default function OpenChecklistPopupPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 딤 오버레이 + 팝업: 콘텐츠 영역에만 적용 (인덱스 메뉴 제외) */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-y-auto p-10"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <div className="relative w-[1080px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center text-[var(--text-muted)]"
          >
            <CloseIcon />
          </button>

          <div className="px-6 pb-5 pt-6">
            <h1 className="text-left text-[16px] font-semibold text-[var(--text-primary)]">
              오픈 체크리스트
            </h1>
          </div>
          <ChecklistPanel />
        </div>
      </div>
    </div>
  );
}
