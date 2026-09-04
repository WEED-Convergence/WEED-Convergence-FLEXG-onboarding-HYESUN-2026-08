export const metadata = {
  title: "테스트 시나리오",
};

interface ScenarioRow {
  no: number;
  content: string;
  screen: string;
}

const scenarios: ScenarioRow[] = [
  {
    no: 1,
    content:
      "회원가입 필수 항목(아이디, 비밀번호, 담당자 본인인증, 담당자 이메일, 필수 약관 동의 3종)을 모두 입력하고 \"회원가입 완료\"를 클릭하면 계정이 정상 생성되고 승인 대기 상태로 전환되는지 확인한다.",
    screen: "회원가입 → 승인 대기",
  },
  {
    no: 2,
    content:
      "온보딩 절차에서 사업자 유형(개인사업자/법인사업자), 사업자등록증 첨부 여부, 쇼핑몰명 등 상세 항목이 입력한 값 그대로 등록되고, 이후 조회 시에도 동일하게 반영되는지 확인한다.",
    screen: "SA (판매자 온보딩 관리)",
  },
  {
    no: 3,
    content:
      "승인 완료 후 결제 준비 카테고리 항목이 정책에 정의된 순서(사업자 정보 등록 → PG 신청 → 공급사 등록 → 상품 등록)대로 노출되고, 각 항목을 완료할 때마다 다음 항목으로 이어지는 안내 말풍선이 정상 전환되는지 확인한다.",
    screen: "오픈 체크리스트 / 말풍선 케이스",
  },
  {
    no: 4,
    content:
      "PG 신청 미완료 상태에서 승인 후 1일이 경과하면 \"아직 PG 신청을 완료하지 않으셨어요\" 알림톡이 발송되고, 2일 경과 시점까지 미완료 상태가 유지되면 \"쇼핑몰을 오픈하시려면 PG 신청이 먼저 필요해요\" 알림톡이 조건에 맞게 추가 발송되는지 확인한다.",
    screen: "메시지 모음",
  },
  {
    no: 5,
    content:
      "PG 신청 완료 후 결제준비·운영필수 항목 중 미완료 항목이 남아있는 경우 \"PG 신청이 완료되었어요! 오픈 체크리스트에서 이어서 진행해 보세요\" 안내가 정상 노출되는지 확인한다.",
    screen: "메시지 모음",
  },
  {
    no: 6,
    content:
      "PG사로부터 반려 통보를 받은 시점에 \"PG 신청이 반려되었어요\" 알림톡이 발송되고, \"다시 신청하기\" 버튼으로 PG 신청 화면에 재진입해 재신청할 수 있는지, 재신청 후 다시 반려되면 알림톡이 재발송되는지 확인한다.",
    screen: "메시지 모음 / PG사 신청",
  },
  {
    no: 7,
    content:
      "승인 후 5일이 경과한 시점까지 결제준비·운영필수 미완료 항목이 남아있으면 \"쇼핑몰 오픈까지 얼마 남지 않았어요\" 리마인드 알림톡이, 10일 경과 시점까지도 미완료 상태이면 추가 리마인드 알림톡이 조건에 맞게 각각 발송되는지 확인한다.",
    screen: "메시지 모음",
  },
  {
    no: 8,
    content:
      "결제준비·운영필수 카테고리 항목이 모두 완료 처리된 시점에 \"쇼핑몰 오픈 준비가 끝났어요!\" 오픈 준비 완료 안내가 정상 노출되는지 확인한다.",
    screen: "메시지 모음",
  },
  {
    no: 9,
    content:
      "회원가입 → 승인 대기 → (승인 완료 시) 결제 준비 → PG 신청 → 결제준비·운영필수 완료 → 오픈까지, 온보딩 전체 단계가 정책에 정의된 순서대로 이어지고 각 단계에서의 상태 표시가 실제 진행 상태와 어긋나지 않는지 확인한다.",
    screen: "회원가입 / 승인 대기 / SA (판매자 온보딩 관리)",
  },
  {
    no: 10,
    content:
      "오픈 체크리스트에서 결제 준비 카테고리를 완료하면 \"다음은 운영 필수예요\"로, 운영 필수 완료 시 \"다음은 권장 설정이에요\"로, 권장 설정 완료 시 \"다음은 매출 확장이에요\"로 안내 말풍선이 순서대로 전환되고, 매출 확장까지 모두 완료되면 말풍선이 더 이상 노출되지 않는지 확인한다.",
    screen: "홈 / 오픈 체크리스트 / 말풍선 케이스",
  },
];

export default function TestScenarioPage() {
  return (
    <div>
      <p className="text-[18px] font-bold text-[var(--text-primary)]">테스트 시나리오</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[720px] border-collapse text-left text-[13px]">
          <thead>
            <tr style={{ borderTop: "1.5px solid #3B3A36" }}>
              <th
                className="w-[64px] px-4 py-2.5 text-[12px] font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                테스트 넘버
              </th>
              <th
                className="px-4 py-2.5 text-[12px] font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                테스트 내용
              </th>
              <th
                className="w-[220px] px-4 py-2.5 text-[12px] font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                화면명
              </th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((row, index) => (
              <tr
                key={row.no}
                style={{
                  borderBottom: index === scenarios.length - 1 ? "none" : "1px solid #E4E2D8",
                }}
              >
                <td
                  className="px-4 py-3"
                  style={{ color: "#3B3A36", fontWeight: 700, lineHeight: 1.7 }}
                >
                  {row.no}
                </td>
                <td className="px-4 py-3" style={{ color: "#3B3A36", lineHeight: 1.7 }}>
                  {row.content}
                </td>
                <td className="px-4 py-3" style={{ color: "#5F5E5A", lineHeight: 1.7 }}>
                  {row.screen}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
