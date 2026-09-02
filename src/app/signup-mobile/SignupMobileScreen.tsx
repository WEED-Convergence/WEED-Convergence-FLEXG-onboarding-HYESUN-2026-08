"use client";

import { useState } from "react";

function RequiredMark() {
  return <span className="ml-0.5 text-[var(--accent)]">*</span>;
}

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-[9px] text-[13px] text-[var(--text-primary)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent-text)]";

const primaryButtonClass =
  "rounded-[8px] bg-[var(--cta)] px-[20px] py-[10px] text-[13px] font-medium text-white";

const secondaryButtonClass =
  "rounded-[8px] border border-[var(--border)] px-[14px] py-[9px] text-[12px] font-medium text-[var(--text-secondary)]";

const quickReplyClass =
  "rounded-full border border-[var(--border)] bg-[var(--bg)] px-3.5 py-[7px] text-[12.5px] font-medium text-[var(--text-primary)]";

// ---------- STEP 1: 대화형 질문 ----------

type StepId = "bizType" | "passAuth" | "passCarrier" | "terms" | "done";

interface StepOption {
  label: string;
  value: string;
  primary?: boolean;
}

interface StepConfig {
  question: string;
  options: StepOption[];
}

const STEP_QUESTIONS: Record<Exclude<StepId, "done">, StepConfig> = {
  bizType: {
    question: "사업자 정보를 선택해주세요.",
    options: [
      { label: "개인사업자", value: "individual" },
      { label: "법인사업자", value: "corporate" },
    ],
  },
  passAuth: {
    question: "담당자 본인인증을 진행해주세요.",
    options: [{ label: "PASS로 인증하기", value: "pass", primary: true }],
  },
  passCarrier: {
    question: "통신사를 선택해주세요.",
    options: [
      { label: "SKT", value: "skt" },
      { label: "KT", value: "kt" },
      { label: "LG U+", value: "lguplus" },
    ],
  },
  terms: {
    question: "이용약관에 동의해주세요.",
    options: [{ label: "전체 동의합니다", value: "agree-all" }],
  },
};

function getNextStepId(step: StepId): StepId {
  switch (step) {
    case "bizType":
      return "passAuth";
    case "passAuth":
      return "passCarrier";
    case "passCarrier":
      return "terms";
    case "terms":
      return "done";
    default:
      return "done";
  }
}

interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
}

function ChatLog({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {messages.map((m) =>
        m.from === "bot" ? (
          <div key={m.id} className="flex items-end gap-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--cta)] text-[9px] font-semibold text-white">
              F
            </span>
            <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-[var(--surface-1)] px-3.5 py-2 text-[12.5px] text-[var(--text-primary)]">
              {m.text}
            </div>
          </div>
        ) : (
          <div key={m.id} className="flex justify-end">
            <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-[var(--cta)] px-3.5 py-2 text-[12.5px] text-white">
              {m.text}
            </div>
          </div>
        )
      )}
    </div>
  );
}

// ---------- STEP 2: 상세정보 입력폼 ----------

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
      <label className="block text-[12px] font-medium text-[var(--text-secondary)]">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Step2Form() {
  return (
    <div className="mt-3 rounded-lg border border-[var(--border)] px-4 py-5">
      <div className="flex flex-col gap-4">
        <FormField label="회사명" required>
          <input className={inputClass} placeholder="회사명을 입력해주세요" />
        </FormField>

        <FormField label="쇼핑몰명" required>
          <input className={inputClass} placeholder="쇼핑몰명을 입력해주세요" />
        </FormField>

        <FormField label="아이디" required>
          <input className={inputClass} placeholder="아이디를 입력해주세요" />
        </FormField>

        <FormField label="비밀번호" required>
          <input type="password" className={inputClass} placeholder="비밀번호를 입력해주세요" />
        </FormField>

        <FormField label="담당자 이메일" required>
          <div className="flex flex-col gap-2">
            <input type="email" className={inputClass} placeholder="이메일을 입력해주세요" />
            <button type="button" className={`${secondaryButtonClass} w-full`}>
              인증발송
            </button>
          </div>
        </FormField>
      </div>

      <div className="mt-6 flex justify-center">
        <button type="button" className={`${primaryButtonClass} w-full`}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
}

// ---------- GNB / Footer (기존과 동일한 톤, 모바일 360px 폭) ----------

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" />
    </svg>
  );
}

function MobileGNB() {
  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#1A1A1A] px-4">
      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-semibold text-slate-900">
          F
        </span>
        <span className="text-[14px] font-semibold tracking-tight text-white">FLEX-G</span>
      </div>
      <span className="flex h-6 w-6 items-center justify-center text-white/80">
        <HamburgerIcon />
      </span>
    </header>
  );
}

function MobileFooter() {
  const policyLinks = ["회사소개", "이용약관", "개인정보처리방침"];

  return (
    <footer className="w-full shrink-0 bg-[#1A1A1A] px-4 pt-6 pb-5 text-slate-300">
      <p className="text-[14px] font-semibold text-white">FLEX-G</p>
      <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400">
        서울특별시 금천구 벚꽃로 298 대륭포스트타워6차 313호
        <br />
        대표이사 김형준·김동재
        <br />
        사업자번호 158-86-01603
        <br />
        고객센터 070-7771-5866
      </p>
      <nav className="mt-4 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[11px]">
        {policyLinks.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </nav>
      <p className="mt-4 text-[10px] text-slate-500">ⓒ WEEDSOFT Corp.</p>
    </footer>
  );
}

// ---------- 회원가입 본문 (STEP 1 + STEP 2) ----------

export default function SignupMobileScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "bot-bizType", from: "bot", text: STEP_QUESTIONS.bizType.question },
  ]);
  const [currentStep, setCurrentStep] = useState<StepId>("bizType");

  const handleSelect = (option: StepOption) => {
    if (currentStep === "done") return;
    const step = currentStep;
    const next = getNextStepId(step);

    setMessages((prev) => {
      const updated: ChatMessage[] = [...prev, { id: `user-${step}`, from: "user", text: option.label }];
      if (next !== "done") {
        updated.push({ id: `bot-${next}`, from: "bot", text: STEP_QUESTIONS[next].question });
      }
      return updated;
    });

    setCurrentStep(next);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[360px] shrink-0 overflow-hidden rounded-xl border border-[var(--border)]">
        <MobileGNB />

        <main className="w-full bg-[var(--bg)] px-4 py-6">
          <h1 className="text-[16px] font-bold text-[var(--text-primary)]">회원가입</h1>

          <p className="mt-5 text-[12px] font-semibold text-[var(--text-muted)]">STEP 1 · 가입 정보 확인</p>
          <div className="mt-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-4">
            <ChatLog messages={messages} />

            {currentStep !== "done" ? (
              <div className="mt-3.5 flex flex-wrap justify-end gap-1.5">
                {STEP_QUESTIONS[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={option.primary ? `${primaryButtonClass} w-full` : quickReplyClass}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {currentStep === "done" ? (
            <>
              <p className="mt-7 text-[12px] font-semibold text-[var(--text-muted)]">STEP 2 · 상세정보 입력폼</p>
              <Step2Form />
            </>
          ) : null}
        </main>

        <MobileFooter />
      </div>
    </div>
  );
}
