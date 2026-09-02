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

const secondaryButtonClass =
  "rounded-[8px] border border-[var(--border)] px-[20px] py-[9px] text-[13px] font-medium text-[var(--text-secondary)]";

const quickReplyClass =
  "rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-[13px] font-medium text-[var(--text-primary)]";

// ---------- STEP 1: 대화형 질문 ----------

type StepId =
  | "joinType"
  | "bizType"
  | "terms"
  | "reportNo"
  | "passAuth"
  | "passCarrier"
  | "shopExp"
  | "shopService"
  | "done";

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
  joinType: {
    question: "가입 유형을 선택해주세요.",
    options: [
      { label: "신규", value: "new" },
      { label: "기존 회원", value: "existing" },
    ],
  },
  bizType: {
    question: "사업자 정보를 선택해주세요.",
    options: [
      { label: "개인사업자", value: "individual" },
      { label: "법인사업자", value: "corporate" },
    ],
  },
  terms: {
    question: "이용약관에 동의해주세요.",
    options: [
      { label: "전체 동의합니다", value: "agree-all" },
      { label: "하나씩 확인할게요", value: "agree-each" },
    ],
  },
  reportNo: {
    question: "통신판매신고번호 상태를 알려주세요.",
    options: [
      { label: "입력", value: "input" },
      { label: "비대상", value: "na" },
      { label: "준비중", value: "pending" },
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
  shopExp: {
    question: "쇼핑몰 운영 경험이 있으신가요?",
    options: [
      { label: "없음", value: "none" },
      { label: "타 서비스 이용", value: "other" },
    ],
  },
  shopService: {
    question: "기존에 이용한 쇼핑몰 서비스를 선택해주세요.",
    options: [
      { label: "카페24", value: "cafe24" },
      { label: "스마트스토어", value: "smartstore" },
      { label: "아임웹", value: "imweb" },
      { label: "식스샵", value: "sixshop" },
      { label: "기타", value: "etc" },
    ],
  },
};

function getNextStepId(step: StepId, value: string): StepId {
  switch (step) {
    case "joinType":
      return "bizType";
    case "bizType":
      return "terms";
    case "terms":
      return "reportNo";
    case "reportNo":
      return "passAuth";
    case "passAuth":
      return "passCarrier";
    case "passCarrier":
      return "shopExp";
    case "shopExp":
      return value === "other" ? "shopService" : "done";
    case "shopService":
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
    <div className="flex flex-col gap-3">
      {messages.map((m) =>
        m.from === "bot" ? (
          <div key={m.id} className="flex items-end gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--cta)] text-[10px] font-semibold text-white">
              F
            </span>
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[var(--surface-1)] px-4 py-2.5 text-[13px] text-[var(--text-primary)]">
              {m.text}
            </div>
          </div>
        ) : (
          <div key={m.id} className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[var(--cta)] px-4 py-2.5 text-[13px] text-white">
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
      <label className="block text-[12.5px] font-medium text-[var(--text-secondary)]">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Step2Form({ showReportNo }: { showReportNo: boolean }) {
  return (
    <div className="mt-3 rounded-lg border border-[var(--border)] px-6 py-6">
      <div className="flex flex-col gap-5">
        <FormField label="사업자등록번호" required>
          <input className={inputClass} placeholder="숫자만 입력해주세요" />
        </FormField>

        <FormField label="사업자등록증 첨부" required>
          <button type="button" className={secondaryButtonClass}>
            파일 선택
          </button>
        </FormField>

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

        <FormField label="영업 대행사">
          <input className={inputClass} placeholder="영업 대행사가 있다면 입력해주세요" />
        </FormField>

        <FormField label="대표자명" required>
          <input className={inputClass} placeholder="대표자명을 입력해주세요" />
        </FormField>

        <div className="grid grid-cols-2 gap-5">
          <FormField label="업태" required>
            <input className={inputClass} placeholder="업태를 입력해주세요" />
          </FormField>
          <FormField label="업종" required>
            <input className={inputClass} placeholder="업종을 입력해주세요" />
          </FormField>
        </div>

        {showReportNo ? (
          <FormField label="통신판매신고번호" required>
            <input className={inputClass} placeholder="통신판매신고번호를 입력해주세요" />
          </FormField>
        ) : null}

        <FormField label="대표번호" required>
          <input className={inputClass} placeholder="대표번호를 입력해주세요" />
        </FormField>

        <FormField label="팩스번호">
          <input className={inputClass} placeholder="팩스번호를 입력해주세요" />
        </FormField>

        <FormField label="사업장 주소" required>
          <input className={inputClass} placeholder="사업장 주소를 입력해주세요" />
        </FormField>

        <FormField label="담당자 이메일" required>
          <div className="flex gap-2">
            <input type="email" className={inputClass} placeholder="이메일을 입력해주세요" />
            <button type="button" className={`${secondaryButtonClass} shrink-0`}>
              인증메일 발송
            </button>
          </div>
        </FormField>
      </div>

      <div className="mt-8 flex justify-center">
        <button type="button" className={primaryButtonClass}>
          회원가입 완료
        </button>
      </div>
    </div>
  );
}

// ---------- GNB / Footer (기존 회원가입 완료 화면과 동일한 톤 유지) ----------

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

// ---------- 회원가입 본문 (STEP 1 + STEP 2) ----------

function SignupContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "bot-joinType", from: "bot", text: STEP_QUESTIONS.joinType.question },
  ]);
  const [currentStep, setCurrentStep] = useState<StepId>("joinType");
  const [reportNoStatus, setReportNoStatus] = useState<string | null>(null);

  const handleSelect = (option: StepOption) => {
    if (currentStep === "done") return;
    const step = currentStep;
    const next = getNextStepId(step, option.value);

    setMessages((prev) => {
      const updated: ChatMessage[] = [...prev, { id: `user-${step}`, from: "user", text: option.label }];
      if (next !== "done") {
        updated.push({ id: `bot-${next}`, from: "bot", text: STEP_QUESTIONS[next].question });
      }
      return updated;
    });

    if (step === "reportNo") {
      setReportNoStatus(option.value);
    }
    setCurrentStep(next);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border)]">
      <GNB />

      <main className="w-full bg-[var(--bg)] px-10 py-12">
        <h1 className="text-[18px] font-bold text-[var(--text-primary)]">회원가입</h1>

        <p className="mt-8 text-[13px] font-semibold text-[var(--text-muted)]">STEP 1 · 가입 정보 확인</p>
        <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-6 py-6">
          <ChatLog messages={messages} />

          {currentStep !== "done" ? (
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {STEP_QUESTIONS[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={option.primary ? primaryButtonClass : quickReplyClass}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {currentStep === "done" ? (
          <>
            <p className="mt-10 text-[13px] font-semibold text-[var(--text-muted)]">STEP 2 · 상세정보 입력폼</p>
            <Step2Form showReportNo={reportNoStatus === "input"} />
          </>
        ) : null}
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

export default function SignupScreen() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <SignupContent />;
}
