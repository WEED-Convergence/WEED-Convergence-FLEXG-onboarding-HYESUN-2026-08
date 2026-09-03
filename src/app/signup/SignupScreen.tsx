"use client";

import { useState } from "react";

function RequiredMark() {
  return <span className="ml-0.5 text-[#d8342a]">*</span>;
}

const inputClass =
  "w-full rounded-md border border-black bg-white px-3 py-[9px] text-[13px] text-black placeholder:text-gray-400 outline-none";

const primaryRedButtonClass =
  "rounded-[8px] bg-[#E24B4A] px-[24px] py-[10px] text-[13px] font-medium text-white";

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
      <label className="block text-[12.5px] font-bold text-black">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

// ---------- 상단 프로모션 바 ----------

function PromoBar() {
  return (
    <div className="flex h-9 w-full shrink-0 items-center justify-center gap-4 bg-[#2c2c2a] px-4 text-[12px] text-white">
      <button type="button" aria-label="이전 프로모션" className="flex h-5 w-5 items-center justify-center text-white/70">
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span>지금 가입하면 첫 달 이용료 무료! 플렉스지와 함께 쇼핑몰을 시작하세요.</span>
      <button type="button" aria-label="다음 프로모션" className="flex h-5 w-5 items-center justify-center text-white/70">
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

// ---------- GNB / Footer ----------

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

// ---------- 이용약관 동의 (라디오 버튼 형태) ----------

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

function TermRadio({ name }: { name: string }) {
  return (
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
      <input type="radio" name={name} className="peer absolute inset-0 h-4 w-4 cursor-pointer opacity-0" />
      <span className="h-4 w-4 rounded-full border-2 border-black bg-white peer-checked:border-[#d8342a]" />
      <span className="absolute h-[7px] w-[7px] rounded-full bg-[#d8342a] opacity-0 peer-checked:opacity-100" />
    </span>
  );
}

function TermsAgreement() {
  return (
    <div className="overflow-hidden rounded-lg border border-black bg-white">
      <label className="flex items-center gap-2 px-4 py-3 text-[13px] font-bold text-black">
        <TermRadio name="term-all" />
        약관 전체 동의
      </label>

      <div className="border-t border-black" />

      {termRows.map((term) => (
        <div key={term.id} className="flex items-center justify-between px-4 py-3">
          <label className="flex items-center gap-2 text-[12.5px] text-black">
            <TermRadio name={`term-${term.id}`} />
            {term.required ? (
              <span className="font-bold text-[#d8342a]">[필수]</span>
            ) : (
              <span className="font-bold text-gray-400">[선택]</span>
            )}
            {term.label}
          </label>
          {term.linkLabel ? (
            <span className="text-[11px] text-gray-500 underline">{term.linkLabel}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ---------- PASS 본인인증 팝업 ----------

const carrierOptions = ["SKT", "KT", "LG U+", "SKT 알뜰폰", "KT 알뜰폰", "LG U+ 알뜰폰"];

function PassAuthModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 px-8">
      <div className="w-full max-w-[380px] rounded-xl bg-white px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-black">PASS 본인인증</p>
          <button type="button" onClick={onClose} className="flex h-6 w-6 items-center justify-center text-gray-500">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5L19 19M19 5L5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-[12.5px] text-gray-500">통신사를 선택해주세요.</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {carrierOptions.map((carrier) => (
            <button
              key={carrier}
              type="button"
              onClick={onClose}
              className="rounded-md border border-black px-3 py-2.5 text-[12.5px] font-medium text-black"
            >
              {carrier}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- 회원가입 폼 ----------

export default function SignupScreen() {
  const [passModalOpen, setPassModalOpen] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[var(--border)]">
      <PromoBar />
      <GNB />

      <main className="flex w-full justify-center bg-white py-14">
        <div className="w-[480px] shrink-0 px-6">
          <h1 className="text-center text-[24px] font-bold text-black">회원가입</h1>

          <div className="mt-8 space-y-5">
            <FormField label="아이디" required>
              <input className={inputClass} placeholder="아이디를 입력해주세요" />
            </FormField>

            <FormField label="비밀번호" required>
              <input type="password" className={inputClass} placeholder="비밀번호를 입력해주세요" />
            </FormField>

            <FormField label="담당자 본인인증" required>
              <button type="button" onClick={() => setPassModalOpen(true)} className={primaryRedButtonClass}>
                담당자 인증
              </button>
            </FormField>

            <FormField label="담당자 이메일" required>
              <input type="email" className={inputClass} placeholder="이메일을 입력해주세요" />
            </FormField>

            <div>
              <p className="text-[13px] font-bold text-black">
                이용약관 동의
                <RequiredMark />
              </p>
              <div className="mt-2">
                <TermsAgreement />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button type="button" className={primaryRedButtonClass}>
              회원가입 완료
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {passModalOpen ? <PassAuthModal onClose={() => setPassModalOpen(false)} /> : null}
    </div>
  );
}
