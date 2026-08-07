# 플렉스지 판매자 온보딩 프로세스

플렉스지(쇼핑몰 호스팅사) 판매자 온보딩 10단계 프로세스를 한 화면에 보여주는 정적 페이지입니다.
회원가입 완료부터 운영 권장 설정 안내까지의 흐름을 박스 + 화살표 플로우차트로 세로 배치했고,
3단계(상품 구성 선택)는 "상품 있는 쇼핑몰" / "빈 템플릿" 두 갈래로 분기했다가 다시 합류합니다.

클릭 인터랙션, 상태 전환, 반응형 대응은 없는 단순한 정적 페이지이며, 데스크탑 화면 기준(최대 폭 640px)으로 제작되었습니다.

Next.js 14 (App Router) + TypeScript + Tailwind CSS로 작성되었고, 컴포넌트 분리 없이 `src/app/page.tsx` 한 파일로 구성되어 있습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 빌드

```bash
npm run build
npm run start
```

## Vercel 배포

1. 이 저장소를 GitHub 등 Git 원격 저장소에 푸시합니다.
2. [Vercel](https://vercel.com)에서 `New Project` → 해당 저장소를 선택(Import)합니다.
3. Framework Preset은 자동으로 `Next.js`로 감지됩니다. 별도 환경 변수 없이 기본 설정(Build Command `next build`)으로 배포하면 됩니다.
4. 이후에는 `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.

Vercel CLI로 배포하려면:

```bash
npm i -g vercel
vercel
```
