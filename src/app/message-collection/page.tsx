export const metadata = {
  title: "메시지 모음",
};

interface MessageCardData {
  id: number;
  condition: string;
  count: string;
  category: "정보성" | "마케팅성";
  icon: "check" | "exclamation" | "x" | "home";
  imageBg: string;
  iconColor: string;
  sender: string;
  title: string;
  body: string;
  button: string;
  optOutText?: string;
  footnote?: string;
}

const cards: MessageCardData[] = [
  {
    id: 1,
    condition: "회원가입 승인 처리 즉시",
    count: "조건 충족 시 최대 1회",
    category: "정보성",
    icon: "check",
    imageBg: "#E1F5EE",
    iconColor: "#0F6E56",
    sender: "플렉스지 · 가입승인 안내",
    title: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.",
    body: "지금 바로 쇼핑몰 셋팅을 시작하세요.",
    button: "오픈 체크리스트",
  },
  {
    id: 2,
    condition: "승인 후 24시간 경과, 템플릿 미선택",
    count: "조건 충족 시 최대 1회",
    category: "마케팅성",
    icon: "home",
    imageBg: "#F1EFE8",
    iconColor: "#D3D1C7",
    sender: "(광고) 플렉스지",
    title: "#{판매자명}님, 이제 템플릿만 선택하면 돼요",
    body: "템플릿 선택만 완료하면 승인 심사가 바로 시작돼요.",
    button: "템플릿 선택하기",
    optOutText: "무료 수신거부 1600-0000",
  },
  {
    id: 3,
    condition: "승인 후 3일 경과, PG 신청 미완료",
    count: "조건 충족 시 최대 1회",
    category: "마케팅성",
    icon: "exclamation",
    imageBg: "#FAEEDA",
    iconColor: "#BA7517",
    sender: "(광고) 플렉스지",
    title: "아직 PG 신청을 완료하지 않으셨어요",
    body: "PG 신청이 완료되어야 쇼핑몰을 정상적으로 오픈하실 수 있어요. 아래 버튼을 눌러 바로 신청하실 수 있어요.",
    button: "PG 신청하러 가기",
    optOutText: "무료 수신거부 1600-0000",
  },
  {
    id: 4,
    condition: "PG 신청 완료 시, 결제준비·운영필수 미완료 항목 존재",
    count: "조건 충족 시 최대 1회",
    category: "정보성",
    icon: "check",
    imageBg: "#E1F5EE",
    iconColor: "#0F6E56",
    sender: "플렉스지 · 진행상황 안내",
    title: "PG 신청이 완료되었어요!",
    body: "쇼핑몰 오픈까지 아직 몇 가지 단계가 남아있어요. 오픈 체크리스트에서 이어서 진행해 보세요.",
    button: "오픈 체크리스트로 이동",
    footnote:
      "결제준비·운영필수가 모두 완료된 상태라면 이 메시지 대신 별도의 '오픈 가능 안내' 메시지가 발송됩니다.",
  },
  {
    id: 5,
    condition: "PG사 반려 통보 시점",
    count: "반려될 때마다 발송 (재신청 후 다시 반려되면 재발송)",
    category: "정보성",
    icon: "x",
    imageBg: "#FBEAF0",
    iconColor: "#D8342A",
    sender: "플렉스지 · 진행상황 안내",
    title: "PG 신청이 반려되었어요",
    body: "사유를 확인하신 후 다시 신청해 주세요.",
    button: "다시 신청하기",
  },
  {
    id: 6,
    condition: "승인 후 5일 경과, 결제준비·운영필수 미완료 항목 존재",
    count: "조건 충족 시 최대 1회",
    category: "마케팅성",
    icon: "check",
    imageBg: "#E6F1FB",
    iconColor: "#378ADD",
    sender: "(광고) 플렉스지",
    title: "쇼핑몰 오픈까지 얼마 남지 않았어요",
    body: "결제 준비와 운영 필수 항목만 마치면 바로 오픈할 수 있어요. 아래 버튼을 눌러 남은 항목을 확인해 보세요.",
    button: "남은 항목 확인하기",
    optOutText: "무료 수신거부 1600-0000",
  },
  {
    id: 7,
    condition: "결제준비·운영필수 모두 완료 처리된 시점",
    count: "조건 충족 시 최대 1회",
    category: "정보성",
    icon: "check",
    imageBg: "#FBEAF0",
    iconColor: "#D8342A",
    sender: "플렉스지 · 오픈안내",
    title: "쇼핑몰 오픈 준비가 끝났어요!",
    body: "운영에 꼭 필요한 필수 항목을 모두 완료하셨어요. 지금 바로 쇼핑몰을 오픈하실 수 있어요.",
    button: "쇼핑몰 바로가기",
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5L11 15L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ExclamationIcon({ color }: { color: string }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V13" strokeLinecap="round" />
        <circle cx="12" cy="16.3" r="1" fill={color} stroke="none" />
      </svg>
    </span>
  );
}

function XIcon({ color }: { color: string }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9L15 15M15 9L9 15" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function HomeIcon({ bgColor }: { bgColor: string }) {
  return (
    <span
      className="flex h-14 w-14 items-center justify-center rounded-xl"
      style={{ backgroundColor: bgColor }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="white" stroke="none">
        <path d="M12 3L4 10V21H9V14H15V21H20V10L12 3Z" />
      </svg>
    </span>
  );
}

function MessageCard({ card }: { card: MessageCardData }) {
  return (
    <div className="flex w-[250px] flex-col">
      <div
        className="mb-4 rounded-lg"
        style={{ border: "1px solid #D3D1C7", backgroundColor: "#F1EFE8", padding: "12px 14px" }}
      >
        <div className="flex gap-2 pb-2" style={{ borderBottom: "1px solid #D3D1C7" }}>
          <span className="w-10 shrink-0 text-[15px] font-bold" style={{ color: "#2C2C2A" }}>
            조건
          </span>
          <span className="text-[15px] font-medium" style={{ color: "#3B3A36" }}>
            {card.condition}
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          <span className="w-10 shrink-0 text-[15px] font-bold" style={{ color: "#2C2C2A" }}>
            횟수
          </span>
          <span className="text-[15px] font-medium" style={{ color: "#3B3A36" }}>
            {card.count}
          </span>
        </div>
      </div>

      <span
        className="mb-3 inline-block w-fit rounded-full px-2 py-0.5 text-[11px] font-medium"
        style={
          card.category === "정보성"
            ? { backgroundColor: "#E1F5EE", color: "#04342C" }
            : { backgroundColor: "#FAEEDA", color: "#8A5710" }
        }
      >
        {card.category}
      </span>

      <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-white">
        <div className="flex h-[110px] items-center justify-center" style={{ backgroundColor: card.imageBg }}>
          {card.icon === "check" ? (
            <CheckIcon color={card.iconColor} />
          ) : card.icon === "exclamation" ? (
            <ExclamationIcon color={card.iconColor} />
          ) : card.icon === "x" ? (
            <XIcon color={card.iconColor} />
          ) : (
            <HomeIcon bgColor={card.iconColor} />
          )}
        </div>
        <div className="px-4 py-4">
          <p className="text-[11px] text-[var(--text-secondary)]">{card.sender}</p>
          <p className="mt-1.5 text-[13px] font-semibold text-[var(--text-primary)]">{card.title}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-secondary)]">{card.body}</p>
          <div className="my-3 border-t border-[var(--divider)]" />
          <div
            className="rounded-md py-2 text-center text-[13px] font-semibold text-white"
            style={{ backgroundColor: "#D8342A" }}
          >
            {card.button}
          </div>
          {card.optOutText && (
            <p className="mt-2 text-center text-[11px] text-[var(--text-secondary)]">{card.optOutText}</p>
          )}
        </div>
      </div>

      {card.footnote && (
        <p className="mt-2 text-[11px] leading-relaxed text-[var(--text-secondary)]">{card.footnote}</p>
      )}
    </div>
  );
}

const constraints = [
  {
    title: "1. 중복 발송 방지",
    body: "동일한 회원에게 동일한 메시지는 1회만 발송하는 것을 원칙으로 합니다. 조건이 반복 충족되더라도 이미 발송된 메시지는 재발송하지 않습니다. \"PG 신청이 반려되었어요\" 메시지는 예외로, 반려가 발생할 때마다 매번 발송합니다.",
  },
  {
    title: "2. 발송 시간 제한",
    body: "카카오 알림톡·브랜드메시지 정책상 발송이 제한되는 야간 시간대에는 메시지를 발송하지 않습니다. 발송 조건이 이 시간대에 충족되더라도, 가장 가까운 발송 가능 시간으로 이월하여 발송합니다.",
  },
  {
    title: "3. 발송 우선순위 (동시 조건 충족 시)",
    body: "한 회원에게 두 개 이상의 메시지 발송 조건이 동시에 충족되는 경우, 먼저 발생한 이벤트(승인 완료 → PG 신청 미완료 → PG 완료/반려 → 오픈 임박 안내 → 오픈 준비 완료) 순서대로만 발송하고, 이미 목적이 달성된 이전 단계 메시지는 발송하지 않습니다.",
  },
];

export default function MessageCollectionPage() {
  return (
    <div>
      <p className="text-[15px] font-semibold text-[var(--text-primary)]">메시지 모음</p>

      <div
        className="mt-4 rounded-[10px]"
        style={{ border: "1.5px solid #D8342A", backgroundColor: "#FBEAF0", padding: "16px 18px" }}
      >
        <p className="text-[13px] font-bold" style={{ color: "#993556" }}>
          메시지 발송 공통 제약사항
        </p>
        <div className="mt-3 flex flex-col gap-3">
          {constraints.map((item) => (
            <div key={item.title}>
              <p className="text-[12px] font-bold" style={{ color: "#993556" }}>
                {item.title}
              </p>
              <p className="text-[12px] font-medium" style={{ color: "#7A2438", lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[repeat(4,250px)] gap-x-8 gap-y-10">
        {cards.map((card) => (
          <MessageCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
