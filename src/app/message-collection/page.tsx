export const metadata = {
  title: "메시지 모음",
};

interface MessageCardData {
  id: number;
  badgeLines: string[];
  category: "정보성" | "마케팅성";
  icon: "check" | "exclamation" | "x";
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
    badgeLines: ["발송 시점: '운영 필수' 카테고리 완료 시 자동 발송"],
    category: "정보성",
    icon: "check",
    imageBg: "#FBEAF0",
    iconColor: "#D8342A",
    sender: "플렉스지 · 오픈안내",
    title: "쇼핑몰 오픈 준비가 끝났어요!",
    body: "운영에 꼭 필요한 필수 항목을 모두 완료하셨어요. 지금 바로 쇼핑몰을 오픈하실 수 있어요.",
    button: "쇼핑몰 바로가기",
  },
  {
    id: 2,
    badgeLines: ["발송 시점: 가입 승인 처리 완료 즉시"],
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
    id: 3,
    badgeLines: [
      "발송 조건: 가입 승인 완료 후 3일 경과 + PG 신청 미완료",
      "발송 횟수: 조건 충족 시 1회",
    ],
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
    badgeLines: [
      "발송 조건: PG 신청 완료 시, 결제준비 또는 운영필수 중 미완료 단계가 있는 경우",
      "발송 횟수: 완료 시 1회",
    ],
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
    badgeLines: [
      "발송 조건: PG사로부터 반려 처리된 경우",
      "발송 횟수: 반려 처리될 때마다 발송 (재신청 후 재반려 시 재발송)",
    ],
    category: "정보성",
    icon: "x",
    imageBg: "#FBEAF0",
    iconColor: "#D8342A",
    sender: "플렉스지 · 진행상황 안내",
    title: "PG 신청이 반려되었어요",
    body: "사유를 확인하신 후 다시 신청해 주세요.",
    button: "다시 신청하기",
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

function MessageCard({ card }: { card: MessageCardData }) {
  return (
    <div className="flex w-[230px] flex-col">
      <span
        className="mb-3 inline-block w-fit rounded-full font-semibold"
        style={{
          backgroundColor: "#FBEAF0",
          color: "#993556",
          padding: card.badgeLines.length > 1 ? "5px 12px" : "6px 14px",
          fontSize: card.badgeLines.length > 1 ? 11 : 12,
        }}
      >
        {card.badgeLines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>

      <span
        className="mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-[11px] font-medium"
        style={
          card.category === "정보성"
            ? { backgroundColor: "#E1F5EE", color: "#04342C" }
            : { backgroundColor: "#FAEEDA", color: "#8A5710" }
        }
      >
        {card.category}
      </span>

      <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-white">
        <div className="flex h-[100px] items-center justify-center" style={{ backgroundColor: card.imageBg }}>
          {card.icon === "check" ? (
            <CheckIcon color={card.iconColor} />
          ) : card.icon === "exclamation" ? (
            <ExclamationIcon color={card.iconColor} />
          ) : (
            <XIcon color={card.iconColor} />
          )}
        </div>
        <div className="px-3.5 py-3">
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

export default function MessageCollectionPage() {
  return (
    <div>
      <p className="text-[15px] font-semibold text-[var(--text-primary)]">메시지 모음</p>

      <div className="mt-6 flex flex-wrap gap-5">
        {cards.map((card) => (
          <MessageCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
