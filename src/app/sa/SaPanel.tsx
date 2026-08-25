"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CHECKLIST_CATEGORIES,
  COMPANIES,
  DISPLAY_STAGE_STYLE,
  MESSAGE_TEMPLATES,
  PERIOD_OPTIONS,
  STATS_BY_PERIOD,
  TOTAL_CHECKLIST_ITEMS,
  daysSince,
  deriveStage,
  getApprovalCompletedAt,
  getDisplayStage,
  getItemValueFields,
  getPgInfo,
  getSignupDetail,
  PG_STATUS_STYLE,
  type CompanyRow,
  type DisplayStage,
  type PeriodKey,
  type StageKey,
  type ValueFieldKey,
} from "./data";

const PAGE_SIZE_OPTIONS = [100, 1000];

const RECOMMENDED_IDS = CHECKLIST_CATEGORIES.find((c) => c.name === "권장 설정")!.items.map((i) => i.id);
const GROWTH_IDS = CHECKLIST_CATEGORIES.find((c) => c.name === "매출 확장")!.items.map((i) => i.id);

const STAGE_SEARCH_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "신규가입", label: "신규가입" },
  { value: "승인 대기", label: "승인 대기" },
  { value: "결제 준비중", label: "결제 준비중" },
  { value: "운영 필수 진행중", label: "운영 필수 진행중" },
  { value: "권장 설정 진행중", label: "권장 설정 진행중" },
  { value: "매출 확장 진행중", label: "매출 확장 진행중" },
];

function matchesStageSearch(company: CompanyRow, option: string): boolean {
  if (option === "all") return true;
  return getDisplayStage(company) === option;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const primaryButtonClass =
  "rounded-[6px] bg-[var(--cta)] px-3.5 py-[7px] text-[14px] font-medium text-white";
const secondaryButtonClass =
  "rounded-[6px] border border-[var(--border)] px-3.5 py-[7px] text-[14px] font-medium text-[var(--text-secondary)]";
const rowPrimaryButtonClass =
  "whitespace-nowrap rounded-[6px] bg-[var(--cta)] px-1.5 py-[6px] text-center text-[13.5px] font-medium text-white";
const rowSecondaryButtonClass =
  "whitespace-nowrap rounded-[6px] border border-[var(--border)] px-1.5 py-[6px] text-center text-[13.5px] font-medium text-[var(--text-secondary)]";
const inputClass =
  "rounded-md border border-[var(--border)] px-2.5 py-[7px] text-[15px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

function getStepTitle(key: ValueFieldKey): string {
  if (key === "signup") return "회원가입 완료";
  if (key === "template") return "템플릿 선택";
  const item = CHECKLIST_CATEGORIES.flatMap((c) => c.items).find((it) => it.id === key);
  return item?.title ?? "";
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5L19 19M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="white" strokeWidth="3.2">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DISPLAY_STAGE_NUMBER: Record<DisplayStage, string> = {
  "신규가입": "①",
  "승인 대기": "②",
  "결제 준비중": "③",
  "운영 필수 진행중": "④",
  "권장 설정 진행중": "⑤",
  "매출 확장 진행중": "⑥",
};

function StageBadge({ company }: { company: Pick<CompanyRow, "templateSelected" | "approvalDone" | "completedItemIds"> }) {
  const label = getDisplayStage(company);
  const style = DISPLAY_STAGE_STYLE[label];
  return (
    <span
      className="inline-flex w-fit items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[12px] font-semibold"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {DISPLAY_STAGE_NUMBER[label]} {label}
    </span>
  );
}

function ProgressCell({ completed }: { completed: number }) {
  const percent = Math.round((completed / TOTAL_CHECKLIST_ITEMS) * 100);
  return (
    <div className="w-full">
      <div className="h-1.5 w-full rounded-full bg-[var(--divider)]">
        <div
          className="h-1.5 rounded-full bg-[var(--accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1 text-[14px] text-[var(--text-muted)]">
        {completed}/{TOTAL_CHECKLIST_ITEMS}개 · {percent}%
      </p>
    </div>
  );
}

const statCardStyle: React.CSSProperties = {
  border: "1px solid #E4E2D8",
  borderRadius: 8,
  padding: 14,
};

function StatCardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px]" style={{ color: "#888780" }}>
      {children}
    </p>
  );
}

function StatCard({ label, value, accentColor }: { label: string; value: number; accentColor?: string }) {
  return (
    <div className="flex flex-col gap-1 bg-[var(--surface-1)]" style={statCardStyle}>
      <StatCardLabel>{label}</StatCardLabel>
      <p className="text-[25px] font-bold" style={{ color: accentColor ?? "var(--text-primary)" }}>
        {value}건
      </p>
    </div>
  );
}

function CombinedStatCard({
  label,
  inProgressCount,
  inProgressColor,
  completedCount,
  completedColor,
}: {
  label: string;
  inProgressCount: number;
  inProgressColor: string;
  completedCount: number;
  completedColor: string;
}) {
  return (
    <div className="flex flex-col gap-1 bg-[var(--surface-1)]" style={statCardStyle}>
      <StatCardLabel>{label}</StatCardLabel>
      <div className="mt-1 flex items-baseline gap-4">
        <span className="flex items-baseline gap-1">
          <span className="text-[20px] font-bold" style={{ color: inProgressColor }}>
            {inProgressCount}
          </span>
          <span className="text-[11px]" style={{ color: "#888780" }}>
            건 진행중
          </span>
        </span>
        <span className="flex items-baseline gap-1">
          <span className="text-[20px] font-bold" style={{ color: completedColor }}>
            {completedCount}
          </span>
          <span className="text-[11px]" style={{ color: "#888780" }}>
            건 완료
          </span>
        </span>
      </div>
    </div>
  );
}

function PaginationBar({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-4 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[15px] text-[var(--text-secondary)] disabled:opacity-40"
      >
        이전
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className="h-8 w-8 rounded-md text-[15px] font-medium"
          style={
            p === page
              ? { backgroundColor: "var(--cta)", color: "#fff" }
              : { border: "1px solid var(--border)", color: "var(--text-secondary)" }
          }
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[15px] text-[var(--text-secondary)] disabled:opacity-40"
      >
        다음
      </button>
    </div>
  );
}

function SearchField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[14px] font-medium text-[var(--text-secondary)]">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-[150px] ${inputClass}`}
      />
    </label>
  );
}

function StepRow({
  index,
  title,
  statusText,
  statusColor,
  onOpenValue,
}: {
  index: number;
  title: string;
  statusText: string;
  statusColor: string;
  onOpenValue?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--divider)] py-3 last:border-0">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--text-primary)] text-[13px] font-semibold text-white">
        {index}
      </span>
      <span className="flex-1 text-[16px] font-medium text-[var(--text-primary)]">{title}</span>
      <span className="text-[14px] font-medium" style={{ color: statusColor }}>
        {statusText}
      </span>
      {onOpenValue ? (
        <button type="button" onClick={onOpenValue} className={secondaryButtonClass}>
          입력값 보기
        </button>
      ) : null}
    </div>
  );
}

function CategoryItemRow({
  title,
  done,
  onOpenValue,
}: {
  title: string;
  done: boolean;
  onOpenValue: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[var(--divider)] py-2.5 last:border-0">
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: done ? "var(--success)" : "var(--divider)" }}
      >
        {done ? <CheckIcon /> : null}
      </span>
      <span
        className="flex-1 text-[15.5px]"
        style={{ color: done ? "var(--text-primary)" : "var(--placeholder)" }}
      >
        {title}
      </span>
      {done ? (
        <button type="button" onClick={onOpenValue} className={secondaryButtonClass}>
          입력값 보기
        </button>
      ) : (
        <span className="text-[14px] text-[var(--placeholder)]">미완료</span>
      )}
    </div>
  );
}

function DetailModal({
  company,
  onClose,
  onOpenValue,
}: {
  company: CompanyRow;
  onClose: () => void;
  onOpenValue: (key: ValueFieldKey) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      <div className="relative max-h-[86vh] w-[720px] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center text-[var(--text-muted)]"
        >
          <CloseIcon />
        </button>

        <p className="text-[14px] text-[var(--text-muted)]">온보딩 진행 현황</p>
        <h2 className="mt-1 text-[20px] font-bold text-[var(--text-primary)]">{company.storeName}</h2>
        <div className="mt-2">
          <StageBadge company={company} />
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] px-4">
          <StepRow
            index={1}
            title="회원가입 완료"
            statusText="완료"
            statusColor="var(--success)"
            onOpenValue={() => onOpenValue("signup")}
          />
          <StepRow
            index={2}
            title="템플릿 선택"
            statusText={company.templateSelected ? "완료" : "미완료"}
            statusColor={company.templateSelected ? "var(--success)" : "var(--placeholder)"}
            onOpenValue={company.templateSelected ? () => onOpenValue("template") : undefined}
          />
          <StepRow
            index={3}
            title="승인 대기"
            statusText={
              company.approvalDone
                ? `승인 완료 (${getApprovalCompletedAt(company)})`
                : "승인 검토중"
            }
            statusColor={company.approvalDone ? "var(--success)" : "#BA7517"}
          />
        </div>

        <div className="mt-5 space-y-4">
          {CHECKLIST_CATEGORIES.map((category) => (
            <div key={category.name} className="rounded-lg border border-[var(--border)] px-4">
              <p className="pt-3 text-[15px] font-semibold text-[var(--text-secondary)]">{category.name}</p>
              <div className="mt-1">
                {category.items.map((item) => (
                  <CategoryItemRow
                    key={item.id}
                    title={item.title}
                    done={company.completedItemIds.includes(item.id)}
                    onOpenValue={() => onOpenValue(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-[16px] font-semibold text-[var(--text-primary)]">알림톡 발송 이력</p>
          <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
            {company.history.length > 0 ? (
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="bg-[var(--surface-1)]">
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">발송일시</th>
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">메시지명</th>
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">유형</th>
                  </tr>
                </thead>
                <tbody>
                  {company.history.map((row, idx) => (
                    <tr key={idx} style={{ borderTop: "1px solid var(--divider)" }}>
                      <td className="whitespace-nowrap px-3 py-2 text-[var(--text-secondary)]">{row.sentAt}</td>
                      <td className="px-3 py-2 text-[var(--text-primary)]">{row.messageTitle}</td>
                      <td className="px-3 py-2 text-[var(--text-secondary)]">{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-3 py-4 text-center text-[15px] text-[var(--text-muted)]">
                발송 이력이 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueModal({
  itemKey,
  company,
  onClose,
}: {
  itemKey: ValueFieldKey;
  company: CompanyRow;
  onClose: () => void;
}) {
  const fields = getItemValueFields(itemKey, company);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="relative w-[380px] rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center text-[var(--text-muted)]"
        >
          <CloseIcon />
        </button>

        <p className="pr-6 text-[17px] font-bold text-[var(--text-primary)]">{getStepTitle(itemKey)} · 입력값</p>
        <p className="mt-0.5 text-[14px] text-[var(--text-muted)]">{company.storeName}</p>

        <div className="mt-4 space-y-2.5">
          {fields.map((field) => (
            <div key={field.label} className="flex items-start gap-3">
              <span className="w-[100px] shrink-0 text-[15px] text-[var(--text-muted)]">{field.label}</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <button type="button" onClick={onClose} className={secondaryButtonClass}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function SignupSectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] font-bold text-[var(--text-secondary)]">{children}</p>;
}

function SignupField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-[100px] shrink-0 text-[15px] text-[var(--text-muted)]">{label}</span>
      <span className="text-[15px] font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

function VerifiedTag({ verified }: { verified: boolean }) {
  return (
    <span
      className="ml-1.5 inline-block rounded-full px-1.5 py-[1px] align-middle text-[13px] font-semibold"
      style={{
        backgroundColor: verified ? "#EAF3E0" : "#FBEAF0",
        color: verified ? "var(--success)" : "var(--accent)",
      }}
    >
      {verified ? "인증완료" : "미인증"}
    </span>
  );
}

function SignupValueModal({ company, onClose }: { company: CompanyRow; onClose: () => void }) {
  const index = COMPANIES.findIndex((c) => c.key === company.key);
  const detail = getSignupDetail(company, index);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="relative flex max-h-[86vh] w-[460px] flex-col rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center text-[var(--text-muted)]"
        >
          <CloseIcon />
        </button>

        <p className="pr-6 text-[17px] font-bold text-[var(--text-primary)]">회원가입 완료 · 입력값</p>
        <p className="mt-0.5 text-[14px] text-[var(--text-muted)]">{company.storeName}</p>

        <div className="mt-4 flex-1 space-y-5 overflow-y-auto pr-1">
          <div className="space-y-2.5">
            <SignupSectionTitle>가입 정보</SignupSectionTitle>
            <SignupField label="가입 유형" value={detail.joinType} />
            <SignupField label="사업자 구분" value={detail.businessType} />
            <SignupField label="사업자등록번호" value={detail.businessRegistrationNumber} />
            <SignupField label="사업자등록증" value={detail.businessCertAttached ? "첨부됨" : "미첨부"} />
            <SignupField label="회사명" value={detail.companyName} />
            <SignupField label="쇼핑몰명" value={detail.shopName} />
            <SignupField label="아이디" value={detail.loginId} />
            <SignupField label="영업 대행사" value={detail.salesAgency} />
          </div>

          <div className="space-y-2.5 border-t border-[var(--divider)] pt-4">
            <SignupSectionTitle>사업자 상세 정보</SignupSectionTitle>
            <SignupField label="대표자명" value={detail.ownerName} />
            <SignupField label="업태 / 업종" value={`${detail.businessCategory} / ${detail.businessItem}`} />
            <SignupField
              label="통신판매신고"
              value={
                detail.mailOrderStatus === "번호 있음"
                  ? `번호 있음 (${detail.mailOrderNumber})`
                  : detail.mailOrderStatus
              }
            />
            <SignupField label="대표번호" value={detail.representativePhone} />
            <SignupField label="팩스번호" value={detail.faxNumber ?? "미입력"} />
            <SignupField
              label="사업장 주소"
              value={`(${detail.zipCode}) ${detail.addressBase}, ${detail.addressDetail}`}
            />
          </div>

          <div className="space-y-2.5 border-t border-[var(--divider)] pt-4">
            <SignupSectionTitle>담당자 정보</SignupSectionTitle>
            <SignupField label="담당자명" value={detail.managerName} />
            <SignupField
              label="담당자 연락처"
              value={
                <>
                  {detail.managerPhone}
                  <VerifiedTag verified={detail.managerPhoneVerified} />
                </>
              }
            />
            <SignupField
              label="담당자 이메일"
              value={
                <>
                  {detail.managerEmail}
                  <VerifiedTag verified={detail.managerEmailVerified} />
                </>
              }
            />
            <SignupField label="운영 경험" value={detail.shopExperience} />
            {detail.previousShopService ? (
              <SignupField label="이용 서비스" value={detail.previousShopService} />
            ) : null}
          </div>

          <div className="border-t border-[var(--divider)] pt-4">
            <SignupSectionTitle>약관 동의 내역</SignupSectionTitle>
            <div className="mt-1.5">
              {detail.terms.map((term) => (
                <div
                  key={term.label}
                  className="flex items-center gap-2.5 border-b border-[var(--divider)] py-2 last:border-0"
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: term.agreed ? "var(--success)" : "var(--divider)" }}
                  >
                    {term.agreed ? <CheckIcon /> : null}
                  </span>
                  <span className="flex-1 text-[15px] text-[var(--text-primary)]">
                    <span className="mr-1 font-semibold" style={{ color: term.required ? "#D8342A" : "#888780" }}>
                      [{term.required ? "필수" : "선택"}]
                    </span>
                    {term.label}
                  </span>
                  <span
                    className="text-[14px]"
                    style={{ color: term.agreed ? "var(--success)" : "var(--placeholder)" }}
                  >
                    {term.agreed ? "동의완료" : "미동의"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button type="button" onClick={onClose} className={secondaryButtonClass}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function SendMessageModal({ company, onClose }: { company: CompanyRow; onClose: () => void }) {
  const [templateId, setTemplateId] = useState(MESSAGE_TEMPLATES[0].id);
  const [phone, setPhone] = useState("010-0000-0000");
  const template = MESSAGE_TEMPLATES.find((t) => t.id === templateId)!;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      <div className="relative w-[420px] rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center text-[var(--text-muted)]"
        >
          <CloseIcon />
        </button>

        <p className="pr-6 text-[17px] font-bold text-[var(--text-primary)]">알림톡 발송</p>
        <p className="mt-0.5 text-[14px] text-[var(--text-muted)]">
          {company.storeName} · {company.loginId}
        </p>

        <div className="mt-4">
          <p className="mb-1.5 text-[15px] font-medium text-[var(--text-primary)]">발송할 메시지</p>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(Number(e.target.value))}
            className={`w-full ${inputClass}`}
          >
            {MESSAGE_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div
          className="mt-3 rounded-lg px-3.5 py-3"
          style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface-1)" }}
        >
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[13px] font-medium"
            style={
              template.category === "정보성"
                ? { backgroundColor: "#E1F5EE", color: "#04342C" }
                : { backgroundColor: "#FAEEDA", color: "#8A5710" }
            }
          >
            {template.category}
          </span>
          <p className="mt-2 text-[15.5px] font-semibold text-[var(--text-primary)]">{template.title}</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{template.body}</p>
          <div
            className="mt-2 rounded-md py-1.5 text-center text-[15px] font-semibold text-white"
            style={{ backgroundColor: "#D8342A" }}
          >
            {template.button}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1.5 text-[15px] font-medium text-[var(--text-primary)]">수신 번호</p>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full ${inputClass}`}
          />
        </div>

        <div className="mt-5 flex justify-center gap-[10px]">
          <button type="button" onClick={onClose} className={secondaryButtonClass}>
            취소
          </button>
          <button type="button" onClick={onClose} className={primaryButtonClass}>
            발송
          </button>
        </div>
      </div>
    </div>
  );
}

interface AppliedFilters {
  storeName: string;
  loginId: string;
  joinFrom: string;
  joinTo: string;
  stage: string;
}

export default function SaPanel() {
  // 서버 렌더링 시점과 브라우저 시간대가 달라 하이드레이션 불일치가 나지 않도록,
  // 오늘 날짜는 마운트 이후 useEffect에서만 계산해 채웁니다.
  const [today, setToday] = useState("");

  const [period, setPeriod] = useState<PeriodKey>("custom");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  useEffect(() => {
    const t = formatDate(new Date());
    setToday(t);
    setCustomFrom((prev) => prev || t);
    setCustomTo((prev) => prev || t);
  }, []);

  const [storeNameInput, setStoreNameInput] = useState("");
  const [loginIdInput, setLoginIdInput] = useState("");
  const [joinFromInput, setJoinFromInput] = useState("");
  const [joinToInput, setJoinToInput] = useState("");
  const [stageSearchInput, setStageSearchInput] = useState("all");
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [sortOption, setSortOption] = useState("join-desc");

  const [detailCompanyKey, setDetailCompanyKey] = useState<string | null>(null);
  const [valueTarget, setValueTarget] = useState<ValueFieldKey | null>(null);
  const [sendCompanyKey, setSendCompanyKey] = useState<string | null>(null);

  const stats = STATS_BY_PERIOD[period];

  const stageCounts = useMemo(() => {
    const counts: Record<StageKey, number> = {
      "template-pending": 0,
      "approval-pending": 0,
      "payment-prep": 0,
      "ops-prep": 0,
      "open-ready": 0,
      "all-done": 0,
    };
    let recommendedInProgress = 0;
    let growthInProgress = 0;
    let recommendedCompleted = 0;
    let growthCompleted = 0;

    COMPANIES.forEach((c) => {
      const stage = deriveStage(c);
      counts[stage] += 1;

      const unlocked = stage === "open-ready" || stage === "all-done";
      if (unlocked) {
        const recommendedDone = RECOMMENDED_IDS.filter((id) => c.completedItemIds.includes(id)).length;
        const growthDone = GROWTH_IDS.filter((id) => c.completedItemIds.includes(id)).length;
        if (recommendedDone > 0 && recommendedDone < RECOMMENDED_IDS.length) recommendedInProgress += 1;
        if (recommendedDone === RECOMMENDED_IDS.length) recommendedCompleted += 1;
        if (growthDone > 0 && growthDone < GROWTH_IDS.length) growthInProgress += 1;
        if (growthDone === GROWTH_IDS.length) growthCompleted += 1;
      }
    });

    // 결제 준비/운영 필수는 그 카테고리가 완전히 끝나야 다음 단계로 넘어가므로,
    // "완료" 건수는 해당 단계를 이미 지나친(더 앞선) 업체 수를 모두 더해 구합니다.
    const paymentCompleted = counts["ops-prep"] + counts["open-ready"] + counts["all-done"];
    const opsCompleted = counts["open-ready"] + counts["all-done"];

    return {
      ...counts,
      recommendedInProgress,
      growthInProgress,
      recommendedCompleted,
      growthCompleted,
      paymentCompleted,
      opsCompleted,
    };
  }, []);

  const handlePeriodClick = (key: PeriodKey) => {
    setPeriod(key);
    if (key === "custom") {
      setCustomFrom((prev) => prev || today);
      setCustomTo((prev) => prev || today);
    }
  };

  const filteredCompanies = useMemo(() => {
    if (!appliedFilters) return COMPANIES;
    return COMPANIES.filter((c) => {
      if (appliedFilters.storeName && !c.storeName.includes(appliedFilters.storeName)) return false;
      if (appliedFilters.loginId && !c.loginId.includes(appliedFilters.loginId)) return false;
      if (appliedFilters.joinFrom && c.joinDate < appliedFilters.joinFrom) return false;
      if (appliedFilters.joinTo && c.joinDate > appliedFilters.joinTo) return false;
      if (!matchesStageSearch(c, appliedFilters.stage)) return false;
      return true;
    });
  }, [appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const pagedCompanies = filteredCompanies.slice((page - 1) * pageSize, page * pageSize);

  const detailCompany = COMPANIES.find((c) => c.key === detailCompanyKey) ?? null;
  const sendCompany = COMPANIES.find((c) => c.key === sendCompanyKey) ?? null;

  const handleSearch = () => {
    setAppliedFilters({
      storeName: storeNameInput.trim(),
      loginId: loginIdInput.trim(),
      joinFrom: joinFromInput,
      joinTo: joinToInput,
      stage: stageSearchInput,
    });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setStoreNameInput("");
    setLoginIdInput("");
    setJoinFromInput("");
    setJoinToInput("");
    setStageSearchInput("all");
    setAppliedFilters(null);
    setCurrentPage(1);
  };

  return (
    <div>
      <p className="text-[19px] font-bold text-[var(--text-primary)]">판매자 온보딩 관리</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {PERIOD_OPTIONS.map((opt) => {
          const active = period === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => handlePeriodClick(opt.key)}
              className="rounded-full px-3.5 py-[7px] text-[15px] font-medium"
              style={
                active
                  ? { backgroundColor: "var(--cta)", color: "#fff" }
                  : { border: "1px solid var(--border)", color: "var(--text-secondary)" }
              }
            >
              {opt.label}
            </button>
          );
        })}
        {period === "custom" ? (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className={inputClass}
            />
            <span className="text-[15px] text-[var(--text-muted)]">~</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className={inputClass}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid w-[820px] grid-cols-3 gap-3">
        <StatCard label="신규가입" value={stats.newSignups} />
        <StatCard label="승인 대기" value={stageCounts["approval-pending"]} accentColor="#378ADD" />
        <CombinedStatCard
          label="결제 준비"
          inProgressCount={stageCounts["payment-prep"]}
          inProgressColor="#BA7517"
          completedCount={stageCounts.paymentCompleted}
          completedColor="#639922"
        />
        <CombinedStatCard
          label="운영 필수"
          inProgressCount={stageCounts["ops-prep"]}
          inProgressColor="#993556"
          completedCount={stageCounts.opsCompleted}
          completedColor="#639922"
        />
        <CombinedStatCard
          label="권장 설정"
          inProgressCount={stageCounts.recommendedInProgress}
          inProgressColor="#0C447C"
          completedCount={stageCounts.recommendedCompleted}
          completedColor="#639922"
        />
        <CombinedStatCard
          label="매출 확장"
          inProgressCount={stageCounts.growthInProgress}
          inProgressColor="#378ADD"
          completedCount={stageCounts.growthCompleted}
          completedColor="#639922"
        />
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
        <div className="flex flex-wrap items-end gap-3">
          <SearchField label="쇼핑몰명" value={storeNameInput} onChange={setStoreNameInput} placeholder="쇼핑몰명 검색" />
          <SearchField label="아이디" value={loginIdInput} onChange={setLoginIdInput} placeholder="아이디 검색" />
          <label className="flex flex-col gap-1">
            <span className="text-[14px] font-medium text-[var(--text-secondary)]">가입일</span>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={joinFromInput}
                onChange={(e) => setJoinFromInput(e.target.value)}
                className={inputClass}
              />
              <span className="text-[15px] text-[var(--text-muted)]">~</span>
              <input
                type="date"
                value={joinToInput}
                onChange={(e) => setJoinToInput(e.target.value)}
                className={inputClass}
              />
            </div>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[14px] font-medium text-[var(--text-secondary)]">현재 단계</span>
            <select
              value={stageSearchInput}
              onChange={(e) => setStageSearchInput(e.target.value)}
              className={`w-[160px] ${inputClass}`}
            >
              {STAGE_SEARCH_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={handleReset} className={secondaryButtonClass}>
            초기화
          </button>
          <button type="button" onClick={handleSearch} className={primaryButtonClass}>
            검색
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="text-[16px] text-[var(--text-secondary)]">
            전체 <span className="font-semibold text-[var(--text-primary)]">{filteredCompanies.length}</span>건
          </p>
          <button type="button" className={secondaryButtonClass}>
            정보수집
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={inputClass}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}개씩 보기
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={inputClass}
          >
            <option value="join-desc">가입일 최신순</option>
            <option value="join-asc">가입일 오래된순</option>
            <option value="progress-asc">진행률 낮은순</option>
            <option value="progress-desc">진행률 높은순</option>
            <option value="elapsed-desc">경과일 오래된순</option>
          </select>
        </div>
      </div>

      <div className="mt-2 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[1220px] table-fixed border-collapse text-left text-[16px]">
          <colgroup>
            <col style={{ width: "14%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "14%" }} />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface-1)" }}>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">쇼핑몰명</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">아이디</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">PG사</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">가입일</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">최근 활동일시</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">진행률</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">최근 알림톡</th>
              <th className="px-3 py-2.5 text-[15px] font-medium text-[var(--text-muted)]">관리</th>
            </tr>
          </thead>
          <tbody>
            {pagedCompanies.length > 0 ? (
              pagedCompanies.map((c) => {
                const lastHistoryEntry = c.history[c.history.length - 1];
                const dotColor = lastHistoryEntry ? (lastHistoryEntry.received ? "#639922" : "#D8342A") : null;
                const pg = getPgInfo(c);
                const pgStyle = PG_STATUS_STYLE[pg.status];
                return (
                  <tr key={c.key} style={{ borderBottom: "1px solid var(--divider)" }}>
                    <td className="px-3 py-3">
                      <div className="flex flex-col items-start gap-1">
                        <span className="truncate font-medium text-[var(--text-primary)]">{c.storeName}</span>
                        <StageBadge company={c} />
                      </div>
                    </td>
                    <td className="truncate px-3 py-3 text-[var(--text-secondary)]">{c.loginId}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col items-start gap-1">
                        {pg.provider ? (
                          <span className="truncate text-[15px] text-[var(--text-secondary)]">{pg.provider}</span>
                        ) : null}
                        <span
                          className="inline-flex w-fit items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[12px] font-semibold"
                          style={{ backgroundColor: pgStyle.bg, color: pgStyle.color }}
                        >
                          {pg.status}
                        </span>
                      </div>
                    </td>
                    <td className="truncate px-3 py-3 text-[var(--text-secondary)]">
                      {c.joinDate}
                      {today ? (
                        <span className="text-[13px] text-[var(--placeholder)]">
                          {" "}
                          (D+{daysSince(c.joinDate, today)})
                        </span>
                      ) : null}
                    </td>
                    <td className="truncate px-3 py-3 text-[var(--text-secondary)]">{c.lastActivityAt}</td>
                    <td className="px-3 py-3">
                      <ProgressCell completed={c.completedItemIds.length} />
                    </td>
                    <td className="px-3 py-3 text-[15px] text-[var(--text-secondary)]">
                      <span className="inline-flex items-center gap-1.5">
                        {dotColor ? (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: dotColor }}
                          />
                        ) : null}
                        {lastHistoryEntry ? lastHistoryEntry.sentAt : "-"}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col items-stretch gap-1">
                        <button
                          type="button"
                          onClick={() => setDetailCompanyKey(c.key)}
                          className={rowPrimaryButtonClass}
                        >
                          상세
                        </button>
                        <button
                          type="button"
                          onClick={() => setSendCompanyKey(c.key)}
                          className={rowSecondaryButtonClass}
                        >
                          알림톡 발송
                        </button>
                        <button type="button" className={rowSecondaryButtonClass}>
                          관리자 페이지
                        </button>
                        <button type="button" className={rowSecondaryButtonClass}>
                          사이트 이동
                        </button>
                        {deriveStage(c) === "approval-pending" ? (
                          <button
                            type="button"
                            className="ti-external-link inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[5px] px-[10px] py-[5px] text-center text-[11px] font-medium text-white"
                            style={{ backgroundColor: "#D8342A" }}
                          >
                            승인처리
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <path d="M15 3h6v6" />
                              <path d="M10 14 21 3" />
                            </svg>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[15px] text-[var(--text-muted)]">
                  검색 조건에 맞는 판매자가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationBar page={page} totalPages={totalPages} onChange={setCurrentPage} />

      {detailCompany ? (
        <DetailModal
          company={detailCompany}
          onClose={() => setDetailCompanyKey(null)}
          onOpenValue={(key) => setValueTarget(key)}
        />
      ) : null}

      {detailCompany && valueTarget !== null ? (
        valueTarget === "signup" ? (
          <SignupValueModal company={detailCompany} onClose={() => setValueTarget(null)} />
        ) : (
          <ValueModal itemKey={valueTarget} company={detailCompany} onClose={() => setValueTarget(null)} />
        )
      ) : null}

      {sendCompany ? <SendMessageModal company={sendCompany} onClose={() => setSendCompanyKey(null)} /> : null}
    </div>
  );
}
