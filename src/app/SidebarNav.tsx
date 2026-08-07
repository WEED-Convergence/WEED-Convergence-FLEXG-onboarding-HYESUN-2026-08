"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/template-select", label: "템플릿 선택" },
  { href: "/alimtalk-preview", label: "알림톡 예시" },
];

const specDocs = [
  { href: "/signup-complete", label: "디자인 템플릿 선택" },
  { href: "/template-preview", label: "템플릿 미리보기" },
  { href: "/approval-pending", label: "승인 대기" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";

  return (
    <div>
      {/* 그룹 1: 협의중 */}
      <div>
        <p className="text-[12px] font-bold text-[var(--text-muted)]">협의중</p>
        <div className="mb-3 mt-1.5 border-t border-[var(--border)]" />

        <a
          href="/#top"
          className={`text-[13px] hover:underline ${
            isHomeActive ? "font-semibold text-slate-900" : "font-normal text-slate-500"
          }`}
        >
          플렉스지 판매자 온보딩 프로세스
        </a>
        <nav className="mt-3 space-y-1.5">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block text-[13px] hover:underline ${
                  active ? "font-semibold text-slate-900" : "font-normal text-slate-500"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* 그룹 2: 기획서 */}
      <div className="mt-6">
        <p className="text-[12px] font-bold text-[var(--text-muted)]">기획서</p>
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
                    active ? "font-semibold text-slate-900" : "font-normal text-slate-500"
                  }`}
                >
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
