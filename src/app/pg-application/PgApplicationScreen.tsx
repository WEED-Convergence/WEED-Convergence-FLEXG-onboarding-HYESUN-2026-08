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

function YesNoToggle({
  name,
  value,
  onChange,
}: {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-5">
      <label className="flex items-center gap-1.5 text-[13px] text-[var(--text-primary)]">
        <input
          type="radio"
          name={name}
          checked={value}
          onChange={() => onChange(true)}
          className="h-3.5 w-3.5 accent-[var(--accent)]"
        />
        사용(Y)
      </label>
      <label className="flex items-center gap-1.5 text-[13px] text-[var(--text-primary)]">
        <input
          type="radio"
          name={name}
          checked={!value}
          onChange={() => onChange(false)}
          className="h-3.5 w-3.5 accent-[var(--accent)]"
        />
        미사용(N)
      </label>
    </div>
  );
}

function ToggleFieldRow({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 last:border-b-0">
      <span className="text-[13px] font-medium text-[var(--text-primary)]" style={{ wordBreak: "keep-all" }}>
        {label}
        <RequiredMark />
      </span>
      <YesNoToggle name={name} value={value} onChange={onChange} />
    </div>
  );
}

function SplitInput({
  values,
  onChange,
  segmentWidths,
}: {
  values: [string, string, string];
  onChange: (index: 0 | 1 | 2, value: string) => void;
  segmentWidths: [string, string, string];
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
          />
          {idx < 2 ? <span className="text-[var(--text-muted)]">-</span> : null}
        </span>
      ))}
    </div>
  );
}

export default function PgApplicationScreen() {
  const [companyName] = useState("테스트하는축구");
  const [businessNumber] = useState("1588601603");
  const [ceoName] = useState("최혜선");
  const [businessUrl] = useState("https://testfootball.flexg.co.kr");
  const [address1] = useState("서울특별시 금천구 벚꽃로 298 대륭포스트타워6차 313호");
  const [managerName] = useState("테스트하는축구선수");
  const [managerPhone] = useState("02-1234-5678");
  const [managerEmail] = useState("ABC111@itweed.net");

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

  const [kcpUseCard, setKcpUseCard] = useState(true);
  const [kcpUseVcnt, setKcpUseVcnt] = useState(true);
  const [kcpUseEasyPay, setKcpUseEasyPay] = useState(true);
  const [kcpUseEscVcnt, setKcpUseEscVcnt] = useState(true);
  const [kcpKeyinYn, setKcpKeyinYn] = useState(false);
  const [kcpMngNm, setKcpMngNm] = useState("테스트하는축구선수");
  const [kcpMngEmail, setKcpMngEmail] = useState("ABC111@itweed.net");
  const [kcpMngTel, setKcpMngTel] = useState<[string, string, string]>(["", "", ""]);
  const [kcpMngMob, setKcpMngMob] = useState<[string, string, string]>(["", "", ""]);
  const [kcpZipCode, setKcpZipCode] = useState("");
  const [kcpAddr1, setKcpAddr1] = useState("");
  const [kcpAddr2, setKcpAddr2] = useState("");
  const [kcpNavrMidx, setKcpNavrMidx] = useState("");
  const [kcpRetUrl, setKcpRetUrl] = useState("");

  const [kcpCompName] = useState("테스트하는축구");
  const [kcpCompTaxNo] = useState("1588601603");
  const [kcpCompUrl, setKcpCompUrl] = useState("");
  const [kcpCompOwnName, setKcpCompOwnName] = useState("최혜선");
  const [kcpCompOwnNo, setKcpCompOwnNo] = useState("");
  const [kcpCompOwnMob, setKcpCompOwnMob] = useState<[string, string, string]>(["", "", ""]);
  const [kcpCompEmail, setKcpCompEmail] = useState("ABC111@itweed.net");
  const [kcpCompTel, setKcpCompTel] = useState<[string, string, string]>(["", "", ""]);
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
                <input className={inputClass} value={companyName} disabled />
              </FieldCell>
              <FieldCell label="사업자번호" required>
                <input className={inputClass} value={businessNumber} disabled />
              </FieldCell>
            </FieldRow>
            <FieldRow>
              <FieldCell label="대표자명" required>
                <input className={inputClass} value={ceoName} disabled />
              </FieldCell>
              <FieldCell label="사업자 URL" required>
                <input className={inputClass} value={businessUrl} disabled />
              </FieldCell>
            </FieldRow>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="주소1" required>
                <input className={inputClass} value={address1} disabled />
              </FieldCell>
            </div>
            <FieldRow>
              <FieldCell label="가맹점 담당자" required>
                <input className={inputClass} value={managerName} disabled />
              </FieldCell>
              <FieldCell label="가맹점 전화번호" required>
                <input className={inputClass} value={managerPhone} disabled />
              </FieldCell>
            </FieldRow>
            <div>
              <FieldCell label="가맹점 이메일" required>
                <input className={inputClass} type="email" value={managerEmail} disabled />
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
                <input className={inputClass} value={kcpCompName} disabled />
              </FieldCell>
              <FieldCell label="사업자번호" required>
                <input className={inputClass} value={kcpCompTaxNo} disabled />
              </FieldCell>
            </FieldRow>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="사이트URL" required>
                <input
                  className={inputClass}
                  value={kcpCompUrl}
                  onChange={(e) => setKcpCompUrl(e.target.value)}
                  placeholder="http:// 또는 https:// 프로토콜 제외"
                />
              </FieldCell>
            </div>
            <FieldRow>
              <FieldCell label="대표자명" required>
                <input
                  className={inputClass}
                  value={kcpCompOwnName}
                  onChange={(e) => setKcpCompOwnName(e.target.value)}
                />
              </FieldCell>
              <FieldCell label="대표자 생년월일" required>
                <input
                  className={inputClass}
                  value={kcpCompOwnNo}
                  onChange={(e) => setKcpCompOwnNo(e.target.value)}
                  placeholder="YYMMDD"
                />
              </FieldCell>
            </FieldRow>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="대표자 휴대폰번호" required>
                <SplitInput
                  values={kcpCompOwnMob}
                  segmentWidths={["56px", "72px", "72px"]}
                  onChange={(idx, value) =>
                    setKcpCompOwnMob((prev) => {
                      const next: [string, string, string] = [...prev];
                      next[idx] = value;
                      return next;
                    })
                  }
                />
              </FieldCell>
            </div>
            <div className="border-b border-[var(--border)]">
              <FieldCell label="대표 이메일" required>
                <input
                  className={inputClass}
                  type="email"
                  value={kcpCompEmail}
                  onChange={(e) => setKcpCompEmail(e.target.value)}
                />
              </FieldCell>
            </div>
            <div>
              <FieldCell label="업체 전화번호" required>
                <SplitInput
                  values={kcpCompTel}
                  segmentWidths={["56px", "72px", "72px"]}
                  onChange={(idx, value) =>
                    setKcpCompTel((prev) => {
                      const next: [string, string, string] = [...prev];
                      next[idx] = value;
                      return next;
                    })
                  }
                />
              </FieldCell>
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>결제 수단 사용여부</SectionTitle>
            <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
              <ToggleFieldRow label="신용카드 사용유무" name="kcpUseCard" value={kcpUseCard} onChange={setKcpUseCard} />
              <ToggleFieldRow label="가상계좌 사용유무" name="kcpUseVcnt" value={kcpUseVcnt} onChange={setKcpUseVcnt} />
              <ToggleFieldRow
                label="간편결제 사용유무"
                name="kcpUseEasyPay"
                value={kcpUseEasyPay}
                onChange={setKcpUseEasyPay}
              />
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>에스크로 가상계좌 사용유무</SectionTitle>
            <div className="mt-2 rounded-lg border border-[var(--border)] px-4 py-3">
              <YesNoToggle name="kcpUseEscVcnt" value={kcpUseEscVcnt} onChange={setKcpUseEscVcnt} />
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>KEYIN(수기) 결제 사용유무</SectionTitle>
            <div className="mt-2 rounded-lg border border-[var(--border)] px-4 py-3">
              <YesNoToggle name="kcpKeyinYn" value={kcpKeyinYn} onChange={setKcpKeyinYn} />
            </div>
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
              <div className="border-b border-[var(--border)]">
                <FieldCell label="담당자 전화번호" required>
                  <SplitInput
                    values={kcpMngTel}
                    segmentWidths={["56px", "72px", "72px"]}
                    onChange={(idx, value) =>
                      setKcpMngTel((prev) => {
                        const next: [string, string, string] = [...prev];
                        next[idx] = value;
                        return next;
                      })
                    }
                  />
                </FieldCell>
              </div>
              <div>
                <FieldCell label="담당자 휴대폰번호" required>
                  <SplitInput
                    values={kcpMngMob}
                    segmentWidths={["56px", "72px", "72px"]}
                    onChange={(idx, value) =>
                      setKcpMngMob((prev) => {
                        const next: [string, string, string] = [...prev];
                        next[idx] = value;
                        return next;
                      })
                    }
                  />
                </FieldCell>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>주소 정보</SectionTitle>
            <div className="mt-3 overflow-hidden rounded-lg border border-[var(--border)]">
              <FieldRow>
                <FieldCell label="도로명 우편번호" required>
                  <input className={inputClass} value={kcpZipCode} onChange={(e) => setKcpZipCode(e.target.value)} />
                </FieldCell>
                <FieldCell label="가맹점고유번호/몰 아이디" required>
                  <input
                    className={inputClass}
                    value={kcpNavrMidx}
                    onChange={(e) => setKcpNavrMidx(e.target.value)}
                    placeholder="호스팅사에서 관리하는 고유 ID 또는 mall ID"
                  />
                </FieldCell>
              </FieldRow>
              <div className="border-b border-[var(--border)]">
                <FieldCell label="도로명 주소" required>
                  <input className={inputClass} value={kcpAddr1} onChange={(e) => setKcpAddr1(e.target.value)} />
                </FieldCell>
              </div>
              <div>
                <FieldCell label="도로명 상세주소" required>
                  <input className={inputClass} value={kcpAddr2} onChange={(e) => setKcpAddr2(e.target.value)} />
                </FieldCell>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>공통리턴 URL</SectionTitle>
            <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
              <FieldCell label="retUrl" required>
                <input
                  className={inputClass}
                  value={kcpRetUrl}
                  onChange={(e) => setKcpRetUrl(e.target.value)}
                  placeholder="https://test.com/webhook"
                />
              </FieldCell>
            </div>
          </div>

          <div className="mt-7">
            <SectionTitle required>인증 정보</SectionTitle>
            <p className="mt-1 text-[11.5px] text-[var(--text-muted)]">
              계약·요청 시점에 시스템에서 자동으로 설정되는 값으로, 판매자가 직접 입력하지 않습니다.
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
              <FieldRow>
                <FieldCell label="hostCode" required>
                  <input className={inputClass} value="2015241" disabled />
                </FieldCell>
                <FieldCell label="reqDt" required>
                  <input className={inputClass} value="" placeholder="요청 시점에 자동 생성" disabled />
                </FieldCell>
              </FieldRow>
              <div className="border-b border-[var(--border)]">
                <FieldCell label="kcpCertInfo" required>
                  <input
                    className={inputClass}
                    value=""
                    placeholder="KCP 발급 서비스 인증서(pem)가 시스템에서 자동 첨부됩니다"
                    disabled
                  />
                </FieldCell>
              </div>
              <div>
                <FieldCell label="kcpSignData" required>
                  <input
                    className={inputClass}
                    value=""
                    placeholder="hostCode+사업자번호+요청일시 기반으로 자동 생성됩니다"
                    disabled
                  />
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
            <p className="mt-1.5 text-[10.5px] text-[var(--text-muted)]">
              동의하지 않는 경우 신청이 진행되지 않습니다.
            </p>
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
