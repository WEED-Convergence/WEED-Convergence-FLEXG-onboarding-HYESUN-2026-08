import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "플렉스지 판매자 온보딩 프로세스",
  description: "플렉스지(쇼핑몰 호스팅사) 판매자 온보딩 10단계 프로세스 안내",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main className="min-h-screen bg-white px-6 py-10">
          <div className="mx-auto flex max-w-[1100px] items-start gap-8">
            {/* 좌측: 인덱스 목록 영역 (모든 화면 공통 고정) */}
            <aside className="sticky top-10 w-[200px] shrink-0 self-start">
              <a
                href="/#top"
                className="text-[13px] font-semibold text-slate-900 hover:underline"
              >
                플렉스지 판매자 온보딩 프로세스
              </a>
              <nav className="mt-3 space-y-1.5">
                <a
                  href="/template-select"
                  className="block text-[13px] text-slate-600 hover:underline"
                >
                  템플릿 선택
                </a>
                <a
                  href="/product-selection"
                  className="block text-[13px] text-slate-600 hover:underline"
                >
                  상품 구성 선택
                </a>
              </nav>
            </aside>

            {/* 가운데: 콘텐츠 영역 (화면별로 교체) */}
            <div className="min-w-0 flex-1">{children}</div>

            {/* 우측: 화면 설명 영역 (모든 화면 공통 고정) */}
            <aside className="sticky top-10 w-[280px] shrink-0 self-start">
              <p className="text-[12px] font-semibold text-slate-400">프로세스 개요</p>
            </aside>
          </div>
        </main>
      </body>
    </html>
  );
}
