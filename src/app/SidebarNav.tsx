"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/template-select", label: "템플릿 선택" },
  { href: "/product-selection", label: "상품 구성 선택" },
  { href: "/alimtalk-preview", label: "알림톡 예시" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";

  return (
    <>
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
    </>
  );
}
