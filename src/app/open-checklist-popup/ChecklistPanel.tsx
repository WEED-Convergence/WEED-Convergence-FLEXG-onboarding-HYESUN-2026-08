"use client";

import { useState } from "react";

interface ChecklistItemData {
  id: number;
  title: string;
  description: string;
  duration: string;
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
    duration: "약 3분이면 완료",
    previewTitle: "PG 계약 정보 입력",
    previewRows: ["상호명: 이수모 스토어", "사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
  },
  {
    id: 14,
    title: "무통장입금 설정",
    description: "무통장 입금 시 사용할 정산계좌 정보를 입력해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "무통장입금 계좌 정보",
    previewRows: ["은행: 신한은행", "계좌번호: 110-123-456789", "예금주: 이수모"],
  },
  {
    id: 2,
    title: "공급사 등록하기",
    description: "",
    duration: "약 2분이면 완료",
    previewTitle: "공급사 정보 입력",
    previewRows: ["공급사명: (주)이수모상사", "담당자: 김담당", "연락처: 02-123-4567"],
  },
  {
    id: 3,
    title: "상품 등록하기",
    description: "",
    duration: "약 10분이면 완료",
    previewTitle: "상품 등록",
    previewRows: ["상품명: 베이직 티셔츠", "가격: 19,900원", "재고: 100개"],
  },
  {
    id: 4,
    title: "유선번호 등록하기",
    description: "고객 문의용 유선번호를 등록해 주세요.",
    duration: "약 1분이면 완료",
    previewTitle: "고객센터 연락처",
    previewRows: ["유선번호: 02-1234-5678"],
  },
  {
    id: 5,
    title: "사업자 정보 · 통신판매업신고번호 입력",
    description: "",
    duration: "약 3분이면 완료",
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
    duration: "약 3분이면 완료",
    previewTitle: "발신번호 신청",
    previewRows: ["신청 번호: 02-1234-5678", "서류: 통신서비스 이용증명원"],
  },
  {
    id: 7,
    title: "SNS 간편 로그인 등록(카카오, 네이버)",
    description: "고객이 카카오·네이버 계정으로 바로 로그인할 수 있도록 키값을 등록해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "간편로그인 설정",
    previewRows: ["카카오 REST API 키: ****", "네이버 Client ID: ****"],
  },
  {
    id: 8,
    title: "알림톡 등록하기",
    description: "카카오 비즈니스 채널 개설 및 심사 완료 후 채널을 등록해 주세요.",
    duration: "약 10분이면 완료 (채널 심사 대기 별도)",
    previewTitle: "알림톡 채널 연동",
    previewRows: ["카카오 채널 ID: @isumo_store"],
  },
  {
    id: 9,
    title: "SEO 설정하기",
    description: "검색 유입을 높이기 위한 페이지 제목, 설명, 키워드를 설정해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "SEO 설정",
    previewRows: ["페이지 제목: 이수모 스토어 - 베이직 캐주얼", "설명: 데일리룩 전문 쇼핑몰"],
  },
  {
    id: 10,
    title: "팝빌 신청하기",
    description: "무통장 입금을 자동으로 확인해주는 팝빌 서비스를 신청해 주세요.",
    duration: "약 2분이면 완료",
    previewTitle: "팝빌 연동 신청",
    previewRows: ["사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
  },
  {
    id: 15,
    title: "약관 확인하기",
    description: "쇼핑몰 이용약관과 개인정보처리방침 내용을 확인하고 필요한 부분을 수정해 주세요.",
    duration: "약 2분이면 완료",
    previewTitle: "약관 관리",
    previewRows: ["이용약관: 기본 템플릿 적용됨", "개인정보처리방침: 기본 템플릿 적용됨"],
    previewButton: "약관 확인하러 가기",
  },
  {
    id: 16,
    title: "보안설정하기",
    description: "관리자 계정 보안을 위한 2단계 인증, 로그인 기록 등을 설정해 주세요.",
    duration: "약 2분이면 완료",
    previewTitle: "보안 설정",
    previewRows: ["2단계 인증: 미설정", "로그인 알림: 미설정"],
    previewButton: "보안 설정하러 가기",
  },
  {
    id: 11,
    title: "CRM 캠페인 설정하기",
    description: "",
    duration: "약 5분이면 완료",
    previewTitle: "캠페인 빌더",
    previewRows: ["캠페인 유형: 신규가입 웰컴", "발송시점: 가입 직후"],
  },
  {
    id: 12,
    title: "라이브커머스 연동하기",
    description: "실시간 방송으로 상품을 판매할 수 있도록 라이브커머스 기능을 연동해 주세요.",
    duration: "약 4분이면 완료",
    previewTitle: "라이브 설정",
    previewRows: ["방송 채널: 미연동", "판매 상품: 미지정"],
  },
];

const categories: CategoryData[] = [
  { name: "결제 준비", itemIds: [1, 14, 2, 3, 4, 5] },
  { name: "운영 필수 정보", itemIds: [6, 7, 8] },
  { name: "권장 설정 기능", itemIds: [9, 10, 15, 16] },
  { name: "매출 확장 기능", itemIds: [11, 12] },
];

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--accent-text)" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemCircle({ active }: { active: boolean }) {
  return (
    <span
      className="h-3.5 w-3.5 shrink-0 rounded-full border"
      style={{ borderColor: active ? "var(--accent)" : "var(--border)" }}
    />
  );
}

function RequiredMark() {
  return <span className="mr-1 text-[var(--success)]">✔</span>;
}

function WarningIcon() {
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
      <path d="M12 3L22 20H2L12 3Z" strokeLinejoin="round" />
      <path d="M12 9.5V14" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="0.6" fill="var(--accent)" stroke="none" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] px-3 py-2 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

const cellFieldClass =
  "w-full rounded-md border border-[var(--border)] bg-white px-2 py-1.5 text-[12px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

const primaryButtonClass =
  "rounded-md bg-[var(--cta)] px-4 py-2 text-[13px] font-medium text-white";

const secondaryButtonClass =
  "rounded-md border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]";

function DragHandleIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="var(--border)">
      <circle cx="5" cy="3" r="1.2" />
      <circle cx="11" cy="3" r="1.2" />
      <circle cx="5" cy="8" r="1.2" />
      <circle cx="11" cy="8" r="1.2" />
      <circle cx="5" cy="13" r="1.2" />
      <circle cx="11" cy="13" r="1.2" />
    </svg>
  );
}

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
  const [bizType, setBizType] = useState("법인사업자");
  const [salesReport, setSalesReport] = useState("비대상");

  return (
    <div className="mt-6 w-full max-w-[600px]">
      <div className="mt-4 space-y-6">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">사업자 구분</p>
          <div className="flex items-center gap-4">
            {["개인사업자", "법인사업자", "개인"].map((label) => (
              <RadioOption
                key={label}
                name="bizType"
                label={label}
                checked={bizType === label}
                onChange={() => setBizType(label)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">상호명</p>
          <input type="text" placeholder="상호명 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">대표자 성함</p>
          <input type="text" placeholder="성함 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">사업자등록번호</p>
          <input type="text" placeholder="사업자등록번호 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">업태/업종</p>
          <div className="flex gap-2">
            <input type="text" placeholder="업태 입력" className={inputClass} />
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
          <div
            className="mt-2 flex items-start gap-2 rounded-lg px-3.5 py-3"
            style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
          >
            <WarningIcon />
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

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">대표 팩스번호</p>
          <input type="text" placeholder="연락처 입력" className={inputClass} />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-6 py-2.5 text-[13px] text-[var(--text-muted)]"
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="rounded-md bg-[var(--cta)] px-6 py-2.5 text-[13px] font-medium text-white"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

function CashDepositForm() {
  const [methodEnabled, setMethodEnabled] = useState(false);
  const [methodName, setMethodName] = useState("무통장입금");
  const [hideBenefit, setHideBenefit] = useState(false);

  return (
    <div className="mt-6 w-full max-w-[760px]">
      <div className="flex items-end gap-2">
        <select className={`${cellFieldClass} flex-1`} defaultValue="">
          <option value="" disabled>
            은행선택
          </option>
        </select>
        <input type="text" placeholder="계좌번호 입력" className={`${cellFieldClass} flex-1`} />
        <input type="text" placeholder="예금주 입력" className={`${cellFieldClass} flex-1`} />
        <button type="button" className={`shrink-0 ${primaryButtonClass}`}>
          등록
        </button>
      </div>

      <div className="mt-8 border-t border-[var(--divider)] pt-6">
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">결제수단 설정</p>

        <div className="mt-4 border-t border-[var(--divider)]" />

        <div className="mt-4 overflow-x-auto rounded-md border border-[var(--border)]">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-[var(--divider)] bg-[var(--surface-1)] text-[var(--text-muted)]">
                <th className="px-3 py-2 font-medium" />
                <th className="whitespace-nowrap px-3 py-2 font-medium">노출 순서</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">사용여부</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">결제수단 명칭</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">혜택 노출</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">수수료</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 text-[var(--border)]">
                  <DragHandleIcon />
                </td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">1</td>
                <td className="px-3 py-2">
                  <ToggleSwitch checked={methodEnabled} onChange={() => setMethodEnabled((v) => !v)} />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={methodName}
                      maxLength={12}
                      onChange={(e) => setMethodName(e.target.value.slice(0, 12))}
                      className={`${cellFieldClass} w-28`}
                    />
                    <span className="whitespace-nowrap text-[11px] text-[var(--text-muted)]">
                      {methodName.length}/12
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <label className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-[var(--text-secondary)]">
                    <input
                      type="checkbox"
                      checked={hideBenefit}
                      onChange={() => setHideBenefit((v) => !v)}
                      className="h-3.5 w-3.5 accent-[var(--accent-text)]"
                    />
                    주문시 입금통장 미노출
                  </label>
                </td>
                <td className="px-3 py-2 text-[var(--text-muted)]">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="rounded-md px-5 py-2 text-[13px] text-white"
            style={{ backgroundColor: "#2C2C2A" }}
          >
            등록
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-6 py-2.5 text-[13px] text-[var(--text-muted)]"
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="rounded-md px-[28px] py-[10px] text-[13px]"
          style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
        >
          더 알아보기
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
    <div className="mt-6 w-full max-w-[560px]">
      <div className="space-y-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
        <p>· 등록 시 업체명, 이메일은 필수 입력 사항입니다. 정산메일 발송 시엔 담당자 정보까지 입력해야 합니다.</p>
        <p>· 등록된 공급사 삭제 시 원복 불가합니다.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <SupplierField label="업체명" placeholder="업체명 입력" />
        <SupplierField label="이메일" placeholder="이메일 입력" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <SupplierField label="담당자" placeholder="담당자명 입력" />
        <SupplierField label="담당자 연락처" placeholder="연락처 입력" />
        <SupplierField label="담당자 SMS발송번호" placeholder="SMS발송번호 입력" />
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          className="rounded-md px-8 py-[10px] text-[13px] text-white"
          style={{ backgroundColor: "#2C2C2A" }}
        >
          등록
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-md px-[28px] py-[10px] text-[13px]"
            style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
          >
            건너뛰기
          </button>
          <button
            type="button"
            className="rounded-md px-[28px] py-[10px] text-[13px]"
            style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
          >
            더 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}

function PhoneNumberForm() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="mt-6 w-full max-w-[560px]">
      <div className="flex items-center gap-4">
        <span className="flex shrink-0 items-center text-[12px] text-[var(--text-primary)]">
          <RequiredMark />
          고객센터 전화
        </span>
        <ToggleSwitch checked={enabled} onChange={() => setEnabled((v) => !v)} />
        <input
          type="text"
          placeholder="유선번호 입력"
          className="flex-1 rounded-md border border-[var(--border)] px-3 py-[9px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]"
        />
      </div>

      <p className="mt-2 text-[11px] text-[var(--text-muted)]">
        ⓘ 쇼핑몰 하단 고객센터 안내 영역에 전화번호 및 전화문의 버튼을 노출할 수 있습니다.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md px-6 py-2.5 text-[13px]"
          style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="rounded-md px-6 py-2.5 text-[13px] text-white"
          style={{ backgroundColor: "#2C2C2A" }}
        >
          저장하기
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
    <div className="mt-6 w-full max-w-[480px]">
      <div
        className="flex items-start gap-2 rounded-lg px-3.5 py-3"
        style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
      >
        <WarningIcon />
        <p className="text-[12px] leading-relaxed text-[var(--accent-text)]">
          <span className="font-semibold">선택하신 카테고리에 맞춰 샘플 상품 3개가 이미 등록되어 있어요.</span>
          <br />
          아래에서 확인하고, <span className="font-semibold">실제 판매하실 상품으로 수정</span>해 주세요.
        </p>
      </div>

      <div className="mt-4">
        {sampleProducts.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 border-b border-[var(--divider)] py-3 last:border-0"
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

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md px-6 py-2.5 text-[13px]"
          style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-6 py-2.5 text-[13px] font-medium text-white"
          style={{ backgroundColor: "#2C2C2A" }}
        >
          상품 목록으로
          <ExternalLinkIcon />
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

interface EasyPayItem {
  name: string;
  desc: string;
}

const contractPayments: EasyPayItem[] = [
  { name: "네이버페이", desc: "" },
  { name: "카카오페이", desc: "" },
  { name: "토스페이", desc: "" },
  { name: "내통장 바로결제", desc: "" },
];

function PgApplicationForm() {
  const [selectedPg, setSelectedPg] = useState("EasyPAY");

  return (
    <div className="mt-6 w-full max-w-[640px]">
      <div>
        <p className="text-[12px] font-semibold text-[var(--text-primary)]">PG사를 선택해 주세요</p>
        <div className="mt-2">
          {pgOptions.map((option) => {
            const checked = selectedPg === option.name;
            return (
              <div key={option.name} className="border-b border-[var(--divider)] last:border-0">
                <div className="flex items-center justify-between gap-3 py-3">
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
                  <button
                    type="button"
                    className="shrink-0 rounded-md px-3 py-[5px] text-[10px] font-medium text-white"
                    style={{ backgroundColor: "#2C2C2A" }}
                  >
                    신청하기
                  </button>
                </div>
                {checked && option.detailItems ? (
                  <div
                    className="mb-3 ml-[25px] rounded-lg px-3.5 py-3"
                    style={{ backgroundColor: "#FBEAF0" }}
                  >
                    <p className="text-[11px] font-bold" style={{ color: "#993556" }}>
                      {option.name} 상세정보
                    </p>
                    <div className="mt-1 text-[10.5px]" style={{ color: "#7A2438", lineHeight: 2 }}>
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
      </div>

      <div className="mt-6">
        <p className="text-[12px] font-semibold text-[var(--text-primary)]">
          별도 계약이 필요한 간편결제 (선택)
        </p>
        <p className="mt-1 text-[11px] text-[var(--text-muted)]">
          아래 결제수단은 PG와 별개로 각 서비스사와 직접 계약을 진행해야 해요.
        </p>
        <div className="mt-2">
          {contractPayments.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 border-b border-[var(--divider)] py-3 last:border-0"
            >
              <span className="w-[110px] shrink-0">
                <BrandWordmark brand={item.name} />
              </span>
              <span className="flex-1 text-[11px] text-[var(--text-muted)]">{item.desc}</span>
              <button type="button" className={`shrink-0 ${secondaryButtonClass}`}>
                신청하기
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[12px] font-semibold text-[var(--text-primary)]">PG 연동 간편결제 서비스</p>
        <div
          className="mt-2 flex items-center gap-2 rounded-lg px-3.5 py-3"
          style={{ backgroundColor: "#FAF9F5" }}
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
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-6 py-2.5 text-[13px] text-[var(--text-muted)]"
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="rounded-md px-[28px] py-[10px] text-[13px]"
          style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
        >
          더 알아보기
        </button>
      </div>
    </div>
  );
}

const crmActionButtonClass =
  "shrink-0 whitespace-nowrap rounded-[5px] px-5 py-[5px] text-[13px] font-medium text-white";

function CampaignSettingsForm() {
  const [rejectionType, setRejectionType] = useState("신규");

  return (
    <div className="mt-6 w-full max-w-[760px]">
      <div className="flex items-center gap-2">
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">기본 설정</p>
        <span className="text-[11px]" style={{ color: "#639922" }}>
          ✔ 표시 필수항목
        </span>
      </div>

      <div className="mt-3 space-y-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
        <p>
          · 기존에 쇼핑몰 운영을 위한 SMS/알림톡 설정을 완료하셨더라도 CRM 기능을 이용하시려면 무료
          수신거부번호와 카카오톡 채널을 반드시 등록해 주세요.
        </p>
        <p>· 수신거부를 신청한 고객의 휴대폰 번호는 신청 일의 다음 날부터 수신거부 처리가 적용됩니다.</p>
      </div>

      <div className="mt-4 border-t border-[var(--divider)]" />

      <div className="mt-4 flex flex-nowrap items-center gap-4">
        <span className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium text-[var(--text-primary)]">
          <RequiredMark />
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
        <button type="button" className={crmActionButtonClass} style={{ backgroundColor: "#5F5E5A" }}>
          신청 &gt;
        </button>
      </div>

      <div className="mt-4 flex flex-nowrap items-center gap-4">
        <span className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium text-[var(--text-primary)]">
          <RequiredMark />
          카카오톡 채널
        </span>
        <button type="button" className={crmActionButtonClass} style={{ backgroundColor: "#5F5E5A" }}>
          등록 &gt;
        </button>
        <p className="text-[10px] text-[var(--text-muted)]">
          ⓘ 카카오톡 채널 등록이 완료되면 자동으로 알림톡 템플릿 승인 요청이 진행됩니다. 승인 절차가
          완료된 후에 메시지 캠페인을 발행할 수 있습니다. (영업일 기준 최대 3일 소요)
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md px-6 py-2.5 text-[13px]"
          style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="rounded-md px-6 py-2.5 text-[13px]"
          style={{ border: "1px solid #D3D1C7", color: "#5F5E5A" }}
        >
          더 알아보기
        </button>
      </div>
    </div>
  );
}

export default function ChecklistPanel() {
  const [selectedId, setSelectedId] = useState(1);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <div className="flex w-full items-stretch bg-white">
      <div className="w-[300px] shrink-0 bg-[var(--surface-1)] p-5">
          {categories.map((category) => (
            <div key={category.name} className="mb-5 last:mb-0">
              <p className="text-[13px] font-semibold text-[var(--text-primary)]">{category.name}</p>
              <div className="mt-2 h-1 w-full rounded-full bg-[var(--divider)]">
                <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: "0%" }} />
              </div>
              <p className="mt-1 text-[11px] text-[var(--text-muted)]">
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
                      <ItemCircle active={active} />
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-6">
          <div className="pr-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--text-muted)]">전체 진행률</span>
              <span className="text-[12px] text-[var(--text-muted)]">0/15개 · 0%</span>
            </div>
            <div className="mt-1.5 h-[5px] w-full rounded-full bg-[var(--divider)]">
              <div className="h-[5px] rounded-full bg-[var(--accent)]" style={{ width: "0%" }} />
            </div>
          </div>

          <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent-bg)] px-3 py-1.5 text-[13px] font-semibold text-[var(--accent-text)]">
            <ClockIcon />
            {selected.duration}
          </div>

          {selected.id === 2 && (
            <div
              className="mt-3 flex items-start gap-2 rounded-lg px-3.5 py-3"
              style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              <WarningIcon />
              <p className="text-[12px] leading-relaxed text-[var(--accent-text)]">
                <span className="font-semibold">자체적으로 배송하고 계신다면 별도의 공급사가 없어도 괜찮아요.</span>
                <br />
                이 경우엔 <span className="font-semibold">내 사업자 정보를 그대로 입력</span>하시면 됩니다.
              </p>
            </div>
          )}

          <h2 className="mt-3 text-[16px] font-semibold text-[var(--text-primary)]">{selected.title}</h2>
          {selected.description && (
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">{selected.description}</p>
          )}

          {selected.id === 5 ? (
            <BusinessInfoForm />
          ) : selected.id === 14 ? (
            <CashDepositForm />
          ) : selected.id === 2 ? (
            <SupplierListForm />
          ) : selected.id === 1 ? (
            <PgApplicationForm />
          ) : selected.id === 3 ? (
            <ProductSampleForm />
          ) : selected.id === 4 ? (
            <PhoneNumberForm />
          ) : selected.id === 11 ? (
            <CampaignSettingsForm />
          ) : (
            <div className="mt-4 w-[180px] rounded-[10px] border border-[var(--border)] bg-[var(--surface-1)] p-3 text-left">
              <p className="text-[11px] font-semibold text-[var(--text-primary)]">{selected.previewTitle}</p>
              <div className="mt-1.5 space-y-1">
                {selected.previewRows.map((row) => (
                  <p key={row} className="text-[11px] leading-snug text-[var(--text-muted)]">
                    {row}
                  </p>
                ))}
              </div>
              {selected.previewButton ? (
                <button type="button" className={`mt-3 w-full ${secondaryButtonClass}`}>
                  {selected.previewButton}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
  );
}
