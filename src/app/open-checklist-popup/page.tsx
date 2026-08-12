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
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div className="flex min-h-full items-center justify-center p-10">
        <div className="relative w-[960px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
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
