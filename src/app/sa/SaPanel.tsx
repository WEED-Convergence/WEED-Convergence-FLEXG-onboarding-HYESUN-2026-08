"use client";

import { useMemo, useState } from "react";
import {
  CHECKLIST_CATEGORIES,
  COMPANIES,
  MESSAGE_TEMPLATES,
  PERIOD_OPTIONS,
  STAGE_CONFIG,
  STATS_BY_PERIOD,
  TOTAL_CHECKLIST_ITEMS,
  deriveStage,
  getItemValueFields,
  type CompanyRow,
  type PeriodKey,
  type StageKey,
  type ValueFieldKey,
} from "./data";

const PAGE_SIZE = 5;

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const primaryButtonClass =
  "rounded-[6px] bg-[var(--cta)] px-3.5 py-[7px] text-[11px] font-medium text-white";
const secondaryButtonClass =
  "rounded-[6px] border border-[var(--border)] px-3.5 py-[7px] text-[11px] font-medium text-[var(--text-secondary)]";
const rowPrimaryButtonClass =
  "whitespace-nowrap rounded-[6px] bg-[var(--cta)] px-1.5 py-[6px] text-center text-[10.5px] font-medium text-white";
const rowSecondaryButtonClass =
  "whitespace-nowrap rounded-[6px] border border-[var(--border)] px-1.5 py-[6px] text-center text-[10.5px] font-medium text-[var(--text-secondary)]";
const inputClass =
  "rounded-md border border-[var(--border)] px-2.5 py-[7px] text-[12px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

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

function StageBadge({ stage }: { stage: StageKey }) {
  const config = STAGE_CONFIG[stage];
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
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
      <p className="mt-1 text-[11px] text-[var(--text-muted)]">
        {completed}/{TOTAL_CHECKLIST_ITEMS}개 · {percent}%
      </p>
    </div>
  );
}

function StatCard({ label, value, accentColor }: { label: string; value: number; accentColor?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-5 py-4">
      <p className="text-[12px] text-[var(--text-muted)]">{label}</p>
      <p className="text-[22px] font-bold" style={{ color: accentColor ?? "var(--text-primary)" }}>
        {value}건
      </p>
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
        className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[12px] text-[var(--text-secondary)] disabled:opacity-40"
      >
        이전
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className="h-8 w-8 rounded-md text-[12px] font-medium"
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
        className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[12px] text-[var(--text-secondary)] disabled:opacity-40"
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
      <span className="text-[11px] font-medium text-[var(--text-secondary)]">{label}</span>
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
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--text-primary)] text-[10px] font-semibold text-white">
        {index}
      </span>
      <span className="flex-1 text-[13px] font-medium text-[var(--text-primary)]">{title}</span>
      <span className="text-[11px] font-medium" style={{ color: statusColor }}>
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
        className="flex-1 text-[12.5px]"
        style={{ color: done ? "var(--text-primary)" : "var(--placeholder)" }}
      >
        {title}
      </span>
      {done ? (
        <button type="button" onClick={onOpenValue} className={secondaryButtonClass}>
          입력값 보기
        </button>
      ) : (
        <span className="text-[11px] text-[var(--placeholder)]">미완료</span>
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

        <p className="text-[11px] text-[var(--text-muted)]">온보딩 진행 현황</p>
        <h2 className="mt-1 text-[17px] font-bold text-[var(--text-primary)]">{company.storeName}</h2>

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
            statusText={company.approvalDone ? "승인 완료" : "승인 검토중"}
            statusColor={company.approvalDone ? "var(--success)" : "#BA7517"}
          />
        </div>

        <div className="mt-5 space-y-4">
          {CHECKLIST_CATEGORIES.map((category) => (
            <div key={category.name} className="rounded-lg border border-[var(--border)] px-4">
              <p className="pt-3 text-[12px] font-semibold text-[var(--text-secondary)]">{category.name}</p>
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
          <p className="text-[13px] font-semibold text-[var(--text-primary)]">알림톡 발송 이력</p>
          <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border)]">
            {company.history.length > 0 ? (
              <table className="w-full border-collapse text-left text-[12px]">
                <thead>
                  <tr className="bg-[var(--surface-1)]">
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">발송일시</th>
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">메시지명</th>
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">유형</th>
                    <th className="px-3 py-2 font-medium text-[var(--text-muted)]">수신여부</th>
                  </tr>
                </thead>
                <tbody>
                  {company.history.map((row, idx) => (
                    <tr key={idx} style={{ borderTop: "1px solid var(--divider)" }}>
                      <td className="whitespace-nowrap px-3 py-2 text-[var(--text-secondary)]">{row.sentAt}</td>
                      <td className="px-3 py-2 text-[var(--text-primary)]">{row.messageTitle}</td>
                      <td className="px-3 py-2 text-[var(--text-secondary)]">{row.category}</td>
                      <td
                        className="px-3 py-2 font-medium"
                        style={{ color: row.received ? "var(--success)" : "var(--accent)" }}
                      >
                        {row.received ? "수신" : "미수신"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-3 py-4 text-center text-[12px] text-[var(--text-muted)]">
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

        <p className="pr-6 text-[14px] font-bold text-[var(--text-primary)]">{getStepTitle(itemKey)} · 입력값</p>
        <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{company.storeName}</p>

        <div className="mt-4 space-y-2.5">
          {fields.map((field) => (
            <div key={field.label} className="flex items-start gap-3">
              <span className="w-[90px] shrink-0 text-[12px] text-[var(--text-muted)]">{field.label}</span>
              <span className="text-[12px] font-medium text-[var(--text-primary)]">{field.value}</span>
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

        <p className="pr-6 text-[14px] font-bold text-[var(--text-primary)]">알림톡 발송</p>
        <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
          {company.storeName} · {company.loginId}
        </p>

        <div className="mt-4">
          <p className="mb-1.5 text-[12px] font-medium text-[var(--text-primary)]">발송할 메시지</p>
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
            className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={
              template.category === "정보성"
                ? { backgroundColor: "#E1F5EE", color: "#04342C" }
                : { backgroundColor: "#FAEEDA", color: "#8A5710" }
            }
          >
            {template.category}
          </span>
          <p className="mt-2 text-[12.5px] font-semibold text-[var(--text-primary)]">{template.title}</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-[var(--text-secondary)]">{template.body}</p>
          <div
            className="mt-2 rounded-md py-1.5 text-center text-[12px] font-semibold text-white"
            style={{ backgroundColor: "#D8342A" }}
          >
            {template.button}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1.5 text-[12px] font-medium text-[var(--text-primary)]">수신 번호</p>
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
  managerName: string;
  joinFrom: string;
  joinTo: string;
}

export default function SaPanel() {
  const today = useMemo(() => formatDate(new Date()), []);

  const [period, setPeriod] = useState<PeriodKey>("today");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const [storeNameInput, setStoreNameInput] = useState("");
  const [loginIdInput, setLoginIdInput] = useState("");
  const [managerNameInput, setManagerNameInput] = useState("");
  const [joinFromInput, setJoinFromInput] = useState("");
  const [joinToInput, setJoinToInput] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    COMPANIES.forEach((c) => {
      counts[deriveStage(c)] += 1;
    });
    return counts;
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
      if (appliedFilters.managerName && !c.managerName.includes(appliedFilters.managerName)) return false;
      if (appliedFilters.joinFrom && c.joinDate < appliedFilters.joinFrom) return false;
      if (appliedFilters.joinTo && c.joinDate > appliedFilters.joinTo) return false;
      return true;
    });
  }, [appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pagedCompanies = filteredCompanies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const detailCompany = COMPANIES.find((c) => c.key === detailCompanyKey) ?? null;
  const sendCompany = COMPANIES.find((c) => c.key === sendCompanyKey) ?? null;

  const handleSearch = () => {
    setAppliedFilters({
      storeName: storeNameInput.trim(),
      loginId: loginIdInput.trim(),
      managerName: managerNameInput.trim(),
      joinFrom: joinFromInput,
      joinTo: joinToInput,
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <p className="text-[18px] font-bold text-[var(--text-primary)]">판매자 온보딩 관리</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {PERIOD_OPTIONS.map((opt) => {
          const active = period === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => handlePeriodClick(opt.key)}
              className="rounded-full px-3.5 py-[7px] text-[12px] font-medium"
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
            <span className="text-[12px] text-[var(--text-muted)]">~</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className={inputClass}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid w-[760px] grid-cols-3 gap-3">
        <StatCard label="신규가입" value={stats.newSignups} />
        <StatCard label="온보딩 완료" value={stats.onboardingCompleted} />
        <StatCard
          label="승인 대기"
          value={stageCounts["approval-pending"]}
          accentColor={STAGE_CONFIG["approval-pending"].color}
        />
        <StatCard
          label="결제 준비 중"
          value={stageCounts["payment-prep"]}
          accentColor={STAGE_CONFIG["payment-prep"].color}
        />
        <StatCard
          label="운영 필수 진행 중"
          value={stageCounts["ops-prep"]}
          accentColor={STAGE_CONFIG["ops-prep"].color}
        />
        <StatCard
          label="오픈 가능"
          value={stageCounts["open-ready"] + stageCounts["all-done"]}
          accentColor={STAGE_CONFIG["open-ready"].color}
        />
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
        <div className="flex flex-wrap items-end gap-3">
          <SearchField label="상호명" value={storeNameInput} onChange={setStoreNameInput} placeholder="상호명 검색" />
          <SearchField label="아이디" value={loginIdInput} onChange={setLoginIdInput} placeholder="아이디 검색" />
          <SearchField
            label="담당자명"
            value={managerNameInput}
            onChange={setManagerNameInput}
            placeholder="담당자명 검색"
          />
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">가입일</span>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={joinFromInput}
                onChange={(e) => setJoinFromInput(e.target.value)}
                className={inputClass}
              />
              <span className="text-[12px] text-[var(--text-muted)]">~</span>
              <input
                type="date"
                value={joinToInput}
                onChange={(e) => setJoinToInput(e.target.value)}
                className={inputClass}
              />
            </div>
          </label>
          <button type="button" onClick={handleSearch} className={primaryButtonClass}>
            검색
          </button>
        </div>
      </div>

      <p className="mt-6 text-[13px] text-[var(--text-secondary)]">
        전체 <span className="font-semibold text-[var(--text-primary)]">{filteredCompanies.length}</span>건
      </p>

      <div className="mt-2 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full table-fixed border-collapse text-left text-[13px]">
          <colgroup>
            <col style={{ width: 118 }} />
            <col style={{ width: 122 }} />
            <col style={{ width: 92 }} />
            <col style={{ width: 140 }} />
            <col style={{ width: 105 }} />
            <col />
            <col style={{ width: 168 }} />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface-1)" }}>
              <th className="px-3 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">상호명</th>
              <th className="px-3 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">아이디</th>
              <th className="px-3 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">가입일</th>
              <th className="px-3 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">현재 단계</th>
              <th className="px-3 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">진행률</th>
              <th className="px-3 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">최근 알림톡</th>
              <th className="px-2 py-2.5 text-[12px] font-medium text-[var(--text-muted)]">관리</th>
            </tr>
          </thead>
          <tbody>
            {pagedCompanies.length > 0 ? (
              pagedCompanies.map((c) => {
                const recentMessage = MESSAGE_TEMPLATES.find((t) => t.id === c.recentMessageId);
                const recentMessageText = recentMessage ? recentMessage.title : "-";
                return (
                  <tr key={c.key} style={{ borderBottom: "1px solid var(--divider)" }}>
                    <td className="truncate px-3 py-3 font-medium text-[var(--text-primary)]">{c.storeName}</td>
                    <td className="truncate px-3 py-3 text-[var(--text-secondary)]">{c.loginId}</td>
                    <td className="truncate px-3 py-3 text-[var(--text-secondary)]">{c.joinDate}</td>
                    <td className="px-3 py-3">
                      <StageBadge stage={deriveStage(c)} />
                    </td>
                    <td className="px-3 py-3">
                      <ProgressCell completed={c.completedItemIds.length} />
                    </td>
                    <td
                      className="truncate px-3 py-3 text-[12px] text-[var(--text-secondary)]"
                      title={recentMessageText}
                    >
                      {recentMessageText}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailCompanyKey(c.key)}
                          className={rowSecondaryButtonClass}
                        >
                          상세보기
                        </button>
                        <button
                          type="button"
                          onClick={() => setSendCompanyKey(c.key)}
                          className={rowPrimaryButtonClass}
                        >
                          알림톡 발송
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[12px] text-[var(--text-muted)]">
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
        <ValueModal itemKey={valueTarget} company={detailCompany} onClose={() => setValueTarget(null)} />
      ) : null}

      {sendCompany ? <SendMessageModal company={sendCompany} onClose={() => setSendCompanyKey(null)} /> : null}
    </div>
  );
}
