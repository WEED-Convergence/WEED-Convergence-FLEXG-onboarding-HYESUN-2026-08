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

export const STATS_BY_PERIOD: Record<PeriodKey, { newSignups: number }> = {
  today: { newSignups: 2 },
  week: { newSignups: 9 },
  month: { newSignups: 27 },
  custom: { newSignups: 41 },
};

export type StageKey =
  | "template-pending"
  | "approval-pending"
  | "payment-prep"
  | "ops-prep"
  | "open-ready"
  | "all-done";

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
  lastActivityAt: string;
  templateCategory: string;
  templateSelected: boolean;
  approvalDone: boolean;
  completedItemIds: ChecklistItemId[];
  recentMessageId: number | null;
  history: NotificationHistoryRow[];
  pgApplications: PgApplicationEntry[];
}

const PAYMENT_PREP_IDS: ChecklistItemId[] = [1, 2, 3, 5];
const OPS_REQUIRED_IDS: ChecklistItemId[] = [6, 8, 17, 7];
const RECOMMENDED_SETTING_IDS: ChecklistItemId[] = [9, 15, 16];

// 현재 단계 뱃지는 저장된 값이 아니라 완료 항목으로부터 매번 계산합니다.
// (회원가입 → 템플릿 선택 → 승인 대기 → 결제 준비 → 운영 필수 → 오픈 가능 → 전체 완료)
export function deriveStage(company: Pick<CompanyRow, "templateSelected" | "approvalDone" | "completedItemIds">): StageKey {
  if (!company.templateSelected) return "template-pending";
  if (!company.approvalDone) return "approval-pending";
  if (company.completedItemIds.length === TOTAL_CHECKLIST_ITEMS) return "all-done";
  const paymentDone = PAYMENT_PREP_IDS.every((id) => company.completedItemIds.includes(id));
  const opsDone = OPS_REQUIRED_IDS.every((id) => company.completedItemIds.includes(id));
  if (paymentDone && opsDone) return "open-ready";
  if (paymentDone) return "ops-prep";
  return "payment-prep";
}

// "현재 단계" 필터/리스트 표기에서 공통으로 쓰는 7개(전체 제외 6개) 단계값.
// "오픈 가능"·"전체 완료"는 노출하지 않고, 결제 준비·운영 필수 이후에는
// 권장 설정 항목이 모두 끝났는지를 기준으로 권장 설정/매출 확장 중 하나로 표시합니다.
export type DisplayStage =
  | "신규가입"
  | "승인 대기"
  | "결제 준비중"
  | "운영 필수 진행중"
  | "권장 설정 진행중"
  | "매출 확장 진행중";

export const DISPLAY_STAGE_STYLE: Record<DisplayStage, { bg: string; color: string }> = {
  "신규가입": { bg: "#F1EFE8", color: "#5F5E5A" },
  "승인 대기": { bg: "#E6F1FB", color: "#0C447C" },
  "결제 준비중": { bg: "#FAEEDA", color: "#633806" },
  "운영 필수 진행중": { bg: "#FBEAF0", color: "#993556" },
  "권장 설정 진행중": { bg: "#F0EAFB", color: "#5B3A8C" },
  "매출 확장 진행중": { bg: "#EAF3E0", color: "#3B6D11" },
};

export function getDisplayStage(company: Pick<CompanyRow, "templateSelected" | "approvalDone" | "completedItemIds">): DisplayStage {
  const stage = deriveStage(company);
  if (stage === "template-pending") return "신규가입";
  if (stage === "approval-pending") return "승인 대기";
  if (stage === "payment-prep") return "결제 준비중";
  if (stage === "ops-prep") return "운영 필수 진행중";
  const recommendedDone = RECOMMENDED_SETTING_IDS.every((id) => company.completedItemIds.includes(id));
  return recommendedDone ? "매출 확장 진행중" : "권장 설정 진행중";
}

const APPROVAL_MESSAGE_TITLE = "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.";

// 별도 저장 필드 없이, 승인 완료 알림톡 발송 이력에서 승인 완료 일시를 가져옵니다.
export function getApprovalCompletedAt(company: Pick<CompanyRow, "approvalDone" | "history">): string | null {
  if (!company.approvalDone) return null;
  const entry = company.history.find((h) => h.messageTitle === APPROVAL_MESSAGE_TITLE);
  return entry ? entry.sentAt : null;
}

export type PgStatus = "승인완료" | "심사중" | "반려" | "미신청";

export interface PgApplicationEntry {
  provider: string | null;
  status: PgStatus;
  appliedAt: string | null;
}

export const PG_STATUS_STYLE: Record<PgStatus, { bg: string; color: string }> = {
  "승인완료": { bg: "#EAF3E0", color: "#3B6D11" },
  "심사중": { bg: "#E6F1FB", color: "#0C447C" },
  "반려": { bg: "#FBEAF0", color: "#D8342A" },
  "미신청": { bg: "#F1EFE8", color: "#5F5E5A" },
};

// 업체가 신청한 PG사가 여러 곳일 수 있어, PG사별로 상태를 확인합니다.
// 신청 이력이 없으면 "미신청" 1건으로 채워 반환합니다.
export function getPgApplications(
  company: Pick<CompanyRow, "pgApplications">
): PgApplicationEntry[] {
  if (company.pgApplications.length > 0) return company.pgApplications;
  return [{ provider: null, status: "미신청", appliedAt: null }];
}

export const COMPANIES: CompanyRow[] = [
  {
    key: "isumo",
    storeName: "이수모 스토어",
    loginId: "isumo_store",
    managerName: "김이수",
    joinDate: "2026-07-20",
    lastActivityAt: "2026-07-24 14:12",
    templateCategory: "캐주얼 의류",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2],
    recentMessageId: 4,
    history: [
      { sentAt: "2026-07-20 10:24:17", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-23 09:00:30", messageTitle: "아직 PG 신청을 완료하지 않으셨어요", category: "마케팅성", received: true },
      { sentAt: "2026-07-24 14:12:43", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-07-24 14:12:43" },
      { provider: "토스페이먼츠", status: "승인완료", appliedAt: "2026-07-25 11:30:00" },
      { provider: "나이스페이", status: "심사중", appliedAt: "2026-07-26 09:45:00" },
    ],
  },
  {
    key: "greenlife",
    storeName: "그린라이프",
    loginId: "greenlife2026",
    managerName: "박그린",
    joinDate: "2026-07-15",
    lastActivityAt: "2026-07-21 16:40",
    templateCategory: "리빙 · 홈",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-07-15 09:12:56", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-18 11:00:09", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-07-20 09:00:22", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-07-21 16:40:35", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-07-18 11:00:09" },
    ],
  },
  {
    key: "dailymarket",
    storeName: "데일리마켓",
    loginId: "dailymarket01",
    managerName: "최데일",
    joinDate: "2026-08-18",
    lastActivityAt: "2026-08-18 09:40",
    templateCategory: "데일리 잡화",
    templateSelected: false,
    approvalDone: false,
    completedItemIds: [],
    recentMessageId: 2,
    history: [
      { sentAt: "2026-08-19 09:00:48", messageTitle: "#{판매자명}님, 이제 템플릿만 선택하면 돼요", category: "마케팅성", received: false },
    ],
    pgApplications: [],
  },
  {
    key: "cozyhome",
    storeName: "코지홈웨어",
    loginId: "cozyhome_biz",
    managerName: "이코지",
    joinDate: "2026-08-19",
    lastActivityAt: "2026-08-19 11:05",
    templateCategory: "홈웨어",
    templateSelected: true,
    approvalDone: false,
    completedItemIds: [],
    recentMessageId: null,
    history: [],
    pgApplications: [],
  },
  {
    key: "basiclab",
    storeName: "베이직랩",
    loginId: "basiclab_kr",
    managerName: "정베이직",
    joinDate: "2026-06-01",
    lastActivityAt: "2026-06-06 15:20",
    templateCategory: "유니섹스 베이직",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7, 9, 15, 16, 11, 12],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-06-01 09:40:01", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-06-03 10:02:14", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-06-05 09:00:27", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-06-06 15:20:40", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-06-03 10:02:14" },
    ],
  },
  {
    key: "moodhouse",
    storeName: "무드하우스",
    loginId: "moodhouse_kr",
    managerName: "한무드",
    joinDate: "2026-08-10",
    lastActivityAt: "2026-08-13 09:00",
    templateCategory: "인테리어 소품",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [],
    recentMessageId: 3,
    history: [
      { sentAt: "2026-08-10 10:05:53", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-08-13 09:00:06", messageTitle: "아직 PG 신청을 완료하지 않으셨어요", category: "마케팅성", received: true },
    ],
    pgApplications: [],
  },
  {
    key: "sewingstudio",
    storeName: "소잉스튜디오",
    loginId: "sewing_studio",
    managerName: "정소잉",
    joinDate: "2026-08-05",
    lastActivityAt: "2026-08-09 15:30",
    templateCategory: "핸드메이드 소품",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [],
    recentMessageId: 5,
    history: [
      { sentAt: "2026-08-05 10:20:19", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-08-09 15:30:32", messageTitle: "PG 신청이 반려되었어요", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "토스페이먼츠", status: "반려", appliedAt: "2026-08-09 15:30:32" },
      { provider: "나이스페이", status: "심사중", appliedAt: "2026-08-13 10:00:00" },
    ],
  },
  {
    key: "sparklegoods",
    storeName: "반짝잡화",
    loginId: "sparkle_goods",
    managerName: "오반짝",
    joinDate: "2026-07-28",
    lastActivityAt: "2026-08-02 09:00",
    templateCategory: "생활 잡화",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5],
    recentMessageId: 6,
    history: [
      { sentAt: "2026-07-28 09:50:45", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-30 11:10:58", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-08-02 09:00:11", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-07-30 11:10:58" },
    ],
  },
  {
    key: "todaystable",
    storeName: "오늘의식탁",
    loginId: "today_table",
    managerName: "서식탁",
    joinDate: "2026-07-25",
    lastActivityAt: "2026-07-30 09:00",
    templateCategory: "주방 · 식기",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6],
    recentMessageId: 6,
    history: [
      { sentAt: "2026-07-25 09:30:24", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-27 10:40:37", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-07-30 09:00:50", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
    ],
    pgApplications: [
      { provider: "KG이니시스", status: "반려", appliedAt: "2026-07-26 09:30:00" },
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-07-27 10:40:37" },
    ],
  },
  {
    key: "lifefit",
    storeName: "라이프핏",
    loginId: "lifefit_shop",
    managerName: "노핏",
    joinDate: "2026-07-10",
    lastActivityAt: "2026-07-16 14:00",
    templateCategory: "스포츠 · 피트니스",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7, 9],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-07-10 09:15:03", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-12 10:00:16", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-07-15 09:00:29", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-07-16 14:00:42", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-07-12 10:00:16" },
    ],
  },
  {
    key: "homestyle",
    storeName: "홈스타일",
    loginId: "homestyle_biz",
    managerName: "윤홈",
    joinDate: "2026-07-08",
    lastActivityAt: "2026-07-14 14:30",
    templateCategory: "홈 데코",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7, 11],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-07-08 09:20:55", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-07-10 10:00:08", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-07-13 09:00:21", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-07-14 14:30:34", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-07-10 10:00:08" },
    ],
  },
  {
    key: "basecamp",
    storeName: "베이스캠프",
    loginId: "basecamp_out",
    managerName: "장베이스",
    joinDate: "2026-06-20",
    lastActivityAt: "2026-06-26 14:00",
    templateCategory: "아웃도어",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [1, 2, 3, 5, 6, 8, 17, 7, 9, 15, 16, 11],
    recentMessageId: 7,
    history: [
      { sentAt: "2026-06-20 09:00:47", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
      { sentAt: "2026-06-22 10:00:00", messageTitle: "PG 신청이 완료되었어요!", category: "정보성", received: true },
      { sentAt: "2026-06-25 09:00:13", messageTitle: "쇼핑몰 오픈까지 얼마 남지 않았어요", category: "마케팅성", received: true },
      { sentAt: "2026-06-26 14:00:26", messageTitle: "쇼핑몰 오픈 준비가 끝났어요!", category: "정보성", received: true },
    ],
    pgApplications: [
      { provider: "이지페이(EasyPAY)", status: "승인완료", appliedAt: "2026-06-22 10:00:00" },
    ],
  },
  {
    key: "growmarket",
    storeName: "그로우마켓",
    loginId: "growmarket01",
    managerName: "임그로우",
    joinDate: "2026-08-20",
    lastActivityAt: "2026-08-20 09:05",
    templateCategory: "가드닝",
    templateSelected: true,
    approvalDone: true,
    completedItemIds: [],
    recentMessageId: 1,
    history: [
      { sentAt: "2026-08-20 09:05:39", messageTitle: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.", category: "정보성", received: true },
    ],
    pgApplications: [],
  },
];

export function daysSince(dateStr: string, todayStr: string): number {
  const from = new Date(`${dateStr}T00:00:00`);
  const to = new Date(`${todayStr}T00:00:00`);
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

export interface TermAgreement {
  label: string;
  required: boolean;
  agreed: boolean;
}

export interface SignupDetailData {
  joinType: "신규" | "기존 회원";
  businessType: "개인사업자" | "법인사업자" | "개인";
  businessRegistrationNumber: string;
  businessCertAttached: boolean;
  companyName: string;
  shopName: string;
  loginId: string;
  salesAgency: string;
  ownerName: string;
  businessCategory: string;
  businessItem: string;
  mailOrderStatus: "준비중" | "비대상" | "번호 있음";
  mailOrderNumber: string | null;
  representativePhone: string;
  faxNumber: string | null;
  zipCode: string;
  addressBase: string;
  addressDetail: string;
  managerName: string;
  managerPhone: string;
  managerPhoneVerified: boolean;
  managerEmail: string;
  managerEmailVerified: boolean;
  shopExperience: "없음" | "타 서비스 이용";
  previousShopService: string | null;
  terms: TermAgreement[];
}

const BUSINESS_TYPES: SignupDetailData["businessType"][] = ["개인사업자", "법인사업자", "개인"];
const MAIL_ORDER_STATUSES: SignupDetailData["mailOrderStatus"][] = ["번호 있음", "준비중", "비대상"];
const PREVIOUS_SHOP_SERVICES = ["카페24", "고도몰5", "메이크샵", "아임웹"];
const ADDRESS_PRESETS = [
  { zipCode: "08512", addressBase: "서울특별시 금천구 벚꽃로 298" },
  { zipCode: "06181", addressBase: "서울특별시 강남구 테헤란로 212" },
  { zipCode: "04524", addressBase: "서울특별시 중구 청계천로 100" },
];

// 회원가입 폼 전체 항목을 인덱스 기반으로 다양하게 생성합니다. (비밀번호·영업 대행사 항목은 제외)
export function getSignupDetail(company: CompanyRow, index: number): SignupDetailData {
  const businessType = BUSINESS_TYPES[index % BUSINESS_TYPES.length];
  const mailOrderStatus = MAIL_ORDER_STATUSES[(index + 1) % MAIL_ORDER_STATUSES.length];
  const address = ADDRESS_PRESETS[index % ADDRESS_PRESETS.length];
  const shopExperience: SignupDetailData["shopExperience"] = index % 4 === 1 ? "타 서비스 이용" : "없음";

  const companyName =
    businessType === "법인사업자"
      ? `(주)${company.storeName.replace(/\s/g, "")}`
      : businessType === "개인사업자"
        ? company.storeName
        : "-";

  return {
    joinType: index % 5 === 4 ? "기존 회원" : "신규",
    businessType,
    businessRegistrationNumber: businessType === "개인" ? "-" : `${120 + index}-45-${67890 + index}`,
    businessCertAttached: businessType !== "개인",
    companyName,
    shopName: company.storeName,
    loginId: company.loginId,
    salesAgency: "해당 없음",
    ownerName: company.managerName,
    businessCategory: "도소매업",
    businessItem: company.templateCategory,
    mailOrderStatus,
    mailOrderNumber: mailOrderStatus === "번호 있음" ? `2026-서울금천-${String(1000 + index)}` : null,
    representativePhone: `02-12${String(index).padStart(2, "0")}-5678`,
    faxNumber: index % 3 === 0 ? `02-12${String(index).padStart(2, "0")}-5679` : null,
    zipCode: address.zipCode,
    addressBase: address.addressBase,
    addressDetail: `${(index % 9) + 2}층 ${(index % 5) + 1}0${(index % 9) + 1}호`,
    managerName: company.managerName,
    managerPhone: `010-1234-${5670 + index}`,
    managerPhoneVerified: index % 5 !== 3,
    managerEmail: `${company.loginId}@example.com`,
    managerEmailVerified: index % 5 !== 3,
    shopExperience,
    previousShopService:
      shopExperience === "타 서비스 이용" ? PREVIOUS_SHOP_SERVICES[index % PREVIOUS_SHOP_SERVICES.length] : null,
    terms: [
      { label: "플렉스지 이용약관 동의", required: true, agreed: true },
      { label: "플렉스지 개인정보 수집 및 이용 동의", required: true, agreed: true },
      { label: "연동 업체 회원가입 동의", required: true, agreed: true },
      { label: "광고성 정보 수신 동의", required: false, agreed: index % 2 === 0 },
    ],
  };
}

export type ValueFieldKey = "signup" | "template" | ChecklistItemId;

export interface ValueField {
  label: string;
  value: string;
}

export function getItemValueFields(key: ValueFieldKey, company: CompanyRow): ValueField[] {
  switch (key) {
    case "template":
      return [
        { label: "선택한 템플릿", value: company.templateCategory },
        { label: "선택일시", value: `${company.joinDate} 11:02:07` },
      ];
    case 1:
      return getPgApplications(company).map((app) => ({
        label: app.provider ?? "PG사",
        value: app.appliedAt ? `${app.status} · ${app.appliedAt}` : app.status,
      }));
    case 2:
      return [
        { label: "업체명", value: "(주)이수모상사" },
        { label: "이메일", value: "supply@isumo.co.kr" },
      ];
    case 3:
      return [
        { label: "등록 상품 수", value: "3개" },
        { label: "최근 등록일시", value: "2026-07-22 13:47:08" },
      ];
    case 5:
      return [
        { label: "상호명", value: company.storeName },
        { label: "대표자 성함", value: company.managerName },
        { label: "사업자등록번호", value: "123-45-67890" },
        { label: "업태", value: "도소매업" },
        { label: "업종", value: company.templateCategory },
        { label: "통신판매신고번호", value: "입력 · 2026-서울금천-1234" },
        { label: "우편번호", value: "08512" },
        { label: "기본주소", value: "서울특별시 금천구 벚꽃로 298" },
        { label: "상세주소", value: "2층 101호" },
        { label: "대표 전화번호", value: "02-1234-5678" },
      ];
    case 6:
      return [
        { label: "구분", value: "법인/대표자 명의" },
        { label: "발신자명", value: company.storeName },
        { label: "발신번호", value: "0212345678" },
        { label: "첨부파일", value: "가입확인서, 사업자등록증·사업자정보 제출완료" },
      ];
    case 8:
      return [
        { label: "카카오톡 채널 아이디", value: `@${company.loginId}` },
        { label: "카테고리 선택", value: "쇼핑몰" },
        { label: "관리자 휴대폰 번호", value: "010-9876-5432" },
      ];
    case 17:
      return [
        { label: "팝빌 가입정보", value: "가입완료" },
        { label: "현금영수증 사용여부", value: "사용" },
        { label: "주문/결제 기본값", value: "개인소득공제" },
        { label: "자동 발행 기준", value: "입금확인" },
        { label: "자진 발행 조건", value: "1원 이상의 결제건" },
      ];
    case 7:
      return [
        { label: "네이버 로그인 신청 여부", value: "미신청" },
        { label: "카카오 네이티브 앱 키", value: "a1b2c3d4e5f6g7h8i9j0" },
        { label: "카카오 REST API 키", value: "k1l2m3n4o5p6q7r8s9t0" },
        { label: "카카오 JavaScript 키", value: "u1v2w3x4y5z6a7b8c9d0" },
        { label: "카카오 Client Secret 코드", value: "e1f2g3h4i5j6k7l8m9n0" },
      ];
    case 9:
      return [
        { label: "메타태그 제목", value: `${company.storeName} | 온라인 쇼핑몰` },
        { label: "메타태그 설명", value: `${company.storeName}에서 다양한 상품을 만나보세요.` },
        { label: "메타태그 키워드", value: `${company.templateCategory}, 쇼핑몰, 온라인스토어` },
        { label: "오픈그래프 제목", value: `${company.storeName} 공식 스토어` },
        { label: "오픈그래프 설명", value: "지금 바로 방문해보세요." },
        { label: "오픈그래프 이미지", value: "og-image.jpg 등록완료" },
      ];
    case 15:
      return [{ label: "확인일시", value: "2026-07-20 10:31:05" }];
    case 16:
      return [
        { label: "2단계 인증", value: "사용안함" },
        { label: "중복 로그인 제한", value: "부분 제한" },
        { label: "로그인 실패 횟수 제한", value: "사용" },
        { label: "세션 만료 시간", value: "30분" },
      ];
    case 11:
      return [
        { label: "수신거부번호 상태", value: "등록완료" },
        { label: "카카오톡 채널 상태", value: "등록완료" },
      ];
    case 12:
      return [{ label: "연동 클릭일시", value: "2026-07-30 15:12:47" }];
    default:
      return [];
  }
}
