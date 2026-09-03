export const metadata = {
  title: "정책",
};

type PolicyItem = string | { text: string; color?: string; bold?: boolean };

const highlightedPolicies: PolicyItem[] = [
  "SA의 \"현재 단계\" 컬럼은 별도의 전환 로직 없이, 기존 승인 처리 화면에서 관리하는 승인 상태값을 실시간으로 조회하여 그대로 반영합니다. 승인 상태가 \"완료\"로 바뀌면 SA에서도 자동으로 \"결제 준비\" 단계로 표시됩니다.",
  "알림톡 메시지에 오픈 체크리스트로 연결되는 버튼이 포함되므로, 오픈 체크리스트는 모바일 환경에서도 정상적으로 열람·조작 가능한 모바일 페이지 디자인 및 기능 개발이 함께 진행되어야 합니다.",
  "온보딩 체크리스트(홈 상단 배너 포함)는 신규 가입 회원에게만 노출합니다. 이미 셋업이 완료된 기존 회원에게는 노출하지 않습니다.",
  "온보딩 화면에서 직접 입력한 경우뿐 아니라, 실제 기능 메뉴에서 동일한 설정을 완료한 경우에도 해당 체크리스트 항목을 완료 처리합니다.",
  "공급사 등록·상품 등록처럼 리스트형 데이터인 항목은, 샘플로 자동 생성된 데이터를 제외하고 사용자가 직접 등록한 레코드가 1건 이상 존재하는지를 완료 기준으로 삼습니다. 이를 위해 샘플 데이터에는 \"샘플 여부\" 플래그가 필요합니다. 샘플 데이터라도 판매자가 필드 값을 1개 이상 수정하면, 해당 레코드의 \"샘플 여부\" 플래그를 즉시 해제하고 완료 판정 대상에 포함시킵니다.",
  "완료 판정은 실시간(이벤트 트리거) 기준으로 처리합니다. 데이터 생성·등록이 발생하는 즉시 체크리스트 상태에 반영합니다.",
  {
    text: "상태값이 없는 체크 항목은 동기화하지 않고, 한 번 완료된 항목은 데이터가 삭제되어도 미완료로 복귀되지 않으며, 결제가 1회라도 발생한 경우 결제준비와 운영필수 항목은 입력할 수 없습니다.",
    color: "#D8342A",
  },
  "체크리스트 진행 상태는 계정(로그인 사용자) 단위가 아니라 상점(스토어) 단위로 공유합니다. 대표계정·부계정 누구든 동일한 진행 상태를 봅니다.",
];

const policies = [
  "오픈 체크리스트를 다시 열면, 이전에 마지막으로 보고 있던 항목이 선택된 상태로 열립니다.",
  "오픈 체크리스트는 입력만 가능하며 수정은 불가능합니다. 수정이 필요한 경우 해당 메뉴에 직접 접근하여 수정·삭제합니다.",
  "체크리스트 진행 상태는 서버에 저장되며, 새로고침하거나 다른 기기로 접속해도 완료 상태가 유지됩니다.",
  "모든 카테고리가 100% 완료되어도 홈 화면에는 별도 변화가 없으며, 체크리스트 영역은 사라지지 않고 계속 노출됩니다.",
  "체크리스트는 온보딩 기간에 한정하지 않고 상시 노출됩니다.",
  "\"보안 설정하기\" 항목만 주계정 전용이며, 나머지 항목은 부계정도 조회·입력이 가능합니다.",
  "사용자는 항목 순서와 무관하게 자유롭게 선택해 진행할 수 있습니다. \"건너뛰기\" 클릭 시, 현재 항목은 완료 처리하지 않고 리스트 순서상 다음에 있는 항목 중 아직 완료되지 않은 첫 번째 항목으로 이동합니다. 이미 완료된 항목은 자동으로 건너뜁니다.",
  {
    text: "템플릿 선택은 필수 항목이 아니며, 선택하지 않았거나 변경을 원하실 경우 [디자인 관리 > 메인 레이아웃 관리]에서 선택하실 수 있습니다. (디자인 작업 진행 중)",
    color: "#D8342A",
    bold: true,
  },
];

const allPolicies = [...highlightedPolicies, ...policies];

export default function PolicyPage() {
  return (
    <div>
      <p className="text-[18px] font-bold text-[var(--text-primary)]">정책</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[600px] border-collapse text-left text-[13px]">
          <thead>
            <tr style={{ borderTop: "1.5px solid #3B3A36" }}>
              <th
                className="w-[64px] px-4 py-2.5 text-[12px] font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                No
              </th>
              <th
                className="px-4 py-2.5 text-[12px] font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                정책
              </th>
            </tr>
          </thead>
          <tbody>
            {allPolicies.map((policy, index) => {
              const isHighlighted = index < highlightedPolicies.length;
              const isGroupDivider = index === highlightedPolicies.length - 1;
              const policyText = typeof policy === "string" ? policy : policy.text;
              const overrideColor = typeof policy === "string" ? undefined : policy.color;
              const overrideBold = typeof policy === "string" ? undefined : policy.bold;
              return (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      index === allPolicies.length - 1
                        ? "none"
                        : isGroupDivider
                          ? "1.5px solid #3B3A36"
                          : "1px solid #E4E2D8",
                  }}
                >
                  <td
                    className="px-4 py-3"
                    style={{
                      color: isHighlighted ? "#3B3A36" : "#888780",
                      fontWeight: isHighlighted ? 700 : 400,
                      lineHeight: 1.7,
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: overrideColor ?? "#3B3A36",
                      fontWeight: overrideBold ?? isHighlighted ? 700 : 400,
                      lineHeight: 1.7,
                    }}
                  >
                    {policyText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
