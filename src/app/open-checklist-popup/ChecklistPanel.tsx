"use client";

import { useState } from "react";

interface ChecklistItemData {
  id: number;
  title: string;
  description: string;
  duration: string;
  previewTitle: string;
  previewRows: string[];
  buttonText: string;
}

interface CategoryData {
  name: string;
  itemIds: number[];
}

const items: ChecklistItemData[] = [
  {
    id: 1,
    title: "PG 신청하기",
    description: "결제대행사(PG) 신청을 진행해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "PG 계약 정보 입력",
    previewRows: ["상호명: 이수모 스토어", "사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
    buttonText: "신청 페이지로",
  },
  {
    id: 2,
    title: "공급사 등록하기",
    description:
      "상품을 공급받을 업체 정보를 등록해 주세요. 자체배송인 경우 사업자 정보로 등록하면 됩니다.",
    duration: "약 2분이면 완료",
    previewTitle: "공급사 정보 입력",
    previewRows: ["공급사명: (주)이수모상사", "담당자: 김담당", "연락처: 02-123-4567"],
    buttonText: "등록 페이지로",
  },
  {
    id: 3,
    title: "상품 등록하기",
    description: "판매할 상품을 3개 이상 등록해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "상품 등록",
    previewRows: ["상품명: 베이직 티셔츠", "가격: 19,900원", "재고: 100개"],
    buttonText: "상품 등록하러 가기",
  },
  {
    id: 4,
    title: "유선번호 등록하기",
    description: "고객 문의용 유선번호를 입력해 주세요.",
    duration: "약 1분이면 완료",
    previewTitle: "고객센터 연락처",
    previewRows: ["유선번호: 02-1234-5678"],
    buttonText: "설정 페이지로",
  },
  {
    id: 5,
    title: "사업자 정보 · 통신판매업신고번호 입력",
    description: "쇼핑몰 하단에 노출될 사업자 정보와 통신판매업신고번호를 입력해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "사업자 정보",
    previewRows: [
      "상호명: 이수모 스토어",
      "대표자: 이수모",
      "통신판매업신고번호: 2026-서울금천-0001",
    ],
    buttonText: "정보 입력하러 가기",
  },
  {
    id: 6,
    title: "발신번호 신청하기",
    description: "인증번호·주문 안내 문자에 사용할 발신번호를 등록해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "발신번호 신청",
    previewRows: ["신청 번호: 02-1234-5678", "서류: 통신서비스 이용증명원"],
    buttonText: "신청 페이지로",
  },
  {
    id: 7,
    title: "SNS 간편 로그인 등록(카카오, 네이버)",
    description: "고객이 카카오·네이버 계정으로 바로 로그인할 수 있도록 키값을 등록해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "간편로그인 설정",
    previewRows: ["카카오 REST API 키: ****", "네이버 Client ID: ****"],
    buttonText: "키값 등록하러 가기",
  },
  {
    id: 8,
    title: "알림톡 등록하기",
    description: "카카오 비즈니스 채널 개설 및 심사 완료 후 채널을 등록해 주세요.",
    duration: "약 10분이면 완료 (채널 심사 대기 별도)",
    previewTitle: "알림톡 채널 연동",
    previewRows: ["카카오 채널 ID: @isumo_store"],
    buttonText: "채널 등록하러 가기",
  },
  {
    id: 9,
    title: "SEO 설정하기",
    description: "검색 유입을 높이기 위한 페이지 제목, 설명, 키워드를 설정해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "SEO 설정",
    previewRows: ["페이지 제목: 이수모 스토어 - 베이직 캐주얼", "설명: 데일리룩 전문 쇼핑몰"],
    buttonText: "SEO 설정하러 가기",
  },
  {
    id: 10,
    title: "팝빌 신청하기",
    description: "무통장 입금을 자동으로 확인해주는 팝빌 서비스를 신청해 주세요.",
    duration: "약 2분이면 완료",
    previewTitle: "팝빌 연동 신청",
    previewRows: ["사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
    buttonText: "팝빌 신청하러 가기",
  },
  {
    id: 11,
    title: "CRM 캠페인 설정하기",
    description: "고객 대상 알림톡·문자 캠페인을 설정해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "캠페인 빌더",
    previewRows: ["캠페인 유형: 신규가입 웰컴", "발송시점: 가입 직후"],
    buttonText: "캠페인 만들러 가기",
  },
  {
    id: 12,
    title: "라이브커머스 연동하기",
    description: "실시간 방송으로 상품을 판매할 수 있도록 라이브커머스 기능을 연동해 주세요.",
    duration: "약 4분이면 완료",
    previewTitle: "라이브 설정",
    previewRows: ["방송 채널: 미연동", "판매 상품: 미지정"],
    buttonText: "라이브 연동하러 가기",
  },
  {
    id: 13,
    title: "디자인 설정하기",
    description: "선택한 템플릿의 색상, 폰트, 배너 등을 원하는 대로 꾸며주세요.",
    duration: "약 10분이면 완료",
    previewTitle: "디자인 편집",
    previewRows: ["테마 색상: 기본", "로고: 미등록", "메인 배너: 미등록"],
    buttonText: "디자인 편집하러 가기",
  },
];

const categories: CategoryData[] = [
  { name: "결제 준비", itemIds: [1, 2, 3, 4, 5] },
  { name: "운영 필수 정보", itemIds: [6, 7, 8] },
  { name: "권장 설정 기능", itemIds: [9, 10] },
  { name: "매출 확장 기능", itemIds: [11, 12, 13] },
];

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#993556" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemCircle({ active }: { active: boolean }) {
  return (
    <span
      className="h-3.5 w-3.5 shrink-0 rounded-full border"
      style={{ borderColor: active ? "#D8342A" : "#C7C5BB" }}
    />
  );
}

export default function ChecklistPanel() {
  const [selectedId, setSelectedId] = useState(1);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <div className="flex w-full items-stretch bg-white">
      <div className="w-[300px] shrink-0 bg-[#FAF9F5] p-5">
          {categories.map((category) => (
            <div key={category.name} className="mb-5 last:mb-0">
              <p className="text-[13px] font-bold text-[#2C2C2A]">{category.name}</p>
              <div className="mt-2 h-1 w-full rounded-full bg-[#E4E2D8]">
                <div className="h-1 rounded-full bg-[#D8342A]" style={{ width: "0%" }} />
              </div>
              <p className="mt-1 text-[10px] text-[#9A9890]">
                0/{category.itemIds.length}개 · 0%
              </p>

              <div className="mt-2.5 space-y-1">
                {category.itemIds.map((id) => {
                  const item = items.find((it) => it.id === id)!;
                  const active = id === selectedId;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedId(id)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px]"
                      style={{
                        backgroundColor: active ? "#FBEAF0" : "transparent",
                        color: active ? "#993556" : "#5F5E5A",
                      }}
                    >
                      <ItemCircle active={active} />
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="pr-6">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#9A9890]">전체 진행률</span>
              <span className="text-[12px] text-[#9A9890]">0/13개 · 0%</span>
            </div>
            <div className="mt-1.5 h-[5px] w-full rounded-full bg-[#E4E2D8]">
              <div className="h-[5px] rounded-full bg-[#D8342A]" style={{ width: "0%" }} />
            </div>
          </div>

          <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FBEAF0] px-3 py-1.5 text-[13px] font-bold text-[#993556]">
            <ClockIcon />
            {selected.duration}
          </div>

          <h2 className="mt-3 text-[20px] font-bold text-[#2C2C2A]">{selected.title}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#888780]">{selected.description}</p>

          <div className="mt-4 w-[180px] rounded-[10px] border border-[#E4E2D8] bg-[#FAF9F5] p-3 text-left">
            <p className="text-[11px] font-semibold text-[#2C2C2A]">{selected.previewTitle}</p>
            <div className="mt-1.5 space-y-1">
              {selected.previewRows.map((row) => (
                <p key={row} className="text-[10px] leading-snug text-[#888780]">
                  {row}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-auto flex gap-2.5 pt-6">
            <span className="flex-1 rounded-lg border border-[#E4E2D8] py-2.5 text-center text-[13px] font-medium text-[#5F5E5A]">
              건너뛰기
            </span>
            <span className="flex-1 rounded-lg bg-[#2C2C2A] py-2.5 text-center text-[13px] font-medium text-white">
              {selected.buttonText}
            </span>
          </div>
        </div>
      </div>
  );
}
