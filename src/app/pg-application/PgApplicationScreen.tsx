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

interface TermRow {
  id: string;
  label: string;
}

const termRows: TermRow[] = [
  { id: "first", label: "첫번째 약관 동의" },
  { id: "second", label: "두번째 약관 동의" },
  { id: "third", label: "세번째 약관 동의" },
];

const bankOptions = [
  "국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "농협은행",
  "기업은행",
  "카카오뱅크",
  "토스뱅크",
  "새마을금고",
  "우체국",
];

function SplitInput({
  values,
  onChange,
  segmentWidths,
  disabled,
}: {
  values: [string, string, string];
  onChange: (index: 0 | 1 | 2, value: string) => void;
  segmentWidths: [string, string, string];
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {([0, 1, 2] as const).map((idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <input
            className={`${inputClass} text-center`}
            style={{ width: segmentWidths[idx] }}
            value={values[idx]}
            onChange={(e) => onChange(idx, e.target.value)}
            disabled={disabled}
          />
          {idx < 2 ? <span className="text-[var(--text-muted)]">-</span> : null}
        </span>
      ))}
    </div>
  );
}

export default function PgApplicationScreen() {
  const [companyName, setCompanyName] = useState("테스트하는축구");
  const [businessNumber, setBusinessNumber] = useState("1588601603");
  const [ceoName, setCeoName] = useState("최혜선");
  const [businessUrl, setBusinessUrl] = useState("https://testfootball.flexg.co.kr");
  const [address1, setAddress1] = useState("서울특별시 금천구 벚꽃로 298 대륭포스트타워6차 313호");
  const [managerName, setManagerName] = useState("테스트하는축구선수");
  const [managerPhone, setManagerPhone] = useState("02-1234-5678");
  const [managerEmail, setManagerEmail] = useState("ABC111@itweed.net");
  const [bankName, setBankName] = useState("");

  const [terms, setTerms] = useState<Record<string, boolean>>({
    first: false,
    second: false,
    third: false,
  });

  const allTermsChecked = termRows.every((t) => terms[t.id]);
  const toggleAllTerms = () => {
    const next = !allTermsChecked;
    setTerms(Object.fromEntries(termRows.map((t) => [t.id, next])));
  };

  const [kcpMngNm, setKcpMngNm] = useState("테스트하는축구선수");
  const [kcpMngEmail, setKcpMngEmail] = useState("ABC111@itweed.net");
  const [kcpMngTel, setKcpMngTel] = useState<[string, string, string]>(["", "", ""]);
  const [kcpMngMob, setKcpMngMob] = useState<[string, string, string]>(["010", "1234", "5678"]);
  const [kcpZipCode, setKcpZipCode] = useState("06132");
  const [kcpAddr1, setKcpAddr1] = useState("서울특별시 강남구 테헤란로 123");
  const [kcpAddr2, setKcpAddr2] = useState("4층 401호");

  const [kcpCompName, setKcpCompName] = useState("테스트하는축구");
  const [kcpCompTaxNo, setKcpCompTaxNo] = useState("1588601603");
  const [kcpCompUrl, setKcpCompUrl] = useState("testfootball.flexg.co.kr");
  const [kcpCompOwnName, setKcpCompOwnName] = useState("최혜선");
  const [kcpCompOwnNo, setKcpCompOwnNo] = useState("");
  const [kcpCompOwnMob, setKcpCompOwnMob] = useState<[string, string, string]>(["", "", ""]);
  const [kcpCompEmail, setKcpCompEmail] = useState("ABC111@itweed.net");
  const [kcpCompTel, setKcpCompTel] = useState<[string, string, string]>(["02", "1234", "5678"]);
  const [kcpAgree, setKcpAgree] = useState(false);

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
            <span className="text-[14px] font-semibold text-white">NICEPAY 온보딩</span>
          </div>
          <span className="flex h-6 w-6 items-center justify-center text-white/70">
            <CloseIcon />
          </span>
        </div>

        <div className="bg-[var(--bg)] px-6 py-6">
          <SectionTitle required>가맹점 정보</SectionTitle>

          <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
            <FieldRow>
              <FieldCell label="상호명" required>
                <input className={inputClass} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </FieldCell>
              <FieldCell label="사업자번호" required>
                <input
                  className={inputClass}
                  value={businessNumber}
                  onChange={(e) => setBusinessNumber(e.target.value)}
                />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="대표자명" required>
                <input className={inputClass} value={ceoName} onChange={(e) => setCeoName(e.target.value)} />
              </FieldCell>
              <FieldCell label="사업자 URL" required>
                <input
                  className={inputClass}
                  value={businessUrl}
                  onChange={(e) => setBusinessUrl(e.target.value)}
                />
              </FieldCell>
            </FieldRow>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="주소" required>
                <input className={inputClass} value={address1} onChange={(e) => setAddress1(e.target.value)} />
              </FieldCell>
            </div>
            <FieldRow>
              <FieldCell label="가맹점 담당자" required>
                <input
                  className={inputClass}
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
              </FieldCell>
              <FieldCell label="가맹점 전화번호" required>
                <input
                  className={inputClass}
                  value={managerPhone}
                  onChange={(e) => setManagerPhone(e.target.value)}
                />
              </FieldCell>
            </FieldRow>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="가맹점 이메일" required>
                <input
                  className={inputClass}
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                />
              </FieldCell>
            </div>
            <div>
              <FieldCell label="은행">
                <select
                  className={inputClass}
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option value="">은행을 선택해주세요</option>
                  {bankOptions.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </FieldCell>
            </div>
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

      <div className="mt-8 w-full overflow-hidden rounded-xl border border-[var(--border)]">
        <div className="flex items-center justify-between px-5 py-3.5" style={{ backgroundColor: "#1A1A1A" }}>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10">
              <DocIcon />
            </span>
            <span className="text-[14px] font-semibold text-white">KCP 온보딩</span>
          </div>
          <span className="flex h-6 w-6 items-center justify-center text-white/70">
            <CloseIcon />
          </span>
        </div>

        <div className="bg-[var(--bg)] px-6 py-6">
          <SectionTitle required>가맹점 정보</SectionTitle>
          <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
            <FieldRow>
              <FieldCell label="상호명" required>
                <input
                  className={inputClass}
                  value={kcpCompName}
                  onChange={(e) => setKcpCompName(e.target.value)}
                />
              </FieldCell>
              <FieldCell label="사업자번호" required>
                <input
                  className={inputClass}
                  value={kcpCompTaxNo}
                  onChange={(e) => setKcpCompTaxNo(e.target.value)}
                />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="사이트URL" required>
                <input className={inputClass} value={kcpCompUrl} onChange={(e) => setKcpCompUrl(e.target.value)} />
              </FieldCell>
              <FieldCell label="대표자명" required>
                <input
                  className={inputClass}
                  value={kcpCompOwnName}
                  onChange={(e) => setKcpCompOwnName(e.target.value)}
                />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="대표자 생년월일" required>
                <input
                  className={inputClass}
                  value={kcpCompOwnNo}
                  onChange={(e) => setKcpCompOwnNo(e.target.value)}
                  placeholder="YYMMDD"
                />
              </FieldCell>
              <FieldCell label="대표자 휴대폰번호" required>
                <SplitInput
                  values={kcpCompOwnMob}
                  segmentWidths={["44px", "60px", "60px"]}
                  onChange={(idx, value) =>
                    setKcpCompOwnMob((prev) => {
                      const next: [string, string, string] = [...prev];
                      next[idx] = value;
                      return next;
                    })
                  }
                />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="대표 이메일" required>
                <input
                  className={inputClass}
                  type="email"
                  value={kcpCompEmail}
                  onChange={(e) => setKcpCompEmail(e.target.value)}
                />
              </FieldCell>
              <FieldCell label="업체 전화번호" required>
                <SplitInput
                  values={kcpCompTel}
                  segmentWidths={["44px", "60px", "60px"]}
                  onChange={(idx, value) =>
                    setKcpCompTel((prev) => {
                      const next: [string, string, string] = [...prev];
                      next[idx] = value;
                      return next;
                    })
                  }
                />
              </FieldCell>
            </FieldRow>
          </div>

          <div className="mt-7">
            <SectionTitle required>담당자 정보</SectionTitle>
            <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
              <FieldRow>
                <FieldCell label="담당자명" required>
                  <input className={inputClass} value={kcpMngNm} onChange={(e) => setKcpMngNm(e.target.value)} />
                </FieldCell>
                <FieldCell label="담당자 이메일" required>
                  <input
                    className={inputClass}
                    type="email"
                    value={kcpMngEmail}
                    onChange={(e) => setKcpMngEmail(e.target.value)}
                  />
                </FieldCell>
              </FieldRow>
              <FieldRow>
                <FieldCell label="담당자 전화번호" required>
                  <SplitInput
                    values={kcpMngTel}
                    segmentWidths={["44px", "60px", "60px"]}
                    onChange={(idx, value) =>
                      setKcpMngTel((prev) => {
                        const next: [string, string, string] = [...prev];
                        next[idx] = value;
                        return next;
                      })
                    }
                  />
                </FieldCell>
                <FieldCell label="담당자 휴대폰번호" required>
                  <SplitInput
                    values={kcpMngMob}
                    segmentWidths={["44px", "60px", "60px"]}
                    onChange={(idx, value) =>
                      setKcpMngMob((prev) => {
                        const next: [string, string, string] = [...prev];
                        next[idx] = value;
                        return next;
                      })
                    }
                  />
                </FieldCell>
              </FieldRow>
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>주소 정보</SectionTitle>
            <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
              <div>
                <FieldCell label="주소" required>
                  <div className="flex w-full items-center gap-1.5">
                    <input
                      className={inputClass}
                      style={{ flex: "0 0 100px" }}
                      value={kcpZipCode}
                      onChange={(e) => setKcpZipCode(e.target.value)}
                    />
                    <input
                      className={inputClass}
                      style={{ flex: "1 1 0%", minWidth: 0 }}
                      value={kcpAddr1}
                      onChange={(e) => setKcpAddr1(e.target.value)}
                    />
                    <input
                      className={inputClass}
                      style={{ flex: "1 1 0%", minWidth: 0 }}
                      value={kcpAddr2}
                      onChange={(e) => setKcpAddr2(e.target.value)}
                    />
                  </div>
                </FieldCell>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>개인정보 제공 동의</SectionTitle>
            <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between px-4 py-2.5">
                <label className="flex items-center gap-2 text-[12.5px] text-[var(--text-primary)]">
                  <input
                    type="checkbox"
                    checked={kcpAgree}
                    onChange={(e) => setKcpAgree(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[var(--accent)]"
                  />
                  KCP 개인정보 제공 동의
                  <RequiredMark />
                </label>
                <span className="text-[11px] text-[var(--text-muted)] underline">보기</span>
              </div>
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
