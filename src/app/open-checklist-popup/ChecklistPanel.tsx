"use client";

import { useState } from "react";

interface ChecklistItemData {
  id: number;
  title: string;
  description: string;
  duration: string;
  previewTitle: string;
  previewRows: string[];
}

interface CategoryData {
  name: string;
  itemIds: number[];
}

const items: ChecklistItemData[] = [
  {
    id: 1,
    title: "PG 신청하기",
    description: "결제대행사(PG) 신청을 진행해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "PG 계약 정보 입력",
    previewRows: ["상호명: 이수모 스토어", "사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
  },
  {
    id: 14,
    title: "무통장입금 계좌 정보 입력하기",
    description: "무통장 입금 시 사용할 정산계좌 정보를 입력해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "무통장입금 계좌 정보",
    previewRows: ["은행: 신한은행", "계좌번호: 110-123-456789", "예금주: 이수모"],
  },
  {
    id: 2,
    title: "공급사 등록하기",
    description:
      "상품을 공급받을 업체 정보를 등록해 주세요. 자체배송인 경우 사업자 정보로 등록하면 됩니다.",
    duration: "약 2분이면 완료",
    previewTitle: "공급사 정보 입력",
    previewRows: ["공급사명: (주)이수모상사", "담당자: 김담당", "연락처: 02-123-4567"],
  },
  {
    id: 3,
    title: "상품 등록하기",
    description: "판매할 상품을 3개 이상 등록해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "상품 등록",
    previewRows: ["상품명: 베이직 티셔츠", "가격: 19,900원", "재고: 100개"],
  },
  {
    id: 4,
    title: "유선번호 등록하기",
    description: "고객 문의용 유선번호를 입력해 주세요.",
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
    id: 11,
    title: "CRM 캠페인 설정하기",
    description: "고객 대상 알림톡·문자 캠페인을 설정해 주세요.",
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
  {
    id: 13,
    title: "디자인 설정하기",
    description: "선택한 템플릿의 색상, 폰트, 배너 등을 원하는 대로 꾸며주세요.",
    duration: "약 10분이면 완료",
    previewTitle: "디자인 편집",
    previewRows: ["테마 색상: 기본", "로고: 미등록", "메인 배너: 미등록"],
  },
];

const categories: CategoryData[] = [
  { name: "결제 준비", itemIds: [1, 14, 2, 3, 4, 5] },
  { name: "운영 필수 정보", itemIds: [6, 7, 8] },
  { name: "권장 설정 기능", itemIds: [9, 10] },
  { name: "매출 확장 기능", itemIds: [11, 12, 13] },
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
    <div className="mt-4 w-full max-w-[600px]">
      <div className="flex items-center gap-2">
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">사업자 정보</p>
        <span className="text-[11px] text-[var(--success)]">✔ 표시 필수항목</span>
      </div>

      <div className="mt-5 space-y-4">
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
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            상호명
          </p>
          <input type="text" placeholder="상호명 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            대표자 성함
          </p>
          <input type="text" placeholder="성함 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            사업자등록번호
          </p>
          <input type="text" placeholder="사업자등록번호 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            업태/업종
          </p>
          <div className="flex gap-2">
            <input type="text" placeholder="업태 입력" className={inputClass} />
            <input type="text" placeholder="업종 입력" className={inputClass} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            통신판매신고번호
          </p>
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
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            주소
          </p>
          <div className="flex gap-2">
            <input type="text" placeholder="우편번호" className={inputClass} />
            <button
              type="button"
              className="shrink-0 rounded-md bg-[var(--accent-soft-bg)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)]"
            >
              우편번호 찾기
            </button>
          </div>
          <div className="mt-2 space-y-2">
            <input type="text" placeholder="기본주소" className={inputClass} />
            <input type="text" placeholder="상세주소" className={inputClass} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            대표 전화번호
          </p>
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
          <p className="mb-1.5 text-[13px] font-medium text-[var(--text-primary)]">
            <RequiredMark />
            대표 팩스번호
          </p>
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
  const [primaryAccount, setPrimaryAccount] = useState(false);
  const [visibility, setVisibility] = useState("");
  const [methodEnabled, setMethodEnabled] = useState(true);
  const [methodName, setMethodName] = useState("무통장입금");
  const [hideBenefit, setHideBenefit] = useState(false);

  return (
    <div className="mt-4 w-full max-w-[760px]">
      <p className="text-[16px] font-semibold text-[var(--text-primary)]">무통장입금 설정</p>
      <div className="mt-3 border-t border-[var(--divider)]" />

      <div className="mt-4 flex items-end gap-2">
        <select className={`${cellFieldClass} flex-1`} defaultValue="">
          <option value="" disabled>
            은행선택
          </option>
        </select>
        <input type="text" placeholder="계좌번호 입력" className={`${cellFieldClass} flex-1`} />
        <input type="text" placeholder="예금주 입력" className={`${cellFieldClass} flex-1`} />
        <button
          type="button"
          className="shrink-0 rounded-md bg-[var(--accent-soft-bg)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)]"
        >
          등록
        </button>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-[13px] font-medium text-[var(--text-primary)]">무통장 입금계좌</p>
        <div className="overflow-x-auto rounded-md border border-[var(--border)]">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-[var(--divider)] bg-[var(--surface-1)] text-[var(--text-muted)]">
                <th className="whitespace-nowrap px-3 py-2 font-medium">대표계좌</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">은행명</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">계좌번호</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">예금주</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">자동입금알림</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">노출여부</th>
                <th className="whitespace-nowrap px-3 py-2 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">
                  <input
                    type="radio"
                    name="primaryAccount"
                    checked={primaryAccount}
                    onChange={() => setPrimaryAccount(true)}
                    className="h-3.5 w-3.5 accent-[var(--accent-text)]"
                  />
                </td>
                <td className="px-3 py-2">
                  <select className={`${cellFieldClass} min-w-[110px]`} defaultValue="">
                    <option value="" disabled>
                      은행선택
                    </option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input type="text" placeholder="계좌번호 입력" className={`${cellFieldClass} min-w-[130px]`} />
                </td>
                <td className="px-3 py-2">
                  <input type="text" placeholder="예금주 입력" className={`${cellFieldClass} min-w-[100px]`} />
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-md bg-[var(--accent)] px-3 py-1.5 text-[13px] font-medium text-white"
                  >
                    자동입금확인 연동
                  </button>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <RadioOption
                      name="visibility"
                      label="보임"
                      checked={visibility === "보임"}
                      onChange={() => setVisibility("보임")}
                    />
                    <RadioOption
                      name="visibility"
                      label="숨김"
                      checked={visibility === "숨김"}
                      onChange={() => setVisibility("숨김")}
                    />
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      className="whitespace-nowrap rounded-md border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]"
                    >
                      적용
                    </button>
                    <button
                      type="button"
                      className="whitespace-nowrap rounded-md bg-[var(--accent)] px-3 py-1.5 text-[13px] font-medium text-white"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

function BulkChangeButton() {
  return (
    <button
      type="button"
      className="rounded border border-[var(--border)] bg-white px-2 py-0.5 text-[13px] font-medium text-[var(--text-secondary)]"
    >
      일괄변경
    </button>
  );
}

function SupplierListForm() {
  const [smsConsent, setSmsConsent] = useState(false);
  const [rowSelected, setRowSelected] = useState(false);
  const [excelDownloadType, setExcelDownloadType] = useState("옵션별 엑셀내려받기");
  const [excelGenerateType, setExcelGenerateType] = useState("상품별 파일");

  return (
    <div className="mt-4 w-full">
      <p className="text-[16px] font-semibold text-[var(--text-primary)]">공급사 리스트</p>

      <div
        className="mt-3 flex items-start gap-2 rounded-lg px-4 py-3.5"
        style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
      >
        <WarningIcon />
        <p className="text-[12px] leading-relaxed text-[var(--accent-text)]">
          <span className="font-semibold">자체적으로 배송하고 계신다면 별도의 공급사가 없어도 괜찮아요.</span>
          <br />
          이 경우엔 <span className="font-semibold">내 사업자 정보를 그대로 입력</span>하시면 됩니다.
        </p>
      </div>

      <div className="mt-3 space-y-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
        <p>· 등록 시 업체명, 이메일은 필수 입력 사항입니다. 정산메일 발송 시엔 담당자 정보까지 입력해야 합니다.</p>
        <p>· 등록된 공급사 삭제 시 원복 불가합니다.</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[var(--text-secondary)]">선택한 공급사</span>
          <button
            type="button"
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-[13px] font-medium text-white"
          >
            삭제
          </button>
        </div>
        <button
          type="button"
          className="rounded-md bg-[var(--cta)] px-4 py-2 text-[13px] font-medium text-white"
        >
          공급사 등록 +
        </button>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-[var(--border)]">
        <table className="w-full text-left text-[12px]" style={{ minWidth: "1500px" }}>
          <thead>
            <tr className="border-b border-[var(--divider)] bg-[var(--surface-1)] text-[var(--text-muted)]">
              <th className="px-3 py-2 font-medium" style={{ minWidth: "40px" }} />
              <th className="px-3 py-2 font-medium" style={{ minWidth: "50px" }}>
                순서
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "160px" }}>
                업체명 · 메모(검색용)
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "180px" }}>
                사업자등록번호 · 공급사 주소 · SMS 수신동의
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "160px" }}>
                담당자 · 연락처 · SMS발송번호
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "180px" }}>
                이메일 · CS이메일 · 정산 이메일
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "170px" }}>
                <div className="flex flex-col items-start gap-1">
                  <span>엑셀 다운로드 형식</span>
                  <BulkChangeButton />
                </div>
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "170px" }}>
                <div className="flex flex-col items-start gap-1">
                  <span>발주서 엑셀 양식</span>
                  <BulkChangeButton />
                </div>
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "180px" }}>
                <div className="flex flex-col items-start gap-1">
                  <span>엑셀 생성방식</span>
                  <BulkChangeButton />
                </div>
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "150px" }}>
                거래처 비밀번호
              </th>
              <th className="px-3 py-2 font-medium" style={{ minWidth: "100px" }}>
                관리
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 align-top">
                <input
                  type="checkbox"
                  checked={rowSelected}
                  onChange={() => setRowSelected((v) => !v)}
                  className="h-3.5 w-3.5 accent-[var(--accent-text)]"
                />
              </td>
              <td className="px-3 py-2 align-top text-[var(--text-secondary)]">1</td>
              <td className="px-3 py-2 align-top">
                <div className="space-y-2">
                  <input type="text" placeholder="업체명 입력" className={cellFieldClass} />
                  <input type="text" placeholder="메모(검색용) 입력" className={cellFieldClass} />
                </div>
              </td>
              <td className="px-3 py-2 align-top">
                <div className="space-y-2">
                  <input type="text" placeholder="사업자등록번호 입력" className={cellFieldClass} />
                  <input type="text" placeholder="공급사 주소 입력" className={cellFieldClass} />
                  <label className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-[var(--text-secondary)]">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={() => setSmsConsent((v) => !v)}
                      className="h-3.5 w-3.5 accent-[var(--accent-text)]"
                    />
                    SMS 수신동의
                  </label>
                </div>
              </td>
              <td className="px-3 py-2 align-top">
                <div className="space-y-2">
                  <input type="text" placeholder="담당자명 입력" className={cellFieldClass} />
                  <input type="text" placeholder="연락처 입력" className={cellFieldClass} />
                  <input type="text" placeholder="SMS 연락처 입력" className={cellFieldClass} />
                </div>
              </td>
              <td className="px-3 py-2 align-top">
                <div className="space-y-2">
                  <input type="text" placeholder="이메일 입력" className={cellFieldClass} />
                  <input type="text" placeholder="CS이메일 입력" className={cellFieldClass} />
                  <input type="text" placeholder="정산 이메일 입력" className={cellFieldClass} />
                  <p className="text-[11px] text-[var(--text-muted)]">콤마(,) 로 복수개 등록가능</p>
                </div>
              </td>
              <td className="px-3 py-2 align-top">
                <div className="flex flex-col gap-1.5">
                  {["옵션별 엑셀내려받기", "일반 엑셀내려받기"].map((label) => (
                    <RadioOption
                      key={label}
                      name="excelDownloadType"
                      label={label}
                      checked={excelDownloadType === label}
                      onChange={() => setExcelDownloadType(label)}
                    />
                  ))}
                </div>
              </td>
              <td className="px-3 py-2 align-top">
                <select className={cellFieldClass} defaultValue="발주서 엑셀 기본 양식">
                  <option>발주서 엑셀 기본 양식</option>
                </select>
              </td>
              <td className="px-3 py-2 align-top">
                <div className="flex flex-col gap-1.5">
                  {["단일 파일", "상품별 파일", "단일_상품코드 파일", "단일_공급사 파일"].map((label) => (
                    <RadioOption
                      key={label}
                      name="excelGenerateType"
                      label={label}
                      checked={excelGenerateType === label}
                      onChange={() => setExcelGenerateType(label)}
                    />
                  ))}
                </div>
              </td>
              <td className="px-3 py-2 align-top">
                <input type="password" placeholder="비밀번호 입력" className={cellFieldClass} />
              </td>
              <td className="px-3 py-2 align-top">
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-md bg-[var(--accent-soft-bg)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]"
                  >
                    등록
                  </button>
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-md bg-[var(--accent)] px-3 py-1.5 text-[11px] font-medium text-white"
                  >
                    닫기
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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

        <div className="flex flex-1 flex-col p-6">
          <div className="pr-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--text-muted)]">전체 진행률</span>
              <span className="text-[12px] text-[var(--text-muted)]">0/14개 · 0%</span>
            </div>
            <div className="mt-1.5 h-[5px] w-full rounded-full bg-[var(--divider)]">
              <div className="h-[5px] rounded-full bg-[var(--accent)]" style={{ width: "0%" }} />
            </div>
          </div>

          <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent-bg)] px-3 py-1.5 text-[13px] font-semibold text-[var(--accent-text)]">
            <ClockIcon />
            {selected.duration}
          </div>

          {selected.id === 14 && (
            <div
              className="mt-3 flex items-start gap-2 rounded-lg px-3.5 py-3"
              style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              <WarningIcon />
              <p className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
                PG 설정이 완료되지 않았습니다.{" "}
                <span className="font-semibold text-[var(--accent)] underline underline-offset-2">
                  PG 서비스 신청
                </span>
                을 먼저 진행해 주세요.
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
            </div>
          )}
        </div>
      </div>
  );
}
