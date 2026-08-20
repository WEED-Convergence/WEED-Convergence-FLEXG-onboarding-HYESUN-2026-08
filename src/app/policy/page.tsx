export const metadata = {
  title: "정책",
};

const policies = [
  "오픈 체크리스트를 다시 열면, 이전에 마지막으로 보고 있던 항목이 선택된 상태로 열립니다.",
  "오픈 체크리스트는 입력만 가능하며 수정은 불가능합니다. 수정이 필요한 경우 해당 메뉴에 직접 접근하여 수정·삭제합니다.",
  "체크리스트 진행 상태는 서버에 저장되며, 새로고침하거나 다른 기기로 접속해도 완료 상태가 유지됩니다.",
  "모든 카테고리가 100% 완료되어도 홈 화면에는 별도 변화가 없으며, 체크리스트 영역은 사라지지 않고 계속 노출됩니다.",
  "체크리스트는 온보딩 기간에 한정하지 않고 상시 노출됩니다.",
  "\"보안 설정하기\" 항목만 주계정 전용이며, 나머지 항목은 부계정도 조회·입력이 가능합니다.",
  "사용자는 항목 순서와 무관하게 자유롭게 선택해 진행할 수 있습니다. \"건너뛰기\" 클릭 시, 현재 항목은 완료 처리하지 않고 리스트 순서상 다음에 있는 항목 중 아직 완료되지 않은 첫 번째 항목으로 이동합니다. 이미 완료된 항목은 자동으로 건너뜁니다.",
];

export default function PolicyPage() {
  return (
    <div>
      <p className="text-[16px] font-bold text-[var(--text-primary)]">정책</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[600px] border-collapse text-left text-[12px]">
          <thead>
            <tr style={{ borderTop: "1.5px solid #3B3A36" }}>
              <th
                className="w-[64px] px-4 py-2.5 font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                No
              </th>
              <th
                className="px-4 py-2.5 font-medium"
                style={{ borderBottom: "1px solid #E4E2D8", color: "#5F5E5A" }}
              >
                정책
              </th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: index === policies.length - 1 ? "none" : "1px solid #E4E2D8",
                }}
              >
                <td className="px-4 py-3" style={{ color: "#888780", lineHeight: 1.6 }}>
                  {index + 1}
                </td>
                <td className="px-4 py-3" style={{ color: "#3B3A36", lineHeight: 1.6 }}>
                  {policy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
