"use client";

import { useState } from "react";

interface ChecklistItemData {
  id: number;
  title: string;
  description: string;
  duration: string;
  previewTitle: string;
  previewRows: string[];
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
  },
  {
    id: 14,
    title: "무통장입금 계좌 정보 입력하기",
    description: "무통장 입금 시 사용할 정산계좌 정보를 입력해 주세요.",
    duration: "약 1분이면 완료",
    previewTitle: "무통장입금 계좌 정보",
    previewRows: ["은행: 신한은행", "계좌번호: 110-123-456789", "예금주: 이수모"],
  },
  {
    id: 2,
    title: "공급사 등록하기",
    description:
      "상품을 공급받을 업체 정보를 등록해 주세요. 자체배송인 경우 사업자 정보로 등록하면 됩니다.",
    duration: "약 2분이면 완료",
    previewTitle: "공급사 정보 입력",
    previewRows: ["공급사명: (주)이수모상사", "담당자: 김담당", "연락처: 02-123-4567"],
  },
  {
    id: 3,
    title: "상품 등록하기",
    description: "판매할 상품을 3개 이상 등록해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "상품 등록",
    previewRows: ["상품명: 베이직 티셔츠", "가격: 19,900원", "재고: 100개"],
  },
  {
    id: 4,
    title: "유선번호 등록하기",
    description: "고객 문의용 유선번호를 입력해 주세요.",
    duration: "약 1분이면 완료",
    previewTitle: "고객센터 연락처",
    previewRows: ["유선번호: 02-1234-5678"],
  },
  {
    id: 5,
    title: "사업자 정보 · 통신판매업신고번호 입력",
    description: "",
    duration: "약 3분이면 완료",
    previewTitle: "사업자 정보",
    previewRows: [
      "상호명: 이수모 스토어",
      "대표자: 이수모",
      "통신판매업신고번호: 2026-서울금천-0001",
    ],
  },
  {
    id: 6,
    title: "발신번호 신청하기",
    description: "인증번호·주문 안내 문자에 사용할 발신번호를 등록해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "발신번호 신청",
    previewRows: ["신청 번호: 02-1234-5678", "서류: 통신서비스 이용증명원"],
  },
  {
    id: 7,
    title: "SNS 간편 로그인 등록(카카오, 네이버)",
    description: "고객이 카카오·네이버 계정으로 바로 로그인할 수 있도록 키값을 등록해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "간편로그인 설정",
    previewRows: ["카카오 REST API 키: ****", "네이버 Client ID: ****"],
  },
  {
    id: 8,
    title: "알림톡 등록하기",
    description: "카카오 비즈니스 채널 개설 및 심사 완료 후 채널을 등록해 주세요.",
    duration: "약 10분이면 완료 (채널 심사 대기 별도)",
    previewTitle: "알림톡 채널 연동",
    previewRows: ["카카오 채널 ID: @isumo_store"],
  },
  {
    id: 9,
    title: "SEO 설정하기",
    description: "검색 유입을 높이기 위한 페이지 제목, 설명, 키워드를 설정해 주세요.",
    duration: "약 3분이면 완료",
    previewTitle: "SEO 설정",
    previewRows: ["페이지 제목: 이수모 스토어 - 베이직 캐주얼", "설명: 데일리룩 전문 쇼핑몰"],
  },
  {
    id: 10,
    title: "팝빌 신청하기",
    description: "무통장 입금을 자동으로 확인해주는 팝빌 서비스를 신청해 주세요.",
    duration: "약 2분이면 완료",
    previewTitle: "팝빌 연동 신청",
    previewRows: ["사업자번호: 123-45-...", "정산계좌: 신한 110-..."],
  },
  {
    id: 11,
    title: "CRM 캠페인 설정하기",
    description: "고객 대상 알림톡·문자 캠페인을 설정해 주세요.",
    duration: "약 5분이면 완료",
    previewTitle: "캠페인 빌더",
    previewRows: ["캠페인 유형: 신규가입 웰컴", "발송시점: 가입 직후"],
  },
  {
    id: 12,
    title: "라이브커머스 연동하기",
    description: "실시간 방송으로 상품을 판매할 수 있도록 라이브커머스 기능을 연동해 주세요.",
    duration: "약 4분이면 완료",
    previewTitle: "라이브 설정",
    previewRows: ["방송 채널: 미연동", "판매 상품: 미지정"],
  },
  {
    id: 13,
    title: "디자인 설정하기",
    description: "선택한 템플릿의 색상, 폰트, 배너 등을 원하는 대로 꾸며주세요.",
    duration: "약 10분이면 완료",
    previewTitle: "디자인 편집",
    previewRows: ["테마 색상: 기본", "로고: 미등록", "메인 배너: 미등록"],
  },
];

const categories: CategoryData[] = [
  { name: "결제 준비", itemIds: [1, 14, 2, 3, 4, 5] },
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

function RequiredMark() {
  return <span className="mr-1 text-[#639922]">✔</span>;
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#D8342A"
      strokeWidth="2"
      className="mt-0.5 shrink-0"
    >
      <path d="M12 3L22 20H2L12 3Z" strokeLinejoin="round" />
      <path d="M12 9.5V14" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="0.6" fill="#D8342A" stroke="none" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-md border border-[#E4E2D8] px-3 py-2 text-[13px] text-[#2C2C2A] placeholder:text-[#B8B6AC] outline-none focus:border-[#993556]";

function RadioOption({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-1.5 text-[13px] text-[#5F5E5A]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 accent-[#993556]"
      />
      {label}
    </label>
  );
}

function BusinessInfoForm() {
  const [bizType, setBizType] = useState("법인사업자");
  const [salesReport, setSalesReport] = useState("비대상");

  return (
    <div className="mt-4 w-full max-w-[600px]">
      <div className="flex items-center gap-2">
        <p className="text-[16px] font-bold text-[#2C2C2A]">사업자 정보</p>
        <span className="text-[11px] text-[#639922]">✔ 표시 필수항목</span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">사업자 구분</p>
          <div className="flex items-center gap-4">
            {["개인사업자", "법인사업자", "개인"].map((label) => (
              <RadioOption
                key={label}
                name="bizType"
                label={label}
                checked={bizType === label}
                onChange={() => setBizType(label)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            상호명
          </p>
          <input type="text" placeholder="상호명 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            대표자 성함
          </p>
          <input type="text" placeholder="성함 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            사업자등록번호
          </p>
          <input type="text" placeholder="사업자등록번호 입력" className={inputClass} />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            업태/업종
          </p>
          <div className="flex gap-2">
            <input type="text" placeholder="업태 입력" className={inputClass} />
            <input type="text" placeholder="업종 입력" className={inputClass} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            통신판매신고번호
          </p>
          <div className="flex items-center gap-4">
            {["비대상", "준비중", "입력"].map((label) => (
              <RadioOption
                key={label}
                name="salesReport"
                label={label}
                checked={salesReport === label}
                onChange={() => setSalesReport(label)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            주소
          </p>
          <div className="flex gap-2">
            <input type="text" placeholder="우편번호" className={inputClass} />
            <button
              type="button"
              className="shrink-0 rounded-md bg-[#F0EFE9] px-4 py-2 text-[13px] font-medium text-[#5F5E5A]"
            >
              우편번호 찾기
            </button>
          </div>
          <div className="mt-2 space-y-2">
            <input type="text" placeholder="기본주소" className={inputClass} />
            <input type="text" placeholder="상세주소" className={inputClass} />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            대표 전화번호
          </p>
          <input type="text" placeholder="연락처 입력" className={inputClass} />
          <div
            className="mt-2 flex items-start gap-2 rounded-lg px-3.5 py-3"
            style={{ border: "1.5px solid #D8342A", backgroundColor: "#FBEAF0" }}
          >
            <WarningIcon />
            <p className="text-[12px] leading-relaxed text-[#5F5E5A]">
              <span className="font-bold text-[#D8342A]">휴대폰 번호로는 심사가 불가능</span>
              하며, 반드시 <span className="font-bold text-[#D8342A]">일반 유선전화</span>로
              등록해 주세요.
              <br />
              안심번호도 대표 전화번호로 등록 가능합니다.
              <br />
              번호 예시) 080, 0507, 0506, 0130, 0030 등
            </p>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[#2C2C2A]">
            <RequiredMark />
            대표 팩스번호
          </p>
          <input type="text" placeholder="연락처 입력" className={inputClass} />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="rounded-md border border-[#E4E2D8] px-6 py-2.5 text-[13px] text-[#9A9890]"
        >
          건너뛰기
        </button>
        <button
          type="button"
          className="rounded-md bg-[#2C2C2A] px-6 py-2.5 text-[13px] font-medium text-white"
        >
          저장하기
        </button>
      </div>
    </div>
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
              <span className="text-[12px] text-[#9A9890]">0/14개 · 0%</span>
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
          {selected.description && (
            <p className="mt-2 text-[13px] leading-relaxed text-[#888780]">{selected.description}</p>
          )}

          {selected.id === 5 ? (
            <BusinessInfoForm />
          ) : (
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
          )}
        </div>
      </div>
  );
}
