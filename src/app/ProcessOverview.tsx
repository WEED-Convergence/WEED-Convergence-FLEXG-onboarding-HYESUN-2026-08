"use client";

import { usePathname } from "next/navigation";

const overviewNotes: Record<string, { label: string; desc?: string; items: string[] }[]> = {
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
  "/open-checklist-popup": [
    {
      label: "영업팀 의견",
      desc: "SEO 설정하기 단계에서 아래 항목을 필수 설정사항으로 안내",
      items: ["메타태그 설정", "오픈그래프 설정"],
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
              {note.desc ? (
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--accent-text)]">{note.desc}</p>
              ) : null}
              <ul className="mt-1 space-y-0.5">
                {note.items.map((item) => (
                  <li key={item} className="text-[11px] text-[var(--accent-text)]">
                    · {item}
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
