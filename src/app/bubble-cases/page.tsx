export const metadata = {
  title: "말풍선 케이스",
};

interface BubbleCaseRow {
  completedItem: string;
  title: string;
  description: string;
  button1: string;
  button2: string;
}

const bubbleCases: BubbleCaseRow[] = [
  {
    completedItem: "(시작 전)",
    title: "PG 신청부터 시작할까요?",
    description: "결제 준비를 마치면 오픈이 빨라져요.",
    button1: "닫기",
    button2: "시작하기",
  },
  {
    completedItem: "PG 신청하기",
    title: "PG 신청을 완료하셨어요!",
    description: "이어서 무통장입금 설정을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "무통장입금 설정하기",
    title: "무통장입금 설정을 완료하셨어요!",
    description: "이어서 공급사 등록을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "공급사 등록하기",
    title: "공급사 등록을 완료하셨어요!",
    description: "이어서 상품 등록을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "상품 등록하기",
    title: "상품 등록을 완료하셨어요!",
    description: "이어서 유선번호 등록을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "유선번호 등록하기",
    title: "유선번호 등록을 완료하셨어요!",
    description: "이어서 사업자 정보를 입력해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "사업자 정보 입력 (카테고리 완료)",
    title: "결제 준비를 모두 마치셨어요!",
    description: "다음은 운영 필수 기능예요.",
    button1: "닫기",
    button2: "다음 단계",
  },
  {
    completedItem: "발신번호 신청하기",
    title: "발신번호 신청을 완료하셨어요!",
    description: "이어서 SNS 간편 로그인 등록을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "SNS 간편 로그인 등록",
    title: "SNS 간편 로그인 등록을 완료하셨어요!",
    description: "이어서 알림톡을 등록해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "알림톡 등록하기 (카테고리 완료)",
    title: "운영 필수 기능를 모두 마치셨어요!",
    description: "다음은 권장 설정 기능이에요.",
    button1: "닫기",
    button2: "다음 단계",
  },
  {
    completedItem: "SEO 설정하기",
    title: "SEO 설정을 완료하셨어요!",
    description: "이어서 팝빌 신청을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "팝빌 신청하기",
    title: "팝빌 신청을 완료하셨어요!",
    description: "이어서 약관을 확인해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "약관 확인하기",
    title: "약관 확인을 완료하셨어요!",
    description: "이어서 보안 설정을 진행해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "보안 설정하기 (카테고리 완료)",
    title: "권장 설정 기능을 모두 마치셨어요!",
    description: "다음은 매출 확장 기능이에요.",
    button1: "닫기",
    button2: "다음 단계",
  },
  {
    completedItem: "CRM 설정하기",
    title: "CRM 캠페인 설정을 완료하셨어요!",
    description: "이어서 라이브커머스를 설정해볼까요?",
    button1: "닫기",
    button2: "이어하기",
  },
  {
    completedItem: "라이브커머스 설정하기 (전체 완료)",
    title: "— 말풍선 노출 안 함 —",
    description: "",
    button1: "",
    button2: "",
  },
];

const bubbleCaseColumns = ["완료된 항목", "말풍선 제목", "말풍선 설명", "버튼 1", "버튼 2"];

export default function BubbleCasesPage() {
  return (
    <div>
      <p className="text-[13px] font-medium text-[var(--text-primary)]">말풍선 케이스 정리</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[900px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="bg-[var(--surface-1)]">
              {bubbleCaseColumns.map((column) => (
                <th
                  key={column}
                  className="border-b border-[var(--border)] px-4 py-2.5 font-medium text-[var(--text-primary)]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bubbleCases.map((row) => (
              <tr key={row.completedItem} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-2.5 text-[var(--text-primary)]">{row.completedItem}</td>
                <td className="px-4 py-2.5 text-[var(--text-primary)]">{row.title}</td>
                <td className="px-4 py-2.5 text-[var(--text-muted)]">{row.description || "-"}</td>
                <td className="px-4 py-2.5 text-[var(--text-muted)]">{row.button1 || "-"}</td>
                <td className="px-4 py-2.5 text-[var(--text-muted)]">{row.button2 || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
