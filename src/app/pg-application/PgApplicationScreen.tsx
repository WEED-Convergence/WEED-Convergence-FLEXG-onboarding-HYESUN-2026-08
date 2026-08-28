"use client";

import { useState } from "react";

function RequiredMark() {
  return <span className="ml-0.5 text-[var(--accent)]">*</span>;
}

function SectionTitle({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-[3px] shrink-0" style={{ height: 15, backgroundColor: "var(--accent)", borderRadius: 2 }} />
      <p className="text-[14px] font-bold text-[var(--text-primary)]">
        {children}
        {required ? <RequiredMark /> : null}
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-[7px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)] disabled:bg-[var(--surface-1)] disabled:text-[var(--text-muted)]";

const primaryButtonClass = "rounded-[8px] bg-[var(--cta)] px-[28px] py-[10px] text-[13px] font-medium text-white";

const secondaryButtonClass =
  "rounded-[8px] border border-[var(--border)] px-[28px] py-[10px] text-[13px] font-medium text-[var(--text-secondary)]";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5L19 19M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="1.8">
      <path d="M6 3h9l3 3v15H6z" strokeLinejoin="round" />
      <path d="M15 3v3h3" strokeLinejoin="round" />
    </svg>
  );
}

interface FieldCellProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldCell({ label, required, children }: FieldCellProps) {
  return (
    <div className="flex items-stretch">
      <div
        className="flex w-[140px] shrink-0 items-center bg-[var(--surface-1)] px-4 py-3 text-[13px] font-medium text-[var(--text-primary)]"
        style={{ wordBreak: "keep-all" }}
      >
        {label}
        {required ? <RequiredMark /> : null}
      </div>
      <div className="flex flex-1 items-center px-4 py-2.5">{children}</div>
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-b border-[var(--border)] last:border-b-0">
      {children}
    </div>
  );
}

interface PaymentOption {
  id: string;
  name: string;
  badgeColor: string;
  feeLines: string[];
  tags?: string[];
  note?: string;
}

const generalPayments: PaymentOption[] = [
  {
    id: "card",
    name: "신용카드",
    badgeColor: "#2C2C2A",
    feeLines: ["수수료 3.3%", "정산 일할(+5일)"],
    tags: ["에스크로 제공(수수료 면제)", "부분취소 사용"],
  },
  {
    id: "vbank",
    name: "가상계좌",
    badgeColor: "#378ADD",
    feeLines: ["수수료 건당 300원", "정산 일할(+5일)"],
    tags: ["에스크로 제공(수수료 면제)"],
  },
  {
    id: "mobile",
    name: "휴대폰",
    badgeColor: "#639922",
    feeLines: ["수수료 4.5%", "정산 주1회(수)"],
    note: "실물 배송 상품만 결제 가능",
  },
];

const easyPayments: PaymentOption[] = [
  {
    id: "kakaopay",
    name: "카카오페이",
    badgeColor: "#F2A623",
    feeLines: ["카드 3.3%", "머니 3.3%"],
    tags: ["부분취소 사용"],
  },
  {
    id: "payco",
    name: "PAYCO",
    badgeColor: "#D8342A",
    feeLines: ["카드 3.3%", "쿠폰/포인트 3.3%"],
    tags: ["부분취소 사용"],
  },
  {
    id: "applepay",
    name: "애플페이",
    badgeColor: "#2C2C2A",
    feeLines: ["수수료 3.3%"],
    tags: ["부분취소 사용"],
  },
];

function CheckBadge({ checked }: { checked: boolean }) {
  return (
    <span
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
      style={{
        backgroundColor: checked ? "var(--success)" : "var(--divider)",
        border: checked ? "none" : "1px solid var(--border)",
      }}
    >
      {checked ? (
        <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="white" strokeWidth="3.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  );
}

function PaymentGroup({
  title,
  options,
  selected,
  onToggle,
  onToggleAll,
}: {
  title: string;
  options: PaymentOption[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}) {
  const allSelected = options.every((o) => selected.has(o.id));

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[var(--text-primary)]">{title}</p>
        <button
          type="button"
          onClick={onToggleAll}
          className="flex items-center gap-1 text-[11px] font-medium text-[var(--text-secondary)]"
        >
          <CheckBadge checked={allSelected} />
          모두선택
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {options.map((option) => {
          const checked = selected.has(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className="flex flex-col items-start gap-2 rounded-[10px] px-3.5 py-3 text-left"
              style={{
                border: checked ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                backgroundColor: checked ? "var(--accent-bg)" : "var(--bg)",
              }}
            >
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: option.badgeColor }}
                  >
                    {option.name.slice(0, 1)}
                  </span>
                  <span className="text-[12.5px] font-semibold text-[var(--text-primary)]">{option.name}</span>
                </span>
                <CheckBadge checked={checked} />
              </div>
              <div className="space-y-0.5">
                {option.feeLines.map((line) => (
                  <p key={line} className="text-[10.5px] text-[var(--text-secondary)]">
                    {line}
                  </p>
                ))}
              </div>
              {option.tags ? (
                <div className="flex flex-wrap gap-1">
                  {option.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-1.5 py-[2px] text-[9.5px] font-medium"
                      style={{ backgroundColor: "var(--surface-1)", color: "var(--text-muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {option.note ? (
                <p className="text-[9.5px]" style={{ color: "var(--accent-text)" }}>
                  * {option.note}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TermRow {
  id: string;
  label: string;
}

const termRows: TermRow[] = [
  { id: "service", label: "이용약관 동의" },
  { id: "privacy", label: "개인정보 수집·이용 동의" },
  { id: "thirdParty", label: "제3자 정보제공 동의" },
];

export default function PgApplicationScreen() {
  const [companyName] = useState("테스트하는축구");
  const [businessNumber] = useState("1588601603");
  const [corpNumber, setCorpNumber] = useState("");
  const [ceoName, setCeoName] = useState("최혜선");
  const [birthDate, setBirthDate] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [address1, setAddress1] = useState("");
  const [managerName, setManagerName] = useState("테스트하는축구선수");
  const [managerPhone, setManagerPhone] = useState("");
  const [managerMobile, setManagerMobile] = useState("111111111");
  const [managerEmail, setManagerEmail] = useState("ABC111@itweed.net");

  const [selectedPayments, setSelectedPayments] = useState<Set<string>>(
    new Set([...generalPayments, ...easyPayments].map((o) => o.id))
  );
  const [terms, setTerms] = useState<Record<string, boolean>>({
    service: false,
    privacy: false,
    thirdParty: false,
  });

  const togglePayment = (id: string) => {
    setSelectedPayments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGroupAll = (options: PaymentOption[]) => {
    setSelectedPayments((prev) => {
      const next = new Set(prev);
      const allSelected = options.every((o) => next.has(o.id));
      options.forEach((o) => {
        if (allSelected) next.delete(o.id);
        else next.add(o.id);
      });
      return next;
    });
  };

  const allTermsChecked = termRows.every((t) => terms[t.id]);
  const toggleAllTerms = () => {
    const next = !allTermsChecked;
    setTerms(Object.fromEntries(termRows.map((t) => [t.id, next])));
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-[16px] font-semibold text-[var(--text-primary)]">
        PG사 신청<span className="ml-1 font-bold" style={{ color: "var(--accent)" }}>(작업중)</span>
      </h1>
      <div
        className="mb-5 flex items-start gap-2 rounded-lg px-3.5 py-3"
        style={{ border: "1.5px solid var(--accent)", backgroundColor: "var(--accent-bg)" }}
      >
        <p className="text-[12px] font-semibold leading-relaxed" style={{ color: "var(--accent)" }}>
          작업중 화면입니다. 아직 실제 데이터·PG사 연동이 이루어지지 않은 화면으로, 항목 구성과 배치는 협의에 따라
          변경될 수 있습니다.
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-[var(--border)]">
        <div className="flex items-center justify-between px-5 py-3.5" style={{ backgroundColor: "#1A1A1A" }}>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10">
              <DocIcon />
            </span>
            <span className="text-[14px] font-semibold text-white">PG사 신청</span>
          </div>
          <span className="flex h-6 w-6 items-center justify-center text-white/70">
            <CloseIcon />
          </span>
        </div>

        <div className="bg-[var(--bg)] px-6 py-6">
          <SectionTitle required>가맹점 정보</SectionTitle>

          <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
            <FieldRow>
              <FieldCell label="회사명" required>
                <input className={inputClass} value={companyName} disabled />
              </FieldCell>
              <FieldCell label="사업자번호" required>
                <input className={inputClass} value={businessNumber} disabled />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="법인등록번호">
                <input
                  className={inputClass}
                  value={corpNumber}
                  onChange={(e) => setCorpNumber(e.target.value)}
                  placeholder="법인등록번호를 입력해 주세요"
                />
              </FieldCell>
              <FieldCell label="대표자명" required>
                <input className={inputClass} value={ceoName} onChange={(e) => setCeoName(e.target.value)} />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="생년월일">
                <input
                  className={inputClass}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="YYMMDD"
                />
              </FieldCell>
              <FieldCell label="사업자 URL" required>
                <input
                  className={inputClass}
                  value={businessUrl}
                  onChange={(e) => setBusinessUrl(e.target.value)}
                  placeholder="https://"
                />
              </FieldCell>
            </FieldRow>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="주소1" required>
                <input
                  className={inputClass}
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="사업장 주소를 입력해 주세요"
                />
              </FieldCell>
            </div>
            <FieldRow>
              <FieldCell label="가맹점 담당자" required>
                <input className={inputClass} value={managerName} onChange={(e) => setManagerName(e.target.value)} />
              </FieldCell>
              <FieldCell label="가맹점 전화번호" required>
                <input
                  className={inputClass}
                  value={managerPhone}
                  onChange={(e) => setManagerPhone(e.target.value)}
                  placeholder="담당자 전화번호를 입력해 주세요"
                />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="가맹점 휴대폰번호" required>
                <input
                  className={inputClass}
                  value={managerMobile}
                  onChange={(e) => setManagerMobile(e.target.value)}
                />
              </FieldCell>
              <FieldCell label="가맹점 이메일" required>
                <input
                  className={inputClass}
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                />
              </FieldCell>
            </FieldRow>
          </div>

          <div
            className="mt-4 rounded-lg px-4 py-3.5"
            style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border)" }}
          >
            <p className="text-[12px] font-semibold text-[var(--text-primary)]">
              계약 관련 심사를 위한 구비서류 전달 (이메일 : pgch@kicc.co.kr)
            </p>
            <ul className="mt-2 space-y-0.5 text-[11px] text-[var(--text-secondary)]">
              <li>· 법인 : 법인등기부 등본, 사업자등록증</li>
              <li>· 개인 : 사업자등록증</li>
              <li>· 공통요청 내용 : 월 승인한도, 상호 영문명, 담당자 정보</li>
            </ul>
          </div>

          <div className="mt-7">
            <SectionTitle required>결제 서비스</SectionTitle>
            <p className="mt-1 text-[11.5px] text-[var(--text-muted)]">원하는 결제서비스를 선택해 주세요.</p>

            <PaymentGroup
              title="일반결제"
              options={generalPayments}
              selected={selectedPayments}
              onToggle={togglePayment}
              onToggleAll={() => toggleGroupAll(generalPayments)}
            />
            <PaymentGroup
              title="간편결제"
              options={easyPayments}
              selected={selectedPayments}
              onToggle={togglePayment}
              onToggleAll={() => toggleGroupAll(easyPayments)}
            />
          </div>

          <div className="mt-7">
            <SectionTitle required>약관 동의</SectionTitle>
            <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-1)] px-4 py-2.5">
                <label className="flex items-center gap-2 text-[12.5px] font-semibold text-[var(--text-primary)]">
                  <input
                    type="checkbox"
                    checked={allTermsChecked}
                    onChange={toggleAllTerms}
                    className="h-3.5 w-3.5 accent-[var(--accent)]"
                  />
                  전체 동의
                </label>
              </div>
              {termRows.map((term) => (
                <div key={term.id} className="flex items-center justify-between px-4 py-2.5">
                  <label className="flex items-center gap-2 text-[12.5px] text-[var(--text-primary)]">
                    <input
                      type="checkbox"
                      checked={!!terms[term.id]}
                      onChange={(e) => setTerms((prev) => ({ ...prev, [term.id]: e.target.checked }))}
                      className="h-3.5 w-3.5 accent-[var(--accent)]"
                    />
                    {term.label}
                    <RequiredMark />
                  </label>
                  <span className="text-[11px] text-[var(--text-muted)] underline">보기</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-[10px]">
            <button type="button" className={primaryButtonClass}>
              신청하기
            </button>
            <button type="button" className={secondaryButtonClass}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
