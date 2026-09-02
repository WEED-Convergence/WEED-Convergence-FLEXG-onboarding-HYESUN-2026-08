"use client";

import { useState } from "react";

// 이 화면 전용 잠금 비밀번호 (컴포넌트 내부 상수)
const SIGNUP_LOCK_PASSWORD = "1214";

function RequiredMark() {
  return <span className="ml-0.5 text-[var(--accent)]">*</span>;
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-[9px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

const primaryButtonClass =
  "rounded-[8px] bg-[var(--cta)] px-[24px] py-[10px] text-[13px] font-medium text-white";

const primaryRedButtonClass =
  "rounded-[8px] bg-[#E24B4A] px-[24px] py-[10px] text-[13px] font-medium text-white";

const secondaryButtonClass =
  "rounded-[8px] border border-[var(--border)] px-[18px] py-[9px] text-[13px] font-medium text-[var(--text-secondary)]";

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12.5px] font-bold text-[var(--text-secondary)]">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

// ---------- STEP 1: 문자 메시지 스타일 대화형 질문 ----------

interface OptionStep {
  id: string;
  kind: "options";
  question: string;
  options: { label: string; value: string }[];
}

interface TextStep {
  id: string;
  kind: "text";
  question: string;
  placeholder: string;
}

type ChatStep = OptionStep | TextStep;

const CHAT_STEPS: ChatStep[] = [
  {
    id: "bizType",
    kind: "options",
    question: "사업자 정보를 선택해주세요.",
    options: [
      { label: "개인사업자", value: "individual" },
      { label: "법인사업자", value: "corporate" },
    ],
  },
  {
    id: "companyName",
    kind: "text",
    question: "회사명을 알려주세요.",
    placeholder: "회사명을 입력해주세요",
  },
  {
    id: "mallName",
    kind: "text",
    question: "쇼핑몰명을 알려주세요.",
    placeholder: "쇼핑몰명을 입력해주세요",
  },
];

function BotAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--cta)] text-[11px] font-bold text-white">
      F
    </span>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12L20 4L14 20L11 13L4 12Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10.5" height="10.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M4 20L4.6 16.5L15.5 5.6C16 5.1 16.8 5.1 17.3 5.6L18.4 6.7C18.9 7.2 18.9 8 18.4 8.5L7.5 19.4L4 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatHeader() {
  return (
    <div className="flex items-center gap-2.5 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--cta)] text-[13px] font-bold text-white">
        F
      </span>
      <p className="text-[14px] font-semibold text-[var(--text-primary)]">FlexG 회원가입</p>
    </div>
  );
}

function MessageInputBar({
  value,
  placeholder,
  disabled,
  onChange,
  onSend,
}: {
  value: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5 border-t border-[var(--border)] bg-[var(--bg)] px-4 py-3">
      <input
        className="flex-1 rounded-full bg-[var(--surface-1)] px-4 py-2.5 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none disabled:text-[var(--placeholder)]"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSend();
        }}
      />
      <button
        type="button"
        disabled={disabled || !value.trim()}
        onClick={onSend}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--cta)] text-white disabled:opacity-40"
      >
        <SendIcon />
      </button>
    </div>
  );
}

interface Step1ChatProps {
  currentIndex: number;
  answers: Record<string, string>;
  draft: string;
  onDraftChange: (value: string) => void;
  onOptionSelect: (step: OptionStep, option: { label: string; value: string }) => void;
  onTextSubmit: (step: TextStep) => void;
  onEdit: (idx: number) => void;
}

function Step1Chat({
  currentIndex,
  answers,
  draft,
  onDraftChange,
  onOptionSelect,
  onTextSubmit,
  onEdit,
}: Step1ChatProps) {
  const visibleSteps = CHAT_STEPS.slice(0, Math.min(currentIndex + 1, CHAT_STEPS.length));
  const currentStep = CHAT_STEPS[currentIndex];
  const activeTextStep = currentStep?.kind === "text" ? currentStep : null;

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)]">
      <ChatHeader />

      <div className="flex flex-col gap-4 px-4 py-4">
        {visibleSteps.map((step, idx) => {
          const answered = idx < currentIndex;

          return (
            <div key={step.id} className="flex flex-col gap-1.5">
              <div className="flex items-end gap-2">
                <BotAvatar />
                <div className="max-w-[70%] rounded-2xl rounded-bl-sm border border-[var(--border)] bg-white px-3.5 py-2.5 text-[13px] text-[var(--text-primary)]">
                  {step.question}
                </div>
              </div>

              {step.kind === "options" ? (
                <div className="flex justify-end gap-2 pr-1">
                  {step.options.map((option) => {
                    const isSelected = answers[step.id] === option.label;
                    const stateClass = answered
                      ? isSelected
                        ? "border-[var(--accent)] text-[var(--accent-text)] bg-[var(--accent-bg)]"
                        : "border-[var(--border)] text-[var(--text-muted)] opacity-50"
                      : "border-[var(--border)] text-[var(--text-primary)] bg-[var(--bg)]";
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={answered}
                        onClick={() => onOptionSelect(step, option)}
                        className={`rounded-full border px-4 py-2 text-[13px] font-medium ${stateClass}`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {answered ? (
                <div className="flex flex-col items-end pr-1">
                  <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-[#E24B4A] px-3.5 py-2.5 text-[13px] text-white">
                    {answers[step.id]}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10.5px] text-[var(--text-muted)]">방금</span>
                    <button
                      type="button"
                      onClick={() => onEdit(idx)}
                      className="flex items-center gap-1 rounded-full border border-[#E24B4A] bg-white px-2.5 py-[3px] text-[10.5px] font-medium text-[#E24B4A]"
                    >
                      <PencilIcon />
                      수정
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <MessageInputBar
        value={draft}
        placeholder={activeTextStep ? activeTextStep.placeholder : "메시지를 입력하세요"}
        disabled={!activeTextStep}
        onChange={onDraftChange}
        onSend={() => {
          if (activeTextStep) onTextSubmit(activeTextStep);
        }}
      />
    </div>
  );
}

// ---------- 이용약관 동의 ----------

interface TermRow {
  id: string;
  label: string;
  required: boolean;
  linkLabel: string | null;
}

const termRows: TermRow[] = [
  { id: "service", label: "플렉스지 이용약관 동의", required: true, linkLabel: "약관 보기" },
  { id: "privacy", label: "플렉스지 개인정보 수집 및 이용 동의", required: true, linkLabel: "약관 보기" },
  { id: "partner", label: "연동 업체 회원가입 동의", required: true, linkLabel: "팝빌 바로가기" },
  { id: "marketing", label: "광고성 정보 수신 동의", required: false, linkLabel: null },
];

function TermsAgreement() {
  const [terms, setTerms] = useState<Record<string, boolean>>({
    service: false,
    privacy: false,
    partner: false,
    marketing: false,
  });

  const allChecked = termRows.every((t) => terms[t.id]);
  const toggleAll = () => {
    const next = !allChecked;
    setTerms(Object.fromEntries(termRows.map((t) => [t.id, next])));
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-1)] px-4 py-2.5">
        <label className="flex items-center gap-2 text-[12.5px] font-semibold text-[var(--text-primary)]">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={toggleAll}
            className="h-3.5 w-3.5 accent-[var(--accent)]"
          />
          약관 전체 동의
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
            {term.required ? (
              <span className="font-bold text-[var(--accent)]">[필수]</span>
            ) : (
              <span className="font-bold text-[var(--text-muted)]">[선택]</span>
            )}
            {term.label}
          </label>
          {term.linkLabel ? (
            <span className="text-[11px] text-[var(--text-muted)] underline">{term.linkLabel}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ---------- STEP 2: 상세정보 입력폼 ----------

function Step2Form() {
  return (
    <div>
      <p className="text-[13px] font-semibold text-[var(--text-muted)]">STEP 2 · 상세정보 입력폼</p>

      <div className="mt-3 rounded-lg border border-[var(--border)] px-6 py-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <FormField label="아이디" required>
            <input className={inputClass} placeholder="아이디를 입력해주세요" />
          </FormField>
          <FormField label="비밀번호" required>
            <input type="password" className={inputClass} placeholder="비밀번호를 입력해주세요" />
          </FormField>
        </div>

        <div className="mt-5">
          <FormField label="담당자 이메일" required>
            <div className="flex gap-2">
              <input type="email" className={inputClass} placeholder="이메일을 입력해주세요" />
              <button type="button" className={`${secondaryButtonClass} shrink-0`}>
                인증발송
              </button>
            </div>
          </FormField>
        </div>

        <div className="mt-5">
          <FormField label="담당자 본인인증" required>
            <button type="button" className={primaryRedButtonClass}>
              담당자 인증
            </button>
          </FormField>
        </div>

        <div className="mt-7">
          <p className="text-[13px] font-bold text-[var(--text-primary)]">
            이용약관 동의
            <RequiredMark />
          </p>
          <div className="mt-2">
            <TermsAgreement />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button type="button" className={primaryRedButtonClass}>
            회원가입 완료
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- GNB / Footer (PC 사이즈 그대로 유지, 콘텐츠 영역만 태블릿 768px 폭) ----------

function GNB() {
  const navLinks = ["서비스", "요금", "고객사례", "고객지원", "제휴·제안"];
  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#1A1A1A] px-10">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-[11px] font-semibold text-slate-900">
          F
        </span>
        <span className="text-[16px] font-semibold tracking-tight text-white">FLEX-G</span>
      </div>
      <nav className="flex items-center gap-8 text-[13px] font-medium text-slate-300">
        {navLinks.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-medium text-slate-300">로그인</span>
        <span className="rounded-full bg-red-600 px-5 py-2 text-[13px] font-semibold text-white">
          쇼핑몰 만들기
        </span>
      </div>
    </header>
  );
}

function FooterIcon({ path }: { path: string }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-slate-300">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Footer() {
  const serviceLinks = ["서비스", "요금", "고객사례", "고객지원", "제휴·제안"];
  const policyLinks = ["회사소개", "이용약관", "개인정보처리방침"];

  return (
    <footer className="w-full shrink-0 bg-[#1A1A1A] px-10 pt-8 pb-6 text-slate-300">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
        <nav className="flex flex-wrap gap-6 text-[13px]">
          {serviceLinks.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </nav>
        <nav className="flex flex-wrap gap-6 text-[13px]">
          {policyLinks.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </nav>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[16px] font-semibold text-white">FLEX-G</p>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-400">
            서울특별시 금천구 벚꽃로 298 대륭포스트타워6차 313호
            <br />
            대표이사 김형준·김동재 &nbsp;|&nbsp; 사업자번호 158-86-01603
            <br />
            고객센터 070-7771-5866 &nbsp;|&nbsp; 운영시간 평일 10:00~18:00
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FooterIcon path="M4 4H20V17H12L7 21V17H4V4Z" />
          <FooterIcon path="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.5 4 9.5 4C10.9 4 12 4.8 12 4.8C12 4.8 13.1 4 14.5 4C17.5 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" />
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[12px] text-slate-300">
            Family Site
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] text-slate-500">ⓒ WEEDSOFT Corp.</p>
    </footer>
  );
}

// ---------- 회원가입 본문 ----------

function SignupTabletSmsContent() {
  const [wizardStep, setWizardStep] = useState<"chat" | "form">("chat");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");

  const advance = (nextIndex: number) => {
    setCurrentIndex(nextIndex);
    setDraft("");
    if (nextIndex >= CHAT_STEPS.length) {
      setWizardStep("form");
    }
  };

  const handleOptionSelect = (step: OptionStep, option: { label: string; value: string }) => {
    setAnswers((prev) => ({ ...prev, [step.id]: option.label }));
    advance(currentIndex + 1);
  };

  const handleTextSubmit = (step: TextStep) => {
    if (!draft.trim()) return;
    setAnswers((prev) => ({ ...prev, [step.id]: draft.trim() }));
    advance(currentIndex + 1);
  };

  const handleEdit = (idx: number) => {
    const editedStep = CHAT_STEPS[idx];
    const previousValue = answers[editedStep.id];
    setAnswers((prev) => {
      const next = { ...prev };
      for (let i = idx; i < CHAT_STEPS.length; i += 1) {
        delete next[CHAT_STEPS[i].id];
      }
      return next;
    });
    setCurrentIndex(idx);
    setDraft(editedStep.kind === "text" ? previousValue ?? "" : "");
  };

  return (
    <div className="relative w-full min-w-[900px] overflow-hidden rounded-xl border border-[var(--border)]">
      <GNB />

      <main className="flex w-full justify-center bg-[var(--bg)] py-10">
        <div className="w-[768px] shrink-0 px-8">
          <h1 className="text-center text-[24px] font-bold text-[var(--text-primary)]">회원가입</h1>

          <div className="mt-6">
            {wizardStep === "chat" ? (
              <>
                <p className="text-[13px] font-semibold text-[var(--text-muted)]">STEP 1 · 가입 정보 확인</p>
                <div className="mt-3">
                  <Step1Chat
                    currentIndex={currentIndex}
                    answers={answers}
                    draft={draft}
                    onDraftChange={setDraft}
                    onOptionSelect={handleOptionSelect}
                    onTextSubmit={handleTextSubmit}
                    onEdit={handleEdit}
                  />
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setWizardStep("chat")}
                  className="mb-3 flex items-center gap-1 text-[13px] font-medium text-[var(--text-secondary)]"
                >
                  ← 이전 단계로
                </button>
                <Step2Form />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ---------- 비밀번호 잠금 (이 화면 전용) ----------

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SIGNUP_LOCK_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)]">
      <form onSubmit={handleSubmit} className="flex w-[280px] flex-col items-center gap-3 px-6 py-10 text-center">
        <p className="text-[14px] font-semibold text-[var(--text-primary)]">비밀번호를 입력해주세요</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className={inputClass}
          placeholder="비밀번호"
          autoFocus
        />
        {error ? (
          <p className="text-[12px] font-medium text-[var(--accent)]">비밀번호가 올바르지 않습니다</p>
        ) : null}
        <button type="submit" className={`${primaryButtonClass} w-full`}>
          확인
        </button>
      </form>
    </div>
  );
}

export default function SignupTabletSmsScreen() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <SignupTabletSmsContent />;
}
