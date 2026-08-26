"use client";

import { usePathname } from "next/navigation";
import { useSelectedChecklistItem } from "./SelectedChecklistItemContext";

type NoteListItem = { heading?: string; body: string };

type NoteParagraph = string | { title: string; body?: string; list?: NoteListItem[] };

type OverviewNote = { id: string; label?: string; desc?: NoteParagraph[]; items: string[] };

const staticOverviewNotes: Record<string, OverviewNote[]> = {
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
          body: "\"보안 설정하기\"만 주계정 전용이며, 나머지 항목은 부계정도 조회·입력이 가능합니다.",
        },
      ],
      items: [],
    },
  ],
  "/sa": [
    {
      id: "sa-note",
      desc: [
        {
          title: "승인 완료 시 단계 전환",
          body: "승인 대기 상태에서 플렉스지 운영자가 승인 처리를 완료하면, 승인 상태값을 확인하여 해당 업체의 현재 단계를 자동으로 \"결제 준비\"로 변경합니다.",
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
          body: "PG 또는 내부 시스템으로부터 PG 심사 상태값을 조회할 수 있는 기능이 먼저 개발되어야 합니다. PG사 API 연동을 통해 실시간으로 받아올지, 내부 신청 테이블에서 상태 컬럼을 두고 운영자가 수동으로 갱신하는 방식으로 갈지 협의가 필요합니다.",
        },
        {
          heading: "PG사 가입 시 플렉스지 고객사 식별 개선 요청",
          body: "현재는 판매자가 플렉스지 화면 내 특정 버튼을 눌러야만 PG사에서 플렉스지 고객사임을 확인할 수 있는 구조입니다. 판매자는 이미 로그인된 상태이므로, 버튼 클릭에 의존하지 않고 로그인 세션을 기반으로 자동 식별되도록 개선이 필요합니다. 단, PG사별로 이런 식별값 연동이 규격상 가능한지(URL 파라미터 또는 API) 먼저 확인이 필요합니다.",
        },
      ],
    },
    {
      title: "완료 조건",
      body: "상태값이 \"신청접수\" 이상인 경우, 체크리스트 항목을 완료 처리합니다. 판매자의 \"신청하기\" 버튼 클릭 자체는 완료의 조건이 아니며 실제 상태값 확인을 거쳐야 합니다.",
    },
    {
      title: "상태 표시",
      body: "체크리스트 항목 옆 배지와 상세화면 타이틀 영역에 조회된 상태값을 상태명 배지로 노출합니다. 상태값이 확인되지 않은 경우(선행 기능 미개발 또는 조회 실패 시) \"확인중\"으로 표시하고 추정값을 임의로 보여주지 않습니다.",
    },
    {
      title: "자세히 보기",
      list: [
        { body: "/Setting/pg_nicePay 새창열림" },
        { body: "/Setting/pg_kcpPay 새창열림" },
        { body: "/Setting/pg_kicc 새창열림" },
      ],
    },
    {
      title: "신청 가이드",
      body: "data/commonimg/nicepay_Guide.pdf",
    },
  ],
  items: [],
};

const BUSINESS_INFO_NOTE: OverviewNote = {
  id: "business-info-note",
  desc: ["회원가입 당시 입력한 정보가 디폴트로 입력되어 있습니다."],
  items: [],
};

const SUPPLIER_REGISTRATION_NOTE: OverviewNote = {
  id: "supplier-registration-note",
  desc: [
    {
      title: "완료 조건",
      body: "공급사 등록·상품 등록처럼 리스트형 데이터인 항목은, 샘플로 자동 생성된 데이터를 제외하고 사용자가 직접 등록한 레코드가 1건 이상 존재하는지를 완료 기준으로 삼습니다. 이를 위해 샘플 데이터에는 \"샘플 여부\" 플래그가 필요합니다. 샘플 데이터라도 판매자가 필드 값을 1개 이상 수정하면, 해당 레코드의 \"샘플 여부\" 플래그를 즉시 해제하고 완료 판정 대상에 포함시킵니다.",
    },
    {
      title: "상세 정보 입력",
      body: "/Good/center 새창열림",
    },
  ],
  items: [],
};

const PRODUCT_REGISTRATION_NOTE: OverviewNote = {
  id: "product-registration-note",
  desc: [
    {
      title: "완료 조건",
      body: "공급사 등록·상품 등록처럼 리스트형 데이터인 항목은, 샘플로 자동 생성된 데이터를 제외하고 사용자가 직접 등록한 레코드가 1건 이상 존재하는지를 완료 기준으로 삼습니다. 이를 위해 샘플 데이터에는 \"샘플 여부\" 플래그가 필요합니다. 샘플 데이터라도 판매자가 필드 값을 1개 이상 수정하면, 해당 레코드의 \"샘플 여부\" 플래그를 즉시 해제하고 완료 판정 대상에 포함시킵니다.",
    },
    "가이드 버튼: https://guide.flexgate.co.kr/27092892ccf68026b3e9d2e303b3a630",
  ],
  items: [],
};

const SENDER_NUMBER_NOTE: OverviewNote = {
  id: "sender-number-note",
  desc: [
    {
      title: "선행 개발 필요사항",
      body: "발신번호 신청 상태값(접수/심사중/승인완료/반려 등)을 조회할 수 있는 기능이 먼저 개발되어 있어야 합니다.",
    },
    {
      title: "완료 조건",
      body: "발신번호 신청 데이터가 실제로 접수된 것이 확인되는 시점에 완료 처리합니다. \"신청 요청\" 버튼 클릭만으로는 완료 처리하지 않으며, 실제 접수 여부를 데이터로 확인합니다.",
    },
    {
      title: "가이드",
      body: "https://guide.flexgate.co.kr/22592892ccf680e79a2edf72fbe01d6c 새창열림",
    },
  ],
  items: [],
};

const ALIMTALK_REGISTRATION_NOTE: OverviewNote = {
  id: "alimtalk-registration-note",
  desc: [
    {
      title: "가이드",
      body: "https://guide.flexgate.co.kr/22592892ccf6800ba79ddf544091b83c 새창열림",
    },
  ],
  items: [],
};

const SNS_LOGIN_NOTE: OverviewNote = {
  id: "sns-login-note",
  desc: [
    {
      title: "선행 개발 필요사항",
      list: [
        {
          body: "네이버 로그인 플러스 연동 완료 여부(Client ID/Secret 등록 상태)를 조회할 수 있는 기능이 먼저 개발되어야 합니다.",
        },
        {
          body: "카카오 4개 키값 저장 시, 값이 실제로 유효한지(형식 검증 등)까지는 필요 없으며, 4개 필드가 모두 비어있지 않은지만 확인하면 됩니다.",
        },
      ],
    },
    {
      title: "완료 조건",
      body: "네이버와 카카오 두 경로가 모두 충족되어야 이 항목을 완료 처리합니다. 각 경로별로 키값이 조회되면 완료 처리되는 것으로 간주합니다.",
      list: [
        {
          heading: "네이버 경로",
          body: "네이버 Client ID/Secret 키값이 조회되면(발급 및 등록 완료) 완료 처리되는 것으로 간주합니다.",
        },
        {
          heading: "카카오 경로",
          body: "카카오 4개 키값(네이티브 앱 키, REST API 키, JavaScript 키, Client Secret 코드)이 모두 조회되면 완료 처리되는 것으로 간주합니다.",
        },
      ],
    },
    {
      title: "비고",
      body: "고객이 SNS로 로그인할 수 있으려면 네이버와 카카오 두 서비스 모두 연동이 필요합니다.",
    },
    {
      title: "가이드",
      list: [
        { body: "https://guide.flexgate.co.kr/22592892ccf6803dbec8e7bae476e6d7 새창열림" },
        { body: "https://guide.flexgate.co.kr/26392892ccf680e8b975c221da2f6481 새창열림" },
      ],
    },
  ],
  items: [],
};

const SEO_SETTINGS_NOTE: OverviewNote = {
  id: "seo-settings-note",
  desc: [
    {
      title: "완료 조건",
      body: "메타태그 제목·설명·키워드, 오픈그래프 제목·설명·이미지 6개 항목이 모두 입력·저장되어야 완료 처리합니다. 하나라도 비어있으면 미완료로 유지합니다.",
    },
  ],
  items: [],
};

const TERMS_CHECK_NOTE: OverviewNote = {
  id: "terms-check-note",
  desc: [
    {
      title: "완료 조건",
      body: "판매자가 \"약관 보기\" 버튼을 1회 이상 클릭하면 즉시 완료 처리합니다.",
    },
    {
      title: "비고",
      body: "실제 약관 열람 여부, 열람 시간, 문서 수정 여부는 완료 조건에 포함하지 않습니다.",
    },
    {
      title: "약관보기",
      body: "/Setting/operation 새창열림",
    },
  ],
  items: [],
};

const CRM_SETTINGS_NOTE: OverviewNote = {
  id: "crm-settings-note",
  desc: [
    {
      title: "완료 조건",
      body: "\"무료 수신거부번호\" 신청과 \"카카오톡 채널\" 등록, 두 가지가 모두 완료되어야 항목이 완료 처리됩니다. 하나만 진행된 상태는 미완료로 유지합니다.",
    },
    {
      title: "지금 시작하기",
      body: "/CRM/CampaignList 새창열림",
    },
    {
      title: "상담 신청",
      body: "/CRM/CRMConsultPopup",
    },
  ],
  items: [],
};

const SECURITY_SETTINGS_NOTE: OverviewNote = {
  id: "security-settings-note",
  desc: [
    {
      title: "완료 조건",
      body: "4개 설정 항목(2단계 인증, 중복 로그인 제한, 로그인 실패 횟수 제한, 세션 만료 시간)은 기본값이 이미 선택되어 있는 상태이며, 판매자가 \"저장\" 버튼을 클릭하는 시점에 완료 처리합니다.",
    },
    {
      title: "비고",
      body: "값을 실제로 변경했는지 여부와 무관하게, 기본값 그대로 저장해도 완료로 인정합니다.",
    },
  ],
  items: [],
};

const CASH_RECEIPT_NOTE: OverviewNote = {
  id: "cash-receipt-note",
  desc: [
    {
      title: "선행 개발 필요사항",
      body: "팝빌 가입 여부를 조회할 수 있는 기능(팝빌 API 연동 또는 내부 상태값)이 먼저 개발되어 있어야 합니다.",
    },
    {
      title: "완료 조건",
      body: "팝빌 가입정보가 실제로 존재하는 것이 데이터로 확인되는 시점에 완료 처리합니다. \"팝빌가입하기\" 버튼 클릭만으로는 완료 처리하지 않으며, 실제 가입 완료 여부를 데이터로 확인합니다.",
    },
    {
      title: "가이드",
      body: "https://guide.flexgate.co.kr/23392892ccf68037a0fac3f6340de669 새창열림",
    },
  ],
  items: [],
};

const LIVE_COMMERCE_NOTE: OverviewNote = {
  id: "live-commerce-note",
  desc: [
    {
      title: "완료 조건",
      body: "판매자가 화면 내 \"지금 시작하기\" 버튼을 1회 이상 클릭하면 즉시 완료 처리합니다.",
    },
    {
      title: "비고",
      body: "실제로 라이브 방송을 개설했는지, 라이브커머스 기능을 실제 사용 중인지는 완료 조건에 포함하지 않습니다.",
    },
    {
      title: "전체 가이드 보기",
      body: "https://guide.flexgate.co.kr/live 새창열림",
    },
    {
      title: "지금 시작하기",
      body: "/Live/LiveSetting 새창열림",
    },
  ],
  items: [],
};

const CHECKLIST_PLACEHOLDER_NOTE: OverviewNote = {
  id: "checklist-item-placeholder",
  desc: ["정책 준비중입니다."],
  items: [],
};

// 화면설명이 작성된 체크리스트 항목만 여기 등록하고, 나머지는 플레이스홀더로 대체.
const CHECKLIST_ITEM_NOTES: Record<number, OverviewNote> = {
  1: PG_APPLICATION_NOTE, // PG 신청하기
  2: SUPPLIER_REGISTRATION_NOTE, // 공급사 등록하기
  3: PRODUCT_REGISTRATION_NOTE, // 상품 등록하기
  5: BUSINESS_INFO_NOTE, // 사업자 정보 등록
  6: SENDER_NUMBER_NOTE, // 발신번호 신청하기
  7: SNS_LOGIN_NOTE, // SNS 간편 로그인 등록하기
  8: ALIMTALK_REGISTRATION_NOTE, // 알림톡 등록하기
  9: SEO_SETTINGS_NOTE, // SEO 설정하기
  11: CRM_SETTINGS_NOTE, // CRM 설정하기
  12: LIVE_COMMERCE_NOTE, // 라이브커머스 설정하기
  16: SECURITY_SETTINGS_NOTE, // 보안 설정하기
  17: CASH_RECEIPT_NOTE, // 현금영수증 설정하기
  15: TERMS_CHECK_NOTE, // 약관 확인하기
};

export default function ProcessOverview() {
  const pathname = usePathname();
  const { selectedChecklistItemId } = useSelectedChecklistItem();

  const checklistPopupNote =
    CHECKLIST_ITEM_NOTES[selectedChecklistItemId] ?? CHECKLIST_PLACEHOLDER_NOTE;

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
                    const titleColor = title === "선행 개발 필요사항" ? "#D8342A" : undefined;
                    return (
                      <div
                        key={title ?? body ?? idx}
                        className={`py-2 text-[11px] leading-relaxed text-[var(--text-primary)] ${
                          idx > 0 ? "border-t border-dashed border-[var(--accent)]/30" : ""
                        }`}
                      >
                        {list ? (
                          <>
                            {title ? (
                              <p className="font-bold" style={{ color: titleColor }}>
                                {title}
                              </p>
                            ) : null}
                            {body ? <p className="mt-1">{body}</p> : null}
                            <ol className={title || body ? "mt-1 space-y-1.5" : "space-y-1.5"}>
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
                            {title ? (
                              <span className="font-bold" style={{ color: titleColor }}>
                                {title}:{" "}
                              </span>
                            ) : null}
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
