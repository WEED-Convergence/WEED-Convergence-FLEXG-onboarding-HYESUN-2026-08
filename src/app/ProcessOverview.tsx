"use client";

import { usePathname } from "next/navigation";

type NoteParagraph = string | { title: string; body: string };

const overviewNotes: Record<
  string,
  { id: string; label?: string; desc?: NoteParagraph[]; items: string[] }[]
> = {
  "/signup-complete": [
    {
      id: "signup-complete-templates",
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
      id: "pg-application-status",
      desc: [
        {
          title: "선행 개발 필요사항",
          body: "PG 또는 내부 시스템으로부터 PG 심사 상태값(신청접수/심사중/승인완료/반려)을 조회할 수 있는 기능이 먼저 개발되어야 합니다. PG사 API 연동을 통해 실시간으로 받아올지, 내부 신청 테이블에서 상태 컬럼을 두고 운영자가 수동으로 갱신하는 방식으로 갈지 협의가 필요합니다.",
        },
        {
          title: "완료 조건",
          body: "상태값이 \"신청접수\" 이상인 경우, 체크리스트 항목을 완료 처리합니다. 판매자의 \"신청하기\" 버튼 클릭 자체는 완료의 조건이 아니며 실제 상태값 확인을 거쳐야 합니다.",
        },
        {
          title: "상태 표시",
          body: "체크리스트 항목 옆 배지와 상세화면 타이틀 영역에 조회된 상태값(신청접수/심사중/승인완료/반려)을 상태명과 함께 숫자 배지로 노출합니다. 상태값이 확인되지 않은 경우(선행 기능 미개발 또는 조회 실패 시) \"확인중\"으로 표시하고 추정값을 임의로 보여주지 않습니다.",
        },
        {
          title: "범례",
          body: "1=미신청 · 2=신청접수 · 3=심사중 · 4=승인완료 · 5=반려",
        },
      ],
      items: [],
    },
  ],
};

export default function ProcessOverview() {
  const pathname = usePathname();
  const notes = overviewNotes[pathname];

  return (
    <div>
      <p className="text-[15px] font-semibold text-[var(--text-primary)]">화면설명</p>
      {notes ? (
        <div className="mt-2 space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-md border border-dashed border-[var(--accent)]/40 bg-[var(--accent-soft-bg)] px-3 py-2.5"
            >
              {note.label ? (
                <p className="text-[11px] font-semibold text-[var(--text-primary)]">{note.label}</p>
              ) : null}
              {note.desc ? (
                <div className={note.label ? "mt-1.5" : undefined}>
                  {note.desc.map((paragraph, idx) => {
                    const title = typeof paragraph === "string" ? null : paragraph.title;
                    const body = typeof paragraph === "string" ? paragraph : paragraph.body;
                    return (
                      <p
                        key={title ?? body}
                        className={`py-2 text-[11px] leading-relaxed text-[var(--text-primary)] ${
                          idx > 0 ? "border-t border-dashed border-[var(--accent)]/30" : ""
                        }`}
                      >
                        {title ? <span className="font-bold">{title}: </span> : null}
                        {body}
                      </p>
                    );
                  })}
                </div>
              ) : null}
              {note.items.length > 0 ? (
                <ul className="mt-1 space-y-0.5">
                  {note.items.map((item) => (
                    <li key={item} className="text-[11px] text-[var(--text-primary)]">
                      · {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
