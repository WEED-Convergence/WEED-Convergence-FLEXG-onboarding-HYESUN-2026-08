// SA(판매자 온보딩 관리) 화면 전용 더미 데이터.
// 다른 화면(오픈 체크리스트, 메시지 모음 등)의 실제 파일은 참조하지 않고,
// 이 화면 안에서만 쓰는 정적 데이터로 별도 관리합니다.

export type PeriodKey = "today" | "week" | "month" | "custom";

export const PERIOD_OPTIONS: { key: PeriodKey; label: string }[] = [
  { key: "today", label: "오늘" },
  { key: "week", label: "이번주" },
  { key: "month", label: "이번달" },
  { key: "custom", label: "기간 설정" },
];

export const STATS_BY_PERIOD: Record<PeriodKey, { newSignups: number; onboardingCompleted: number }> = {
  today: { newSignups: 2, onboardingCompleted: 0 },
  week: { newSignups: 9, onboardingCompleted: 3 },
  month: { newSignups: 27, onboardingCompleted: 11 },
  custom: { newSignups: 41, onboardingCompleted: 15 },
};

export type StageKey = "template-pending" | "approval-pending" | "payment-prep" | "open-ready" | "all-done";

export const STAGE_CONFIG: Record<StageKey, { label: string; bg: string; color: string }> = {
  "template-pending": { label: "템플릿 선택 대기", bg: "#F1EFE8", color: "#5F5E5A" },
  "approval-pending": { label: "승인 대기", bg: "#E6F1FB", color: "#0C447C" },
  "payment-prep": { label: "결제 준비 진행중", bg: "#FAEEDA", color: "#633806" },
  "open-ready": { label: "오픈 가능", bg: "#EAF3E0", color: "#3B6D11" },
  "all-done": { label: "전체 완료", bg: "#EAF3E0", color: "#0F6E56" },
};

// 결제 준비 → 운영 필수 → 권장 설정 → 매출 확장, 13개 항목.
export type ChecklistItemId = 1 | 2 | 3 | 5 | 6 | 8 | 17 | 7 | 9 | 15 | 16 | 11 | 12;

export interface ChecklistItemDef {
  id: ChecklistItemId;
  title: string;
}

export interface ChecklistCategoryDef {
  name: string;
  items: ChecklistItemDef[];
}

export const CHECKLIST_CATEGORIES: ChecklistCategoryDef[] = [
  {
    name: "결제 준비",
    items: [
      { id: 1, title: "PG 신청하기" },
      { id: 2, title: "공급사 등록하기" },
      { id: 3, title: "상품 등록하기" },
      { id: 5, title: "사업자 정보 등록하기" },
    ],
  },
  {
    name: "운영 필수",
    items: [
      { id: 6, title: "발신번호 신청하기" },
      { id: 8, title: "알림톡 등록하기" },
      { id: 17, title: "현금영수증 설정하기" },
      { id: 7, title: "SNS 간편 로그인 설정하기" },
    ],
  },
  {
    name: "권장 설정",
    items: [
      { id: 9, title: "검색 노출 및 공유 정보 입력하기" },
      { id: 15, title: "약관 확인하기" },
      { id: 16, title: "보안 설정하기" },
    ],
  },
  {
    name: "매출 확장",
    items: [
      { id: 11, title: "CRM 설정하기" },
      { id: 12, title: "라이브커머스 설정하기" },
    ],
  },
];

export const TOTAL_CHECKLIST_ITEMS = CHECKLIST_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

export interface MessageTemplate {
  id: number;
  title: string;
  body: string;
  button: string;
  category: "정보성" | "마케팅성";
}

// 메시지 모음 화면의 7개 알림톡 템플릿과 동일한 내용(제목/본문/버튼/유형)입니다.
export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 1,
    title: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.",
    body: "지금 바로 쇼핑몰 셋팅을 시작하세요.",
    button: "오픈 체크리스트",
    category: "정보성",
  },
  {
    id: 2,
    title: "#{판매자명}님, 이제 템플릿만 선택하면 돼요",
    body: "템플릿 선택만 완료하면 승인 심사가 바로 시작돼요.",
    button: "템플릿 선택하기",
    category: "마케팅성",
  },
  {
    id: 3,
    title: "아직 PG 신청을 완료하지 않으셨어요",
    body: "PG 신청이 완료되어야 쇼핑몰을 정상적으로 오픈하실 수 있어요. 아래 버튼을 눌러 바로 신청하실 수 있어요.",
    button: "PG 신청하러 가기",
    category: "마케팅성",
  },
  {
    id: 4,
    title: "PG 신청이 완료되었어요!",
    body: "쇼핑몰 오픈까지 아직 몇 가지 단계가 남아있어요. 오픈 체크리스트에서 이어서 진행해 보세요.",
    button: "오픈 체크리스트로 이동",
    category: "정보성",
  },
  {
    id: 5,
    title: "PG 신청이 반려되었어요",
    body: "사유를 확인하신 후 다시 신청해 주세요.",
    button: "다시 신청하기",
    category: "정보성",
  },
  {
    id: 6,
    title: "쇼핑몰 오픈까지 얼마 남지 않았어요",
    body: "결제 준비와 운영 필수 항목만 마치면 바로 오픈할 수 있어요. 아래 버튼을 눌러 남은 항목을 확인해 보세요.",
    button: "남은 항목 확인하기",
    category: "마케팅성",
  },
  {
    id: 7,
    title: "쇼핑몰 오픈 준비가 끝났어요!",
    body: "운영에 꼭 필요한 필수 항목을 모두 완료하셨어요. 지금 바로 쇼핑몰을 오픈하실 수 있어요.",
    button: "쇼핑몰 바로가기",
    category: "정보성",
  },
];

export interface NotificationHistoryRow {
  sentAt: string;
  messageTitle: string;
  category: "정보성" | "마케팅성";
  received: boolean;
}

export interface CompanyRow {
  key: string;
  storeName: string;
  loginId: string;
  managerName: string;
  joinDate: string;
  templateCategory: string;
  stage: StageKey;
  templateSelected: boolean;
  approvalDone: boolean;
  completedItemIds: ChecklistItemId[];
  recentMessageId: number | null;
  history: NotificationHistoryRow[];
}

export const COMPANIES: CompanyRow[] = [
  {
    key: "isumo",
    storeName: "이수모 스토어",
    loginId: "isumo_store",
    managerName: "김이수",
    joinDate: "2026-07-20",
    templateCategory: "캐주얼 의류",
    stage: "payment-prep",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2],
    recentMessageId: 4,
    history: [
      { sentAt: "2026-07-20 10:24", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-23 09:00", messageTitle: "아직 PG 신청을 완료하지 않으셨어요", category: "마케팅성", received: true },
      { sentAt: "2026-07-24 14:12", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
    ],
  },
  {
    key: "greenlife",
    storeName: "그린라이프",
    loginId: "greenlife2026",
    managerName: "박그린",
    joinDate: "2026-07-15",
    templateCategory: "리빙 · 홈",
    stage: "open-ready",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-07-15 09:12", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-18 11:00", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-07-20 09:00", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-07-21 16:40", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
  },
  {
    key: "dailymarket",
    storeName: "데일리마켓",
    loginId: "dailymarket01",
    managerName: "최데일",
    joinDate: "2026-08-18",
    templateCategory: "데일리 잡화",
    stage: "template-pending",
    templateSelected: false,
    approvalDone: false,
    completedItemIds: [],
    recentMessageId: 2,
    history: [
      { sentAt: "2026-08-19 09:00", messageTitle: "#{판매자명}님, 이제 템플릿만 선택하면 돼요", category: "마케팅성", received: false },
    ],
  },
  {
    key: "cozyhome",
    storeName: "코지홈웨어",
    loginId: "cozyhome_biz",
    managerName: "이코지",
    joinDate: "2026-08-19",
    templateCategory: "홈웨어",
    stage: "approval-pending",
    templateSelected: true,
    approvalDone: false,
    completedItemIds: [],
    recentMessageId: null,
    history: [],
  },
  {
    key: "basiclab",
    storeName: "베이직랩",
    loginId: "basiclab_kr",
    managerName: "정베이직",
    joinDate: "2026-06-01",
    templateCategory: "유니섹스 베이직",
    stage: "all-done",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7, 9, 15, 16, 11, 12],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-06-01 09:40", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-06-03 10:02", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-06-05 09:00", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-06-06 15:20", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
  },
];

export type ValueFieldKey = "signup" | "template" | ChecklistItemId;

export interface ValueField {
  label: string;
  value: string;
}

export function getItemValueFields(key: ValueFieldKey, company: CompanyRow): ValueField[] {
  switch (key) {
    case "signup":
      return [
        { label: "아이디", value: company.loginId },
        { label: "대표자명", value: company.managerName },
        { label: "휴대폰번호", value: "010-1234-5678" },
        { label: "이메일", value: `${company.loginId}@example.com` },
        { label: "가입일시", value: `${company.joinDate} 10:24` },
      ];
    case "template":
      return [
        { label: "선택한 템플릿", value: company.templateCategory },
        { label: "선택일시", value: `${company.joinDate} 11:02` },
      ];
    case 1:
      return [
        { label: "신청 상태", value: "신청접수" },
        { label: "신청일", value: "2026-07-21" },
      ];
    case 2:
      return [
        { label: "업체명", value: "(주)이수모상사" },
        { label: "이메일", value: "supply@isumo.co.kr" },
        { label: "담당자", value: "김담당" },
        { label: "담당자 연락처", value: "02-123-4567" },
        { label: "등록일", value: "2026-07-21" },
      ];
    case 3:
      return [
        { label: "등록 상품 수", value: "3개" },
        { label: "최근 등록일", value: "2026-07-22" },
      ];
    case 5:
      return [
        { label: "상호명", value: company.storeName },
        { label: "사업자등록번호", value: "123-45-67890" },
        { label: "주소", value: "서울특별시 금천구 벚꽃로 298" },
        { label: "대표 전화번호", value: "02-1234-5678" },
      ];
    case 6:
      return [
        { label: "신청 상태", value: "심사중" },
        { label: "신청일", value: "2026-07-23" },
      ];
    case 8:
      return [
        { label: "카카오톡 채널 아이디", value: `@${company.loginId}` },
        { label: "인증 상태", value: "인증완료" },
      ];
    case 17:
      return [
        { label: "사용 여부", value: "사용" },
        { label: "팝빌 가입 여부", value: "가입완료" },
      ];
    case 7:
      return [
        { label: "카카오 연동 여부", value: "연동완료" },
        { label: "네이버 연동 여부", value: "미연동" },
        { label: "등록일", value: "2026-07-25" },
      ];
    case 9:
      return [
        { label: "입력 완료 항목 수", value: "4개 중 4개" },
        { label: "마지막 저장일", value: "2026-07-26" },
      ];
    case 15:
      return [{ label: "확인일시", value: "2026-07-20 10:31" }];
    case 16:
      return [{ label: "저장일시", value: "2026-07-20 10:40" }];
    case 11:
      return [
        { label: "수신거부번호 상태", value: "등록완료" },
        { label: "카카오톡 채널 상태", value: "등록완료" },
      ];
    case 12:
      return [{ label: "연동 클릭일시", value: "2026-07-30 15:12" }];
    default:
      return [];
  }
}
