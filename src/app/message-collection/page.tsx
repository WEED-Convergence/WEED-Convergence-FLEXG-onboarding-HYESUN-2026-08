export const metadata = {
  title: "메시지 모음",
};

interface MessageCardData {
  id: number;
  timing: string;
  imageBg: string;
  iconColor: string;
  sender: string;
  title: string;
  body: string;
  button: string;
}

const cards: MessageCardData[] = [
  {
    id: 1,
    timing: "발송 시점: '운영 필수 기능' 카테고리 완료 시 자동 발송",
    imageBg: "#FBEAF0",
    iconColor: "#D8342A",
    sender: "플렉스지 · 오픈안내",
    title: "쇼핑몰 오픈 준비가 끝났어요!",
    body: "운영에 꼭 필요한 필수 항목을 모두 완료하셨어요. 지금 바로 쇼핑몰을 오픈하실 수 있어요.",
    button: "쇼핑몰 바로가기",
  },
  {
    id: 2,
    timing: "발송 시점: 가입 승인 처리 완료 즉시",
    imageBg: "#E1F5EE",
    iconColor: "#0F6E56",
    sender: "플렉스지 · 가입승인 안내",
    title: "플렉스지 쇼핑몰 회원가입 승인이 완료되었습니다.",
    body: "지금 바로 쇼핑몰 셋팅을 시작하세요.",
    button: "오픈 체크리스트",
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

function MessageCard({ card }: { card: MessageCardData }) {
  return (
    <div className="flex w-[230px] flex-col">
      <span
        className="mb-3 inline-block w-fit rounded-full font-semibold"
        style={{ backgroundColor: "#FBEAF0", color: "#993556", padding: "6px 14px", fontSize: 12 }}
      >
        {card.timing}
      </span>

      <span className="mb-2 inline-block w-fit rounded-full bg-[#E1F5EE] px-2 py-0.5 text-[11px] font-medium text-[#04342C]">
        정보성
      </span>

      <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-white">
        <div className="flex h-[100px] items-center justify-center" style={{ backgroundColor: card.imageBg }}>
          <CheckIcon color={card.iconColor} />
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
        </div>
      </div>
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
