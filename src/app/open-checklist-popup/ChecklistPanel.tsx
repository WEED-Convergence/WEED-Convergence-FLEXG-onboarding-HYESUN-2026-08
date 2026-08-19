"use client";

import { useState } from "react";
import { useSelectedChecklistItem } from "../SelectedChecklistItemContext";

interface ChecklistItemData {
  id: number;
  title: string;
  description: string;
  previewTitle: string;
  previewRows: string[];
  previewButton?: string;
}

interface CategoryData {
  name: string;
  itemIds: number[];
}

const items: ChecklistItemData[] = [
  {
    id: 1,
    title: "PG 신청하기",
    description: "",
    previewTitle: "PG 계약 정보 입력",
    previewRows: ["상호명: 이수모 스토어", "사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
  },
  {
    id: 2,
    title: "공급사 등록하기",
    description: "",
    previewTitle: "공급사 정보 입력",
    previewRows: ["공급사명: (주)이수모상사", "담당자: 김담당", "연락처: 02-123-4567"],
  },
  {
    id: 3,
    title: "상품 등록하기",
    description: "",
    previewTitle: "상품 등록",
    previewRows: ["상품명: 베이직 티셔츠", "가격: 19,900원", "재고: 100개"],
  },
  {
    id: 5,
    title: "사업자 정보 · 통신판매업신고번호 등록하기",
    description: "",
    previewTitle: "사업자 정보",
    previewRows: [
      "상호명: 이수모 스토어",
      "대표자: 이수모",
      "통신판매업신고번호: 2026-서울금천-0001",
    ],
  },
  {
    id: 6,
    title: "발신번호 신청하기",
    description: "인증번호·주문 안내 문자에 사용할 발신번호를 등록해 주세요.",
    previewTitle: "발신번호 신청",
    previewRows: ["신청 번호: 02-1234-5678", "서류: 통신서비스 이용증명원"],
  },
  {
    id: 7,
    title: "SNS 간편 로그인 등록(카카오, 네이버)",
    description:
      "고객이 아이디를 새로 만들지 않고, 복잡한 절차 없이 1초 만에 회원가입할 수 있게 해주는 기능이에요. 아래 가이드를 보시면서 순서대로 진행해 주세요.",
    previewTitle: "간편로그인 설정",
    previewRows: ["카카오 REST API 키: ****", "네이버 Client ID: ****"],
  },
  {
    id: 8,
    title: "알림톡 등록하기",
    description: "카카오 비즈니스 채널 개설 및 심사 완료 후 채널을 등록해 주세요.",
    previewTitle: "알림톡 채널 연동",
    previewRows: ["카카오 채널 ID: @isumo_store"],
  },
  {
    id: 9,
    title: "SEO 설정하기",
    description: "검색 유입을 높이기 위한 페이지 제목, 설명, 키워드를 설정해 주세요.",
    previewTitle: "SEO 설정",
    previewRows: ["페이지 제목: 이수모 스토어 - 베이직 캐주얼", "설명: 데일리룩 전문 쇼핑몰"],
  },
  {
    id: 10,
    title: "팝빌 신청하기",
    description: "",
    previewTitle: "팝빌 연동 신청",
    previewRows: ["사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
  },
  {
    id: 15,
    title: "약관 확인하기",
    description: "",
    previewTitle: "약관 관리",
    previewRows: ["이용약관: 기본 템플릿 적용됨", "개인정보처리방침: 기본 템플릿 적용됨"],
  },
  {
    id: 16,
    title: "보안 설정하기",
    description: "",
    previewTitle: "보안 설정",
    previewRows: ["2단계 인증: 미설정", "로그인 알림: 미설정"],
  },
  {
    id: 11,
    title: "CRM 설정",
    description: "",
    previewTitle: "캠페인 빌더",
    previewRows: ["캠페인 유형: 신규가입 웰컴", "발송시점: 가입 직후"],
  },
  {
    id: 12,
    title: "라이브커머스 설정하기",
    description: "",
    previewTitle: "라이브 설정",
    previewRows: ["방송 채널: 미연동", "판매 상품: 미지정"],
  },
];

const categories: CategoryData[] = [
  { name: "결제 준비", itemIds: [1, 2, 3, 5] },
  { name: "운영 필수 기능", itemIds: [6, 8, 7] },
  { name: "권장 설정 기능", itemIds: [9, 10, 15, 16] },
  { name: "매출 확장 기능", itemIds: [11, 12] },
];

function ItemCircle({ active }: { active: boolean }) {
  return (
    <span
      className="h-3.5 w-3.5 shrink-0 rounded-full border"
      style={{ borderColor: active ? "var(--accent)" : "var(--border)" }}
    />
  );
}

type PgStatus = "미신청" | "신청접수" | "심사중" | "승인완료" | "반려";

// 실데이터 연동 전 데모용 고정값. 상태를 바꾸려면 이 값만 수정하면 좌측 리스트/우측 배지에 동일하게 반영됩니다.
const PG_STATUS: PgStatus = "신청접수";

const PG_REJECTION_REASON = "제출하신 서류 정보가 사업자등록증과 일치하지 않습니다.";

const PG_STATUS_CODE: Record<PgStatus, number> = {
  미신청: 1,
  신청접수: 2,
  심사중: 3,
  승인완료: 4,
  반려: 5,
};

const pgStatusConfig: Record<
  PgStatus,
  {
    circleBg?: string;
    icon?: "check" | "x";
    labelColor: string;
    labelMedium: boolean;
    badge: { bg: string; color: string } | null;
  }
> = {
  미신청: { labelColor: "#B4B2A9", labelMedium: false, badge: null },
  신청접수: {
    circleBg: "#F2A623",
    labelColor: "#BA7517",
    labelMedium: true,
    badge: { bg: "#FAEEDA", color: "#633806" },
  },
  심사중: {
    circleBg: "#378ADD",
    labelColor: "#0C447C",
    labelMedium: true,
    badge: { bg: "#E6F1FB", color: "#0C447C" },
  },
  승인완료: {
    circleBg: "#639922",
    icon: "check",
    labelColor: "#3B6D11",
    labelMedium: true,
    badge: { bg: "#EAF3E0", color: "#3B6D11" },
  },
  반려: {
    circleBg: "#D8342A",
    icon: "x",
    labelColor: "#993556",
    labelMedium: true,
    badge: { bg: "#FBEAF0", color: "#993556" },
  },
};

function PgStatusCircle({ status, active }: { status: PgStatus; active: boolean }) {
  if (status === "미신청") {
    return <ItemCircle active={active} />;
  }
  const config = pgStatusConfig[status];
  return (
    <span
      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: config.circleBg }}
    >
      {config.icon === "check" ? (
        <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="white" strokeWidth="3.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : config.icon === "x" ? (
        <svg viewBox="0 0 24 24" width="7" height="7" fill="none" stroke="white" strokeWidth="3.5">
          <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
        </svg>
      ) : null}
    </span>
  );
}

function PgStatusNumberBadge({ status, size }: { status: PgStatus; size?: "sm" | "lg" }) {
  const badge = pgStatusConfig[status].badge ?? { bg: "var(--divider)", color: "var(--text-muted)" };
  const large = size === "lg";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ${
        large ? "h-[18px] min-w-[18px] px-1.5 text-[11px]" : "h-[14px] min-w-[14px] px-1 text-[9px]"
      }`}
      style={{ backgroundColor: "rgba(255,255,255,0.55)", color: badge.color }}
    >
      {PG_STATUS_CODE[status]}
    </span>
  );
}

function PgStatusLabel({ status }: { status: PgStatus }) {
  const badge = pgStatusConfig[status].badge ?? { bg: "var(--divider)", color: "var(--text-muted)" };
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full text-[10px] font-bold"
      style={{ backgroundColor: badge.bg, color: badge.color, padding: "3px 8px", border: `1px solid ${badge.color}` }}
    >
      {status}
      <PgStatusNumberBadge status={status} />
    </span>
  );
}

function PgStatusBadge({ status }: { status: PgStatus }) {
  const badge = pgStatusConfig[status].badge;
  if (!badge) return null;
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full text-[13px] font-bold tracking-tight"
      style={{
        backgroundColor: badge.bg,
        color: badge.color,
        padding: "5px 16px",
        border: `1.5px solid ${badge.color}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
      }}
    >
      {status}
      <PgStatusNumberBadge status={status} size="lg" />
    </span>
  );
}

function RequiredMark() {
  return <span className="mr-1 text-[var(--success)]">✔</span>;
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2"
      className="mt-0.5 shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01" strokeLinecap="round" />
      <path d="M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] px-3 py-[9px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

const primaryButtonClass =
  "rounded-[8px] bg-[var(--cta)] px-[28px] py-[10px] text-[13px] font-medium text-white";

const secondaryButtonClass =
  "rounded-[8px] border border-[var(--border)] px-[28px] py-[10px] text-[13px] font-medium text-[var(--text-secondary)]";

const pgRowSecondaryButtonClass =
  "shrink-0 whitespace-nowrap rounded-[6px] border border-[var(--border)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)]";

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className="relative h-5 w-9 shrink-0 rounded-full transition-colors"
      style={{ backgroundColor: checked ? "var(--success)" : "var(--border)" }}
    >
      <span
        className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform"
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function BrandWordmark({ brand }: { brand: string }) {
  switch (brand) {
    case "나이스페이":
      return (
        <span className="text-[13px] font-semibold tracking-wide text-[var(--text-primary)]">
          NICE
        </span>
      );
    case "NHN KCP":
      return (
        <span className="text-[13px] font-semibold text-[var(--text-primary)]">NHN KCP</span>
      );
    case "EasyPAY":
      return (
        <span className="text-[13px] font-semibold">
          <span style={{ color: "#1B2A4A" }}>Easy</span>
          <span style={{ color: "#2D6FD1" }}>PAY</span>
        </span>
      );
    case "네이버페이":
      return (
        <span className="text-[13px] font-semibold">
          <span style={{ color: "#03C75A" }}>N</span>
          <span className="text-[var(--text-primary)]"> Pay</span>
        </span>
      );
    case "카카오페이":
      return (
        <span className="text-[13px] font-semibold" style={{ color: "#3C1E1E" }}>
          kakao pay
        </span>
      );
    case "토스페이":
      return (
        <span className="text-[13px] font-medium lowercase" style={{ color: "#1B64DA" }}>
          toss pay
        </span>
      );
    case "내통장 바로결제":
      return (
        <span className="text-[13px] font-semibold" style={{ color: "#1B2A4A" }}>
          Hecto Financial
        </span>
      );
    case "Apple Pay":
      return (
        <span className="text-[13px] font-semibold text-[var(--text-primary)]">Pay</span>
      );
    case "페이코":
      return (
        <span className="text-[13px] font-semibold" style={{ color: "#E4032E" }}>
          PAYCO
        </span>
      );
    case "페이유":
      return (
        <span className="text-[13px] font-semibold" style={{ color: "#1D4FD6" }}>
          PAY·U
        </span>
      );
    default:
      return <span className="text-[13px] font-medium text-[var(--text-primary)]">{brand}</span>;
  }
}

function RadioOption({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 accent-[var(--accent-text)]"
      />
      {label}
    </label>
  );
}

function BusinessInfoForm() {
  const [salesReport, setSalesReport] = useState("비대상");

  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>사업자 정보</SubsectionTitle>

        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">상호명</p>
              <input type="text" placeholder="상호명 입력" className={inputClass} />
            </div>
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">대표자 성함</p>
              <input type="text" placeholder="성함 입력" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">사업자등록번호</p>
              <input type="text" placeholder="사업자등록번호 입력" className={inputClass} />
            </div>
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">업태</p>
              <input type="text" placeholder="업태 입력" className={inputClass} />
            </div>
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">업종</p>
              <input type="text" placeholder="업종 입력" className={inputClass} />
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">통신판매신고번호</p>
            <div className="flex items-center gap-4">
              {["비대상", "준비중", "입력"].map((label) => (
                <RadioOption
                  key={label}
                  name="salesReport"
                  label={label}
                  checked={salesReport === label}
                  onChange={() => setSalesReport(label)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">주소</p>
            <div className="flex gap-2">
              <input type="text" placeholder="우편번호" className={inputClass} />
              <button type="button" className={`shrink-0 ${secondaryButtonClass}`}>
                우편번호 찾기
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <input type="text" placeholder="기본주소" className={inputClass} />
              <input type="text" placeholder="상세주소" className={inputClass} />
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">대표 전화번호</p>
            <input type="text" placeholder="연락처 입력" className={inputClass} />
          </div>

          <div
            className="flex items-start gap-2 rounded-lg px-3.5 py-3"
            style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
          >
            <InfoIcon />
            <p className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--accent)]">휴대폰 번호로는 심사가 불가능</span>
              하며, 반드시 <span className="font-semibold text-[var(--accent)]">일반 유선전화</span>로
              등록해 주세요.
              <br />
              안심번호도 대표 전화번호로 등록 가능합니다.
              <br />
              번호 예시) 080, 0507, 0506, 0130, 0030 등
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            저장
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

const supplierFieldClass =
  "w-full rounded-md border border-[var(--border)] bg-white px-3 py-[9px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

function SupplierField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px]" style={{ color: "#5F5E5A" }}>
        {label}
      </span>
      <input type="text" placeholder={placeholder} className={supplierFieldClass} />
    </label>
  );
}

function SupplierListForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>공급사 정보 입력</SubsectionTitle>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <SupplierField label="업체명" placeholder="업체명 입력" />
          <SupplierField label="이메일" placeholder="이메일 입력" />
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            저장
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
        <button type="button" className={primaryButtonClass}>
          상세 정보 입력
        </button>
      </div>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 15L20 4" strokeLinecap="round" />
      <path d="M13 4H20V11" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M18 13V19C18 19.5523 17.5523 20 17 20H5C4.44772 20 4 19.5523 4 19V7C4 6.44772 4.44772 6 5 6H11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SampleProduct {
  name: string;
  price: string;
}

const sampleProducts: SampleProduct[] = [
  { name: "기본 반팔 티셔츠", price: "19,900원" },
  { name: "데일리 와이드 팬츠", price: "32,000원" },
  { name: "캐주얼 니트 가디건", price: "45,000원" },
];

function ProductSampleForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>상품 등록</SubsectionTitle>

        <div className="mt-4">
          {sampleProducts.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 border-b border-[var(--divider)] py-[14px] last:border-0"
            >
              <span className="h-9 w-9 shrink-0 rounded-md" style={{ backgroundColor: "#F1EFE8" }} />
              <div className="flex-1">
                <p className="text-[12px] font-medium text-[var(--text-primary)]">{item.name}</p>
                <p className="text-[10px] text-[var(--text-muted)]">샘플 상품</p>
              </div>
              <span className="text-[12px]" style={{ color: "#5F5E5A" }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button type="button" className={`flex items-center gap-1.5 ${primaryButtonClass}`}>
            상품 목록으로
            <ExternalLinkIcon />
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

function EventBadge() {
  return (
    <span
      className="ml-1 inline-block rounded-[3px] px-1.5 py-[1px] align-middle text-[9px] font-medium text-white"
      style={{ backgroundColor: "#F2A623" }}
    >
      EVENT
    </span>
  );
}

interface PgDetailItem {
  label: string;
  value: React.ReactNode;
}

interface PgOption {
  name: string;
  summary: string;
  detailItems?: PgDetailItem[];
}

const pgFeeWaived: React.ReactNode = (
  <>
    <span className="line-through" style={{ color: "#B4728A" }}>
      220,000원
    </span>{" "}
    면제
    <EventBadge />
  </>
);

const pgSettlementCycle = "영업일 기준 D+5일 (일정산)";
const pgCompoundTax = "지원";
const pgGuaranteeInsurance = "기본 1배수";
const pgInstantOpenDelayed: React.ReactNode = <>PG신청 2일 후에 적용 ⓘ</>;

const pgOptions: PgOption[] = [
  {
    name: "나이스페이",
    summary: "가입비 무료 · 정산 D+5일",
    detailItems: [
      { label: "PG 가입비", value: pgFeeWaived },
      { label: "정산주기", value: pgSettlementCycle },
      { label: "바로오픈", value: pgInstantOpenDelayed },
      { label: "복합과세", value: pgCompoundTax },
      { label: "보증보험", value: pgGuaranteeInsurance },
      {
        label: "자체 간편결제",
        value: (
          <>
            페이유 지원
            <EventBadge />
          </>
        ),
      },
    ],
  },
  {
    name: "NHN KCP",
    summary: "가입비 무료 · 정산 D+5일",
    detailItems: [
      { label: "PG 가입비", value: pgFeeWaived },
      { label: "정산주기", value: pgSettlementCycle },
      { label: "바로오픈", value: pgInstantOpenDelayed },
      { label: "복합과세", value: pgCompoundTax },
      { label: "보증보험", value: pgGuaranteeInsurance },
    ],
  },
  {
    name: "EasyPAY",
    summary: "가입비 무료 · 신청 즉시 사용 가능",
    detailItems: [
      { label: "PG 가입비", value: pgFeeWaived },
      { label: "정산주기", value: pgSettlementCycle },
      { label: "바로오픈", value: "PG신청과 동시에 즉시 사용 가능" },
      { label: "복합과세", value: pgCompoundTax },
      { label: "보증보험", value: pgGuaranteeInsurance },
    ],
  },
];

function SubsectionTitle({
  children,
  description,
}: {
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span
          className="w-[3px] shrink-0"
          style={{ height: 16, backgroundColor: "#D8342A", borderRadius: 2 }}
        />
        <p className="text-[15px] font-bold" style={{ color: "#2C2C2A" }}>
          {children}
        </p>
      </div>
      {description ? (
        <p className="mt-1 text-[11px]" style={{ color: "#888780" }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

const sectionCardClass = "rounded-[12px] bg-white p-5";
const sectionCardStyle = { border: "1px solid #E4E2D8" };

function DetailCard({ children }: { children: React.ReactNode }) {
  return (
    <div className={sectionCardClass} style={sectionCardStyle}>
      {children}
    </div>
  );
}

function PgApplicationForm() {
  const [selectedPg, setSelectedPg] = useState("EasyPAY");

  return (
    <div className="mt-6 w-full">
      <div
        className="mb-4 flex items-start gap-2 rounded-lg px-3.5 py-3"
        style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
      >
        <InfoIcon />
        <p className="text-[13px] font-bold leading-relaxed text-[var(--accent-text)]">
          PG 심사는 3주 이상 소요될 수 있어, 먼저 PG 신청 후 쇼핑몰 설정을 진행해 주시길 권장드립니다.
        </p>
      </div>

      <div className="space-y-4">
        <DetailCard>
          <SubsectionTitle>PG사 선택</SubsectionTitle>
          <div className="mt-2">
            {pgOptions.map((option) => {
              const checked = selectedPg === option.name;
              return (
                <div key={option.name} className="border-b border-[var(--divider)] last:border-0">
                  <div className="flex items-center justify-between gap-3 py-[14px]">
                    <label className="flex flex-1 items-center gap-3">
                      <input
                        type="radio"
                        name="pgOption"
                        checked={checked}
                        onChange={() => setSelectedPg(option.name)}
                        className="h-3.5 w-3.5 shrink-0 accent-[var(--accent)]"
                      />
                      <span className="w-[100px] shrink-0">
                        <BrandWordmark brand={option.name} />
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">{option.summary}</span>
                    </label>
                    <div className="flex shrink-0 items-center gap-[6px]">
                      {option.name === "나이스페이" ? (
                        <button type="button" className={pgRowSecondaryButtonClass}>
                          신청 가이드
                        </button>
                      ) : null}
                      <button type="button" className={pgRowSecondaryButtonClass}>
                        자세히 보기
                      </button>
                      <button type="button" className={`shrink-0 ${primaryButtonClass}`}>
                        신청
                      </button>
                    </div>
                  </div>
                  {checked && option.detailItems ? (
                    <div
                      className="mb-3 rounded-lg border border-[var(--border)] px-3.5 py-3"
                      style={{ backgroundColor: "var(--surface-1)" }}
                    >
                      <p className="text-[11px] font-bold text-[var(--text-primary)]">
                        {option.name} 상세정보
                      </p>
                      <div className="mt-1 text-[10.5px] text-[var(--text-secondary)]" style={{ lineHeight: 2 }}>
                        {option.detailItems.map((item) => (
                          <div key={item.label}>
                            · {item.label} : {item.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </DetailCard>

        <DetailCard>
          <SubsectionTitle>PG 연동 간편결제 서비스</SubsectionTitle>
          <div
            className="mt-2 flex items-center gap-2 rounded-lg px-3.5 py-3"
            style={{ backgroundColor: "var(--surface-1)" }}
          >
            <span className="text-[12px] font-medium" style={{ color: "#2C2C2A" }}>
              Apple Pay · 페이코 · 페이유(자체 간편결제)
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{ backgroundColor: "#EAF3E0", color: "#639922" }}
            >
              자동 포함
            </span>
          </div>
          <p className="mt-2 text-[10px]" style={{ color: "#888780" }}>
            PG 심사 진행 시 자동으로 함께 신청돼요. 별도로 선택하실 필요는 없어요.
          </p>
        </DetailCard>
      </div>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
        <button type="button" className={primaryButtonClass}>
          가이드 보기
        </button>
      </div>
    </div>
  );
}

const crmActionButtonClass = `shrink-0 whitespace-nowrap ${primaryButtonClass}`;

function CampaignSettingsForm() {
  const [rejectionType, setRejectionType] = useState("신규");

  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>기본 설정</SubsectionTitle>

        <div className="mt-4 border-t border-[var(--divider)]" />

        <div className="mt-4 flex flex-nowrap items-center gap-4">
          <span className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium text-[var(--text-primary)]">
            무료 수신거부번호
          </span>
          <label className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] text-[var(--text-secondary)]">
            <input
              type="radio"
              name="rejectionType"
              checked={rejectionType === "신규"}
              onChange={() => setRejectionType("신규")}
              className="h-3.5 w-3.5 accent-[#2563EB]"
            />
            신규
          </label>
          <label className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] text-[var(--text-secondary)]">
            <input
              type="radio"
              name="rejectionType"
              checked={rejectionType === "직접 입력"}
              onChange={() => setRejectionType("직접 입력")}
              className="h-3.5 w-3.5 accent-[#2563EB]"
            />
            직접 입력
          </label>
          <button type="button" className={crmActionButtonClass}>
            신청 &gt;
          </button>
        </div>

        <div className="mt-4 flex flex-nowrap items-center gap-4">
          <span className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium text-[var(--text-primary)]">
            카카오톡 채널
          </span>
          <button type="button" className={crmActionButtonClass}>
            등록 &gt;
          </button>
          <p className="text-[10px] text-[var(--text-muted)]">
            ⓘ 카카오톡 채널 등록이 완료되면 자동으로 알림톡 템플릿 승인 요청이 진행됩니다. 승인 절차가
            완료된 후에 메시지 캠페인을 발행할 수 있습니다. (영업일 기준 최대 3일 소요)
          </p>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
        <button type="button" className={primaryButtonClass}>
          더 알아보기
        </button>
      </div>
    </div>
  );
}

function TermsIllustration() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96" className="mx-auto block">
      <rect x="20" y="10" width="70" height="90" rx="10" fill="#FAF9F5" stroke="#D3D1C7" strokeWidth="2" />
      <rect x="34" y="32" width="42" height="6" rx="3" fill="#D3D1C7" />
      <rect x="34" y="48" width="42" height="6" rx="3" fill="#D3D1C7" />
      <rect x="34" y="64" width="30" height="6" rx="3" fill="#D3D1C7" />
      <rect x="62" y="68" width="40" height="40" rx="12" fill="#FBEAF0" />
      <circle cx="82" cy="88" r="14" fill="#D8342A" />
      <path
        d="M75 88L80 93L89 82"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TermsCheckForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>약관 관리</SubsectionTitle>

        <div className="mt-4">
          <TermsIllustration />
        </div>

        <div
          className="mt-5 flex items-start gap-2 rounded-lg px-3.5 py-3 text-left"
          style={{ border: "1.5px solid #D8342A", backgroundColor: "#FBEAF0" }}
        >
          <InfoIcon />
          <p className="text-[12px] leading-relaxed" style={{ color: "#993556" }}>
            <span className="font-semibold">
              편의를 위해 제공해드리는 전자상거래 표준 양식이 등록되어 있어요.
            </span>
            <br />
            내 쇼핑몰에 맞게 <span className="font-semibold">이용약관 · 개인정보처리방침 안내</span> 등을
            확인하고 수정해 보세요.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="button" className={`flex items-center gap-1.5 ${primaryButtonClass}`}>
            약관 보기
            <ExternalLinkIcon />
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

function SecurityBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="mr-1.5 inline-block align-middle rounded-full px-2 py-[1px] text-[10px] font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

function SecuritySettingsForm() {
  const [twoFactor, setTwoFactor] = useState("사용안함");
  const [duplicateLogin, setDuplicateLogin] = useState("사용안함");
  const [loginFailLimit, setLoginFailLimit] = useState("사용안함");
  const [sessionTimeout, setSessionTimeout] = useState("120분");

  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>로그인 보안 설정</SubsectionTitle>

        <div className="mt-4 space-y-5">
          <div className="flex items-start gap-4">
            <span className="w-[120px] shrink-0 pt-[2px] text-[13px] font-medium text-[var(--text-primary)]">
              2단계 인증
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <RadioOption
                  name="twoFactor"
                  label="사용안함"
                  checked={twoFactor === "사용안함"}
                  onChange={() => setTwoFactor("사용안함")}
                />
                <RadioOption
                  name="twoFactor"
                  label="사용"
                  checked={twoFactor === "사용"}
                  onChange={() => setTwoFactor("사용")}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">
                ⓘ 사용 시 모든 부계정에도 동일하게 적용됩니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-[120px] shrink-0 pt-[2px] text-[13px] font-medium text-[var(--text-primary)]">
              중복 로그인 제한
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <RadioOption
                  name="duplicateLogin"
                  label="사용안함"
                  checked={duplicateLogin === "사용안함"}
                  onChange={() => setDuplicateLogin("사용안함")}
                />
                <RadioOption
                  name="duplicateLogin"
                  label="부분 제한 (보안 적용)"
                  checked={duplicateLogin === "부분 제한"}
                  onChange={() => setDuplicateLogin("부분 제한")}
                />
                <RadioOption
                  name="duplicateLogin"
                  label="완전 제한 (보안 강화)"
                  checked={duplicateLogin === "완전 제한"}
                  onChange={() => setDuplicateLogin("완전 제한")}
                />
              </div>
              <div
                className="mt-2 space-y-1.5 rounded-[8px] px-3 py-[10px]"
                style={{ backgroundColor: "#FAF9F5", border: "1px solid #E4E2D8" }}
              >
                <p className="text-[10px] leading-relaxed text-[var(--text-muted)]">
                  <SecurityBadge label="부분 제한" color="#639922" />
                  ⓘ 동일한 장소의 인터넷 환경에서 IP기준 중복 로그인을 허용합니다. 단, IP 변동이 생기는
                  유동IP는 적용되지 않습니다.
                </p>
                <p className="text-[10px] leading-relaxed text-[var(--text-muted)]">
                  <SecurityBadge label="완전 제한" color="#378ADD" />
                  ⓘ 세션 기준으로 로그인을 제한하며 동일한 계정은 한 번에 하나의 접속만 허용합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-[120px] shrink-0 pt-[2px] text-[13px] font-medium text-[var(--text-primary)]">
              로그인 실패 횟수 제한
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <RadioOption
                  name="loginFailLimit"
                  label="사용안함"
                  checked={loginFailLimit === "사용안함"}
                  onChange={() => setLoginFailLimit("사용안함")}
                />
                <RadioOption
                  name="loginFailLimit"
                  label="사용"
                  checked={loginFailLimit === "사용"}
                  onChange={() => setLoginFailLimit("사용")}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">
                ⓘ 사용 시 관리자 로그인 비밀번호를 5회 이상 잘못 입력하면 로그인을 제한합니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-[120px] shrink-0 pt-[2px] text-[13px] font-medium text-[var(--text-primary)]">
              세션 만료 시간
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                {["30분", "60분", "90분", "120분"].map((label) => (
                  <RadioOption
                    key={label}
                    name="sessionTimeout"
                    label={label}
                    checked={sessionTimeout === label}
                    onChange={() => setSessionTimeout(label)}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">
                ⓘ 설정한 시간 동안 활동이 없으면 자동으로 로그아웃됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            저장
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

const senderAttachments = [
  { name: "가입확인서", buttonLabel: "파일1" },
  { name: "사업자등록증, 사업자정보", buttonLabel: "파일3" },
];

function SenderNumberForm() {
  const [senderType, setSenderType] = useState("법인/대표자 명의");

  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>발신번호 신청</SubsectionTitle>

        <div className="mt-4 space-y-5">
          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">구분</p>
            <div className="flex flex-wrap items-center gap-4">
              {["법인/대표자 명의", "재직자", "타사 명의", "대표자의 가족", "재직자의 가족"].map(
                (label) => (
                  <RadioOption
                    key={label}
                    name="senderType"
                    label={label}
                    checked={senderType === label}
                    onChange={() => setSenderType(label)}
                  />
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">발신자명</p>
              <input type="text" placeholder="ex) FLEXG" className={inputClass} />
            </div>
            <div>
              <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">발신번호</p>
              <input type="text" placeholder="ex) 070-0000-0000" className={inputClass} />
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">첨부파일 업로드</p>
            <div className="space-y-2">
              {senderAttachments.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-[6px] px-3 py-2"
                  style={{ border: "1px solid #E4E2D8" }}
                >
                  <span className="text-[12px] text-[var(--text-primary)]">{file.name}</span>
                  <button
                    type="button"
                    className="shrink-0 rounded-[5px] px-3 py-[4px] text-[10px] font-medium text-white"
                    style={{ backgroundColor: "#5F5E5A" }}
                  >
                    {file.buttonLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-lg px-3.5 py-3"
            style={{ border: "1.5px solid #D8342A", backgroundColor: "#FBEAF0" }}
          >
            <InfoIcon />
            <p className="flex-1 text-[12px] leading-relaxed" style={{ color: "#993556" }}>
              신청서 첨부서류는 <span className="font-semibold">신청서 가이드 확인 후</span> 진행해
              주세요.
            </p>
            <button
              type="button"
              className="shrink-0 whitespace-nowrap rounded-[5px] px-[14px] py-[6px] text-[11px] font-medium text-white"
              style={{ backgroundColor: "#D8342A" }}
            >
              가이드 보기
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            신청 요청
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

const alimtalkNotices = [
  { text: "반드시 카카오 비즈니스 -> 채널 -> 비즈니스 채널 전환 후에 신청해 주시기 바랍니다." },
  {
    text: "카카오 비즈니스 -> 채널 -> 프로필 설정에 채널 공개 ON으로 되어야 승인 처리됩니다.",
    color: "#D8342A",
  },
  {
    text: "알림톡은 신청하신 판매자님의 카카오톡 채널 아이디로 발송되며, 설정 문구와 지정된 템플릿 형태로 발송 가능합니다. (템플릿 형태는 임의 수정 불가)",
  },
  { text: "알림톡은 수신자가 메시지 받기 승인 시에만 전송됩니다." },
  { text: "알림톡은 수신자 거부 또는 기타 사유로 발송에 실패했을 경우, LMS서비스로 발송 처리 됩니다." },
];

function AlimtalkForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>알림톡 채널 연동</SubsectionTitle>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-[130px] shrink-0 text-[13px] font-medium text-[var(--text-primary)]">
              카카오톡 채널 아이디
            </span>
            <input
              type="text"
              placeholder="카카오톡 채널 아이디 입력 (예: @happytalk)"
              className={`flex-1 ${inputClass}`}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-[130px] shrink-0 text-[13px] font-medium text-[var(--text-primary)]">
              카테고리 선택
            </span>
            <select className={`flex-1 ${inputClass}`} defaultValue="건강,병원,종합병원">
              <option value="건강,병원,종합병원">건강,병원,종합병원</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="w-[130px] shrink-0 text-[13px] font-medium text-[var(--text-primary)]">
              관리자 휴대폰 번호
            </span>
            <input
              type="text"
              placeholder="카카오톡 채널 관리자 휴대폰 번호 입력 (예: 01012341234)"
              className={`flex-1 ${inputClass}`}
            />
            <button
              type="button"
              className="shrink-0 whitespace-nowrap rounded-[5px] px-3 py-[6px] text-[11px] font-medium text-white"
              style={{ backgroundColor: "#5F5E5A" }}
            >
              인증번호 요청
            </button>
          </div>

          <div
            className="rounded-[8px] px-4 py-[14px]"
            style={{ border: "1px solid #E4E2D8", backgroundColor: "#FAF9F5" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold" style={{ color: "#2C2C2A" }}>
                유의사항
              </p>
              <button
                type="button"
                className="shrink-0 whitespace-nowrap rounded-[5px] px-[14px] py-[6px] text-[11px] font-medium text-white"
                style={{ backgroundColor: "#D8342A" }}
              >
                가이드
              </button>
            </div>
            <div className="mt-2">
              {alimtalkNotices.map((notice, index) => (
                <p
                  key={notice.text}
                  className="text-[11px]"
                  style={{ color: notice.color ?? "#5F5E5A", lineHeight: 2 }}
                >
                  {index + 1}. {notice.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            등록
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

function LiveIllustration() {
  return (
    <svg viewBox="0 0 100 120" width="88" height="104" className="shrink-0">
      <rect x="4" y="4" width="92" height="112" rx="14" fill="#FAF9F5" stroke="#D3D1C7" strokeWidth="2" />
      <rect x="16" y="16" width="34" height="14" rx="7" fill="#D8342A" />
      <text x="33" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">
        LIVE
      </text>
      <circle cx="50" cy="62" r="24" fill="#FBEAF0" />
      <path d="M44 50L44 74L68 62Z" fill="#D8342A" />
      <rect x="20" y="98" width="60" height="8" rx="4" fill="#D3D1C7" />
    </svg>
  );
}

function DesktopAnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8" strokeLinecap="round" />
      <path d="M12 16v4" strokeLinecap="round" />
      <path d="M7 13l3-3 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsGearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 13a7.97 7.97 0 000-2l2-1.5-2-3.5-2.4 1a8.1 8.1 0 00-1.7-1L15 3h-6l-.3 2.5a8.1 8.1 0 00-1.7 1l-2.4-1-2 3.5L4.6 11a7.97 7.97 0 000 2l-2 1.5 2 3.5 2.4-1a8.1 8.1 0 001.7 1L9 21h6l.3-2.5a8.1 8.1 0 001.7-1l2.4 1 2-3.5-2-1.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 016 0v2" strokeLinecap="round" />
    </svg>
  );
}

function DeviceMobileIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#B4B2A9" strokeWidth="2">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const liveSteps = [
  "어드민에서 방송을 만들고, 팔 상품과 배너를 등록해요.",
  "앱으로 방송을 켜고, 반응과 주문을 실시간으로 확인해요.",
  "쇼핑몰 메인에 방송이 자동으로 노출돼서 고객이 들어와요.",
  "방송이 끝난 후엔, 못 산 고객에게 재구매 기회를 안내해요.",
];

const liveGuideCards = [
  {
    Icon: DesktopAnalyticsIcon,
    bg: "#E6F1FB",
    color: "#378ADD",
    title: "어드민 방송관리 사용하기",
    desc: "방송 목록 확인부터 관리까지",
  },
  {
    Icon: SettingsGearIcon,
    bg: "#FAEEDA",
    color: "#BA7517",
    title: "라이브 방송 설정하기",
    desc: "라이브 정보와 세부 설정",
  },
  {
    Icon: ShoppingBagIcon,
    bg: "#EAF3E0",
    color: "#639922",
    title: "라이브 상품 등록하기",
    desc: "상품 등록 및 판매 조건 관리",
  },
  {
    Icon: DeviceMobileIcon,
    bg: "#FBEAF0",
    color: "#D8342A",
    title: "송출 앱 사용하기",
    desc: "모바일로 실시간 방송 관리",
  },
];

function LiveCommerceForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <div className="flex items-center gap-4">
          <LiveIllustration />
          <div>
            <p className="text-[16px] font-semibold text-[var(--text-primary)]">라이브커머스 설정하기</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[var(--text-muted)]">
              실시간 방송으로 상품을 소개하고, 방송을 보던 고객이 바로 구매까지 이어지게 해주는
              기능이에요.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[12px] font-bold text-[var(--text-primary)]">이렇게 시작해요</p>
          <div className="mt-2">
            {liveSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 border-b border-[var(--divider)] py-[14px] last:border-0"
              >
                <span
                  className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: "#D8342A" }}
                >
                  {index + 1}
                </span>
                <p className="text-[12px] text-[var(--text-secondary)]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-5 border-t border-[var(--divider)]" />

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-bold text-[var(--text-primary)]">FLEXG Live 가이드</p>
            <a
              href="https://guide.flexgate.co.kr/live"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap rounded-[5px] px-[14px] py-[6px] text-[11px] font-medium text-white"
              style={{ backgroundColor: "#D8342A" }}
            >
              전체 가이드 보기
            </a>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {liveGuideCards.map(({ Icon, bg, color, title, desc }) => (
              <div
                key={title}
                className="relative flex cursor-pointer flex-col items-center rounded-[10px] px-3.5 py-[14px] text-center"
                style={{ border: "1px solid #E4E2D8" }}
              >
                <span className="absolute right-3 top-3">
                  <ChevronRightIcon />
                </span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: bg, color }}
                >
                  <Icon />
                </span>
                <p className="mt-2 text-[12px] font-bold text-[var(--text-primary)]">{title}</p>
                <p className="mt-1 text-[10px] text-[var(--text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
        <button type="button" className={primaryButtonClass}>
          더 알아보기
        </button>
      </div>
    </div>
  );
}

const seoInputClass =
  "w-[220px] shrink-0 rounded-md border border-[var(--border)] px-3 py-[9px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

function SeoField({
  label,
  placeholder,
  note,
}: {
  label: string;
  placeholder: string;
  note?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="w-[110px] shrink-0 whitespace-nowrap text-[13px] font-medium text-[var(--text-primary)]">
          {label}
        </span>
        <input type="text" placeholder={placeholder} className={seoInputClass} />
      </div>
      {note ? (
        <p className="mt-1.5 pl-[122px] text-[10px] leading-relaxed text-[var(--text-muted)]">
          {note}
        </p>
      ) : null}
    </div>
  );
}

function SeoSettingsForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>검색 노출 및 공유 정보</SubsectionTitle>

        <div className="mt-4 space-y-4">
          <SeoField
            label="메타태그 제목"
            placeholder="제목 입력"
            note="ⓘ 쇼핑몰의 명칭으로 검색서비스에 노출되며 웹 브라우저 상단 표시와 즐겨찾기 등록시에 사용됩니다. (한글기준 32자 이하 권장)"
          />
          <SeoField
            label="메타태그 설명"
            placeholder="설명 입력"
            note="ⓘ 쇼핑몰의 간단한 요약정보이며 검색서비스에 노출됩니다. (한글 기준 80자 이하 권장)"
          />
          <SeoField
            label="메타태그 키워드"
            placeholder="키워드 입력"
            note="ⓘ 쇼핑몰을 대표하는 키워드를 콤마(,)로 구분해서 등록하실 수 있습니다."
          />
        </div>

        <div className="my-5 border-t border-[var(--divider)]" />

        <div className="space-y-4">
          <SeoField
            label="오픈 그래프 제목"
            placeholder="오픈 그래프 제목 입력"
            note="ⓘ 쇼핑몰 링크를 공유하실 때 사용되는 이미지와 내용입니다."
          />
          <SeoField label="오픈 그래프 설명" placeholder="오픈 그래프 설명 입력" />
          <div>
            <div className="flex items-center gap-3">
              <span className="w-[110px] shrink-0 whitespace-nowrap text-[13px] font-medium text-[var(--text-primary)]">
                오픈 그래프 이미지
              </span>
              <button
                type="button"
                className="shrink-0 rounded-[5px] px-3 py-[6px] text-[11px] font-medium text-white"
                style={{ backgroundColor: "#5F5E5A" }}
              >
                파일 선택
              </button>
              <span className="text-[10px]" style={{ color: "#B4B2A9" }}>
                등록된 이미지가 없습니다.
              </span>
            </div>
            <p className="mt-1.5 pl-[122px] text-[10px] leading-relaxed text-[var(--text-muted)]">
              ⓘ 500x250 크기의 JPG,PNG 파일만 등록하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            등록
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="#3C1E1E">
      <path d="M12 4C6.48 4 2 7.58 2 12c0 2.79 1.85 5.24 4.65 6.65-.2.75-.73 2.71-.84 3.13-.14.52.19.51.4.37.17-.11 2.66-1.8 3.75-2.54.66.1 1.34.15 2.04.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  );
}

function NaverIcon() {
  return (
    <span className="text-[20px] font-extrabold" style={{ color: "#03C75A" }}>
      N
    </span>
  );
}

function SnsIntroCard({
  icon,
  iconBg,
  title,
  desc,
  buttonLabel,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  buttonLabel: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-[10px] px-4 py-4"
      style={{ border: "1px solid #E4E2D8" }}
    >
      <span
        className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold text-[var(--text-primary)]">{title}</p>
        <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "#5F5E5A" }}>
          {desc}
        </p>
        <button
          type="button"
          className="mt-2 shrink-0 whitespace-nowrap rounded-[5px] px-3 py-[6px] text-[11px] font-medium text-white"
          style={{ backgroundColor: "#D8342A" }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

function SnsLoginForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <div className="space-y-[14px]">
          <SnsIntroCard
            icon={<KakaoIcon />}
            iconBg="#FFF4CC"
            title="카카오 로그인"
            desc="카카오톡으로 바로 로그인할 수 있게 해주는 기능이에요. 카카오 비즈니스 채널 개설과 앱 등록 등 카카오 쪽에서 진행할 설정이 있어서 단계가 좀 있지만, 가이드를 그대로 따라가시면 어렵지 않아요."
            buttonLabel="카카오 로그인 가이드 보기"
          />
          <SnsIntroCard
            icon={<NaverIcon />}
            iconBg="#E1F5EA"
            title="네이버 로그인"
            desc="네이버 계정으로 바로 로그인할 수 있게 해주는 기능이에요. 배너를 눌러 네이버 계정으로 로그인하고 간단한 정보만 입력하면 되기 때문에, 카카오보다 훨씬 빠르게 끝낼 수 있어요."
            buttonLabel="네이버 로그인 가이드 보기"
          />
        </div>

        <div className="mt-6">
          <p className="text-[12px] font-bold text-[var(--text-primary)]">API 설정</p>
          <p className="mt-1 text-[10px] text-[var(--text-muted)]">
            가이드를 보고 발급받은 키값을 아래에 입력해 주세요.
          </p>

          <div className="mt-4">
            <p className="text-[12px] font-bold text-[var(--text-primary)]">카카오 로그인</p>
            <div className="mt-2 space-y-2">
              <input type="text" placeholder="네이티브 앱 키 입력" className={inputClass} />
              <input type="text" placeholder="REST API 키 입력" className={inputClass} />
              <input type="text" placeholder="JavaScript 키 입력" className={inputClass} />
              <input type="text" placeholder="Client Secret 코드 입력" className={inputClass} />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[12px] font-bold text-[var(--text-primary)]">네이버 로그인</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <input type="text" placeholder="Client ID 입력" className={inputClass} />
              <input type="text" placeholder="Client Secret 입력" className={inputClass} />
            </div>
          </div>

          <div
            className="mt-5 flex items-start gap-2 rounded-lg px-3.5 py-3"
            style={{ border: "1.5px solid #D8342A", backgroundColor: "#FBEAF0" }}
          >
            <InfoIcon />
            <p className="text-[12px] leading-relaxed" style={{ color: "#993556" }}>
              키값을 삭제하거나 신규 진행 시엔 기존 회원은 신규 회원으로 진입되니 유의해 주세요.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[10px]">
          <button type="button" className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" className={primaryButtonClass}>
            등록
          </button>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
      </div>
    </div>
  );
}

function PopbillForm() {
  return (
    <div className="mt-6 w-full">
      <DetailCard>
        <SubsectionTitle>팝빌 연동 신청</SubsectionTitle>

        <div
          className="mt-4 flex items-start gap-2 rounded-lg px-3.5 py-3"
          style={{ border: "1.5px solid #D8342A", backgroundColor: "#FBEAF0" }}
        >
          <InfoIcon />
          <p className="text-[12px] leading-relaxed" style={{ color: "#993556" }}>
            <span className="font-semibold">팝빌은 무통장입금 확인을 자동화해주는 서비스예요.</span>
            <br />
            가입해두면 입금자명을 일일이 대조하지 않아도,{" "}
            <span className="font-semibold">입금 여부가 자동으로 확인</span>돼요.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[12px]" style={{ color: "#3B3A36" }}>
            팝빌 가입정보
          </span>
          <span className="text-[12px]" style={{ color: "#888780" }}>
            가입정보가 없습니다.
          </span>
          <button
            type="button"
            className="shrink-0 whitespace-nowrap rounded-[5px] px-[14px] py-[6px] text-[11px] font-medium text-white"
            style={{ backgroundColor: "#5F5E5A" }}
          >
            팝빌가입하기
          </button>
          <span className="text-[10px] text-[var(--text-muted)]">
            ⓘ 가입된 사업자번호인 경우 플렉스지 고객센터로 문의해 주세요.
          </span>
        </div>
      </DetailCard>

      <div className="mt-6 flex justify-center gap-[10px]">
        <button type="button" className={secondaryButtonClass}>
          건너뛰기
        </button>
        <button type="button" className={primaryButtonClass}>
          더 알아보기
        </button>
      </div>
    </div>
  );
}

export default function ChecklistPanel() {
  const { selectedChecklistItemId: selectedId, setSelectedChecklistItemId: setSelectedId } =
    useSelectedChecklistItem();

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const renderCategory = (
    category: CategoryData,
    style?: { titleColor?: string; trackColor?: string; progressTextColor?: string }
  ) => (
    <div key={category.name} className="mb-5 last:mb-0">
      <p className="text-[13px] font-semibold" style={{ color: style?.titleColor ?? "var(--text-primary)" }}>
        {category.name}
      </p>
      <div
        className="mt-2 h-1 w-full rounded-full"
        style={{ backgroundColor: style?.trackColor ?? "var(--divider)" }}
      >
        <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: "0%" }} />
      </div>
      <p className="mt-1 text-[11px]" style={{ color: style?.progressTextColor ?? "var(--text-muted)" }}>
        0/{category.itemIds.length}개 · 0%
      </p>

      <div className="mt-2.5 space-y-1">
        {category.itemIds.map((id) => {
          const item = items.find((it) => it.id === id)!;
          const active = id === selectedId;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedId(id)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px]"
              style={{
                backgroundColor: active ? "var(--accent-bg)" : "transparent",
                color: active ? "var(--accent-text)" : "var(--text-secondary)",
              }}
            >
              {id === 1 ? (
                <>
                  <PgStatusCircle status={PG_STATUS} active={active} />
                  <span className="flex-1">{item.title}</span>
                  <PgStatusLabel status={PG_STATUS} />
                </>
              ) : (
                <>
                  <ItemCircle active={active} />
                  {item.title}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex w-full items-stretch bg-white">
      <div className="w-[300px] shrink-0 bg-[var(--surface-1)] p-5">
          <div className="rounded-[10px] p-[14px]" style={{ backgroundColor: "#FBEAF0", border: "1px solid #F0C4CE" }}>
            {categories
              .slice(0, 2)
              .map((category) => renderCategory(category, { trackColor: "#F0C4CE", progressTextColor: "#993556" }))}
          </div>

          <p className="my-4 text-center text-[10px]" style={{ color: "#888780" }}>
            여기까지 완료하면 오픈 가능해요
          </p>

          <div className="rounded-[10px] p-[14px]" style={{ backgroundColor: "#FAF9F5", border: "1px solid #E4E2D8" }}>
            {categories
              .slice(2)
              .map((category) => renderCategory(category, { titleColor: "#5F5E5A", progressTextColor: "#B4B2A9" }))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-6">
          <div className="pr-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--text-muted)]">전체 진행률</span>
              <span className="text-[12px] text-[var(--text-muted)]">0/13개 · 0%</span>
            </div>
            <div className="mt-1.5 h-[5px] w-full rounded-full bg-[var(--divider)]">
              <div className="h-[5px] rounded-full bg-[var(--accent)]" style={{ width: "0%" }} />
            </div>
          </div>

          {selected.id === 1 && PG_STATUS === "반려" ? (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="text-[12px]" style={{ color: "#993556" }}>
                {PG_REJECTION_REASON}
              </p>
              <button
                type="button"
                className="shrink-0 rounded-[5px] text-[11px] font-medium text-white"
                style={{ backgroundColor: "#D8342A", padding: "6px 14px" }}
              >
                다시 신청하기
              </button>
            </div>
          ) : null}

          {selected.id !== 12 && (
            <>
              <div className="mt-3 flex items-center gap-2">
                <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">
                  {selected.id === 7 ? "SNS 간편 로그인 등록" : selected.title}
                </h2>
                {selected.id === 1 ? <PgStatusBadge status={PG_STATUS} /> : null}
              </div>
              {selected.description && (
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
                  {selected.description}
                </p>
              )}
            </>
          )}

          {selected.id === 2 && (
            <div
              className="mt-3 flex items-start gap-2 rounded-lg px-3.5 py-3"
              style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              <InfoIcon />
              <p className="text-[12px] leading-relaxed text-[var(--accent-text)]">
                현재 샘플 공급사가 등록되어 있어요.
                <br />
                <span className="font-semibold">자체적으로 배송하고 계신다면 별도의 공급사가 없어도 괜찮아요.</span>
                <br />
                이 경우엔 <span className="font-semibold">내 사업자 정보를 그대로 입력</span>하시면 됩니다.
              </p>
            </div>
          )}

          {selected.id === 3 && (
            <div
              className="mt-3 flex items-start gap-2 rounded-lg px-3.5 py-3"
              style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              <InfoIcon />
              <p className="text-[12px] leading-relaxed text-[var(--accent-text)]">
                <span className="font-semibold">선택하신 카테고리에 맞춰 샘플 상품 3개가 이미 등록되어 있어요.</span>
                <br />
                아래에서 확인하고, <span className="font-semibold">실제 판매하실 상품으로 수정</span>해 주세요.
              </p>
            </div>
          )}

          {selected.id === 6 && (
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className="shrink-0 rounded-[10px] text-[9px] font-medium"
                style={{ backgroundColor: "#F1EFE8", color: "#5F5E5A", padding: "2px 8px" }}
              >
                다음 단계
              </span>
              <span className="text-[11px]" style={{ color: "#888780" }}>
                알림톡 등록까지 완료되면 SMS 발송이 가능해요.
              </span>
            </div>
          )}

          {selected.id === 8 && (
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className="shrink-0 rounded-[10px] text-[9px] font-medium"
                style={{ backgroundColor: "#F1EFE8", color: "#5F5E5A", padding: "2px 8px" }}
              >
                이전 단계
              </span>
              <span className="text-[11px]" style={{ color: "#888780" }}>
                발신번호 등록까지 완료되어야 알림톡 발송이 가능해요.
              </span>
            </div>
          )}

          {selected.id === 11 && (
            <div
              className="mt-3 flex items-start gap-2 rounded-lg px-3.5 py-3"
              style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              <InfoIcon />
              <div className="space-y-1 text-[11px] leading-relaxed text-[var(--accent-text)]">
                <p>
                  · 기존에 쇼핑몰 운영을 위한 SMS/알림톡 설정을 완료하셨더라도 CRM 기능을 이용하시려면 무료
                  수신거부번호와 카카오톡 채널을 반드시 등록해 주세요.
                </p>
                <p>· 수신거부를 신청한 고객의 휴대폰 번호는 신청 일의 다음 날부터 수신거부 처리가 적용됩니다.</p>
              </div>
            </div>
          )}

          {selected.id === 9 && (
            <div
              className="mt-3 flex items-start gap-2 rounded-lg px-3.5 py-3"
              style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              <InfoIcon />
              <p className="text-[12px] leading-relaxed text-[var(--accent-text)]">
                <span className="font-semibold">아래 항목을 모두 입력해야 SEO 설정을 완료할 수 있어요.</span>
                <br />
                검색엔진 노출과 링크 공유 시 보여지는 정보를 결정하는 필수 항목이에요.
              </p>
            </div>
          )}

          {selected.id === 5 ? (
            <BusinessInfoForm />
          ) : selected.id === 2 ? (
            <SupplierListForm />
          ) : selected.id === 1 ? (
            <PgApplicationForm />
          ) : selected.id === 3 ? (
            <ProductSampleForm />
          ) : selected.id === 11 ? (
            <CampaignSettingsForm />
          ) : selected.id === 15 ? (
            <TermsCheckForm />
          ) : selected.id === 10 ? (
            <PopbillForm />
          ) : selected.id === 16 ? (
            <SecuritySettingsForm />
          ) : selected.id === 6 ? (
            <SenderNumberForm />
          ) : selected.id === 8 ? (
            <AlimtalkForm />
          ) : selected.id === 12 ? (
            <LiveCommerceForm />
          ) : selected.id === 9 ? (
            <SeoSettingsForm />
          ) : selected.id === 7 ? (
            <SnsLoginForm />
          ) : (
            <div className="mt-4 w-full">
              <DetailCard>
                <SubsectionTitle>{selected.previewTitle}</SubsectionTitle>
                <div className="mt-3">
                  {selected.previewRows.map((row) => (
                    <p
                      key={row}
                      className="border-b border-[var(--divider)] py-[14px] text-[12px] text-[var(--text-muted)] last:border-0"
                    >
                      {row}
                    </p>
                  ))}
                </div>
                {selected.previewButton ? (
                  <button type="button" className={`mt-3 w-full ${primaryButtonClass}`}>
                    {selected.previewButton}
                  </button>
                ) : null}
              </DetailCard>
            </div>
          )}
        </div>
      </div>
  );
}
