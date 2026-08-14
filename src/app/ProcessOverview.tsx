"use client";

import { usePathname } from "next/navigation";

const overviewNotes: Record<string, { label: string; items: string[] }[]> = {
  "/signup-complete": [
    {
      label: "영업팀 의견 추가",
      items: [
        "1-1. 라이브 기능 전용 템플릿",
        "1-2. 주문서 전용 템플릿",
        "1-3. 출산 / 유아동 전용 템플릿",
        "1-4. 건기식 / 다이어트 전용 템플릿",
      ],
    },
  ],
};

export default function ProcessOverview() {
  const pathname = usePathname();
  const notes = overviewNotes[pathname];

  return (
    <div>
      <p className="text-[12px] font-semibold text-[var(--text-muted)]">프로세스 개요</p>
      {notes ? (
        <div className="mt-2 space-y-3">
          {notes.map((note) => (
            <div
              key={note.label}
              className="rounded-md border border-dashed border-[var(--accent)]/40 bg-[var(--accent-soft-bg)] px-3 py-2.5"
            >
              <p className="text-[11px] font-semibold text-[var(--accent-text)]">{note.label}</p>
              <ul className="mt-1 space-y-0.5">
                {note.items.map((item) => (
                  <li key={item} className="text-[11px] text-[var(--accent-text)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
