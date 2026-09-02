"use client";

import { usePathname } from "next/navigation";

const specDocs = [
  { href: "/policy", label: "정책", highlight: true },
  { href: "/signup", label: "회원가입" },
  { href: "/signup-complete", label: "디자인 템플릿 선택" },
  { href: "/template-preview", label: "템플릿 미리보기" },
  { href: "/approval-pending", label: "승인 대기" },
  { href: "/home-with-checklist", label: "홈" },
  { href: "/open-checklist-popup", label: "오픈 체크리스트" },
  { href: "/message-collection", label: "메시지 모음" },
  { href: "/bubble-cases", label: "말풍선 케이스" },
  { href: "/sa", label: "SA (판매자 온보딩 관리)" },
  { href: "/pg-application", label: "PG사 신청(작업중)" },
  { href: "/signup-mobile", label: "회원가입(모바일)" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";

  return (
    <div>
      {/* 그룹 1: 협의완료 */}
      <div>
        <p className="text-[12px] font-semibold text-[var(--text-muted)]">협의완료</p>
        <div className="mb-3 mt-1.5 border-t border-[var(--border)]" />

        <a
          href="/#top"
          className={`text-[13px] hover:underline ${
            isHomeActive ? "font-semibold text-[var(--text-primary)]" : "font-normal text-[var(--text-secondary)]"
          }`}
        >
          플렉스지 판매자 온보딩 프로세스
        </a>
      </div>

      {/* 그룹 2: 기획서 */}
      <div className="mt-6">
        <p className="text-[12px] font-semibold text-[var(--text-muted)]">기획서</p>
        <div className="mb-3 mt-1.5 border-t border-[var(--border)]" />
        {specDocs.length > 0 ? (
          <nav className="space-y-1.5">
            {specDocs.map((doc) => {
              const active = pathname === doc.href;
              return (
                <a
                  key={doc.href}
                  href={doc.href}
                  className={`block text-[13px] hover:underline ${
                    active ? "font-semibold text-[var(--text-primary)]" : "font-normal text-[var(--text-secondary)]"
                  }`}
                >
                  {doc.highlight ? (
                    <span className="mr-1 text-[var(--accent)]">★</span>
                  ) : null}
                  {doc.label}
                </a>
              );
            })}
          </nav>
        ) : (
          <p className="text-[12px] text-[var(--text-muted)]">아직 등록된 기획서가 없습니다</p>
        )}
      </div>
    </div>
  );
}
