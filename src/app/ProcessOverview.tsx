"use client";

import { usePathname } from "next/navigation";
import { useSelectedChecklistItem } from "./SelectedChecklistItemContext";

type NoteListItem = { heading?: string; body: string };

type NoteParagraph = string | { title: string; body?: string; list?: NoteListItem[] };

type OverviewNote = { id: string; label?: string; desc?: NoteParagraph[]; items: string[] };

const staticOverviewNotes: Record<string, OverviewNote[]> = {
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
  "/home-with-checklist": [
    {
      id: "home-checklist-note",
      desc: [
        {
          title: "재방문 진입 위치",
          body: "오픈 체크리스트를 다시 열면, 이전에 마지막으로 보고 있던 항목이 선택된 상태로 열립니다.",
        },
        {
          title: "완료된 항목 재수정 가능 여부",
          body: "오픈 체크리스트는 입력만 가능하며 수정은 불가능합니다. 수정이 필요한 경우, 해당 메뉴에 직접 접근하여 수정·삭제합니다.",
        },
        {
          title: "진행상태 저장",
          body: "체크리스트 진행 상태는 서버에 저장됩니다. 새로고침하거나 다른 기기로 접속해도 완료 상태가 그대로 유지되어야 합니다.",
        },
        {
          title: "100% 달성 시 홈 화면 변화",
          body: "모든 카테고리가 100% 완료되어도 홈 화면에는 별도 변화가 없습니다. 체크리스트 영역은 사라지지 않고 계속 노출됩니다.",
        },
        {
          title: "노출 기간",
          body: "체크리스트는 온보딩 기간에 한정하지 않고 상시 노출됩니다.",
        },
        {
          title: "권한 범위",
          body: "15개 항목 중 \"보안 설정하기\"만 주계정 전용이며, 나머지 항목은 부계정도 조회·입력이 가능합니다.",
        },
      ],
      items: [],
    },
  ],
};

const PG_APPLICATION_NOTE: OverviewNote = {
  id: "pg-application-status",
  desc: [
    {
      title: "선행 개발 필요사항",
      list: [
        {
          body: "PG 또는 내부 시스템으로부터 PG 심사 상태값(신청접수/심사중/승인완료/반려)을 조회할 수 있는 기능이 먼저 개발되어야 합니다. PG사 API 연동을 통해 실시간으로 받아올지, 내부 신청 테이블에서 상태 컬럼을 두고 운영자가 수동으로 갱신하는 방식으로 갈지 협의가 필요합니다.",
        },
        {
          heading: "PG사 가입 시 플렉스지 고객사 식별 개선 요청",
          body: "현재는 판매자가 플렉스지 화면 내 특정 버튼을 눌러야만 PG사에서 플렉스지 고객사임을 확인할 수 있는 구조입니다. 판매자는 이미 로그인된 상태이므로, 버튼 클릭에 의존하지 않고 로그인 세션(사업자등록번호, 고객 ID 등)을 기반으로 자동 식별되도록 개선이 필요합니다. 단, PG사별로 이런 식별값 연동이 규격상 가능한지(URL 파라미터 또는 API) 먼저 확인이 필요합니다.",
        },
      ],
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
};

const BUSINESS_INFO_NOTE: OverviewNote = {
  id: "business-info-note",
  desc: ["회원가입 당시 입력한 정보가 디폴트로 입력되어 있습니다."],
  items: [],
};

const CHECKLIST_PLACEHOLDER_NOTE: OverviewNote = {
  id: "checklist-item-placeholder",
  desc: ["정책 준비중입니다."],
  items: [],
};

// PG 신청하기(id: 1), 사업자 정보 등록(id: 5)만 화면설명이 작성되어 있고, 나머지 항목은 플레이스홀더로 대체.
const PG_APPLICATION_ITEM_ID = 1;
const BUSINESS_INFO_ITEM_ID = 5;

export default function ProcessOverview() {
  const pathname = usePathname();
  const { selectedChecklistItemId } = useSelectedChecklistItem();

  const checklistPopupNote =
    selectedChecklistItemId === PG_APPLICATION_ITEM_ID
      ? PG_APPLICATION_NOTE
      : selectedChecklistItemId === BUSINESS_INFO_ITEM_ID
        ? BUSINESS_INFO_NOTE
        : CHECKLIST_PLACEHOLDER_NOTE;

  const notes: OverviewNote[] | undefined =
    pathname === "/open-checklist-popup" ? [checklistPopupNote] : staticOverviewNotes[pathname];

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
                    const list = typeof paragraph === "string" ? null : paragraph.list;
                    return (
                      <div
                        key={title ?? body ?? idx}
                        className={`py-2 text-[11px] leading-relaxed text-[var(--text-primary)] ${
                          idx > 0 ? "border-t border-dashed border-[var(--accent)]/30" : ""
                        }`}
                      >
                        {list ? (
                          <>
                            {title ? <p className="font-bold">{title}</p> : null}
                            <ol className={title ? "mt-1 space-y-1.5" : "space-y-1.5"}>
                              {list.map((entry, i) => (
                                <li key={entry.heading ?? entry.body}>
                                  <span className="font-semibold">{i + 1}. </span>
                                  {entry.heading ? (
                                    <span className="font-semibold">{entry.heading}: </span>
                                  ) : null}
                                  {entry.body}
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : (
                          <p>
                            {title ? <span className="font-bold">{title}: </span> : null}
                            {body}
                          </p>
                        )}
                      </div>
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
