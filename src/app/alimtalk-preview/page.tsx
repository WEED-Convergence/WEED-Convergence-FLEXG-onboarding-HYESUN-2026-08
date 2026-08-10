export const metadata = {
  title: "알림톡 미리보기",
};

type Category = "정보성" | "마케팅성";
type IconType = "storefront" | "circle-check" | "clock" | "confetti";

interface AlimtalkCardData {
  id: number;
  category: Category;
  condition: string;
  imageBg: string;
  iconColor: string;
  icon: IconType;
  sender: string;
  title: string;
  body: string;
  button: string;
  showUnsubscribe: boolean;
}

const cards: AlimtalkCardData[] = [
  {
    id: 1,
    category: "마케팅성",
    condition: "가입 후 24시간 경과, 템플릿 선택 미완료 시 1회 발송",
    imageBg: "#EEEDFE",
    iconColor: "#7F77DD",
    icon: "storefront",
    sender: "(광고) 플렉스지",
    title: "#{판매자명}님, 쇼핑몰 만들기 절반 남았어요",
    body: "템플릿 선택만 완료하면 승인 심사가 바로 시작돼요.",
    button: "버튼명",
    showUnsubscribe: true,
  },
  {
    id: 2,
    category: "정보성",
    condition: "3단계(승인) 처리 즉시 자동 발송",
    imageBg: "#E1F5EE",
    iconColor: "#0F6E56",
    icon: "circle-check",
    sender: "플렉스지 · 가입승인 안내",
    title: "#{쇼핑몰명} 가입 승인이 완료됐습니다",
    body: "이제 심사용 세팅부터 진행하실 수 있어요. 오픈채팅방에서 실시간으로 안내받으세요.",
    button: "버튼명",
    showUnsubscribe: false,
  },
  {
    id: 3,
    category: "마케팅성",
    condition: "4~7단계 중 미완료 항목 3일 이상 지속 시 발송",
    imageBg: "#E6F1FB",
    iconColor: "#378ADD",
    icon: "clock",
    sender: "(광고) 플렉스지",
    title: "#{판매자명}님, 오픈까지 3가지만 남았어요",
    body: "사업자정보·유선번호·추가세팅 중 미완료 항목이 있어요. 지금 마무리하면 바로 오픈할 수 있어요.",
    button: "버튼명",
    showUnsubscribe: true,
  },
  {
    id: 4,
    category: "정보성",
    condition: "7단계(추가세팅) 완료 처리 즉시 자동 발송",
    imageBg: "#FAEEDA",
    iconColor: "#BA7517",
    icon: "confetti",
    sender: "플렉스지 · 오픈안내",
    title: "축하합니다, #{쇼핑몰명} 오픈 준비 완료!",
    body: "필수 설정을 모두 마치셨어요. 지금 바로 쇼핑몰을 오픈하고 첫 주문을 받아보세요.",
    button: "버튼명",
    showUnsubscribe: false,
  },
];

function Icon({ type, color }: { type: IconType; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "storefront") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" {...common}>
        <path d="M3 8L5 4H19L21 8" />
        <path d="M4 8V20H20V8" />
        <path d="M9 20V14H15V20" />
      </svg>
    );
  }

  if (type === "circle-check") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5L11 15L16 9.5" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7V12L15.5 14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="28" height="28" {...common}>
      <path d="M5 19L9 9L15 15L5 19Z" />
      <path d="M14 5L14.01 5" strokeWidth={3} />
      <path d="M18 8L18.01 8" strokeWidth={3} />
      <path d="M17 4L17.01 4" strokeWidth={3} />
      <path d="M20 11L20.01 11" strokeWidth={3} />
    </svg>
  );
}

function AlimtalkCard({ card }: { card: AlimtalkCardData }) {
  const tagStyle =
    card.category === "정보성"
      ? "bg-[#E1F5EE] text-[#04342C]"
      : "bg-[#FAEEDA] text-[#633806]";

  return (
    <div className="flex w-[230px] flex-col">
      <span
        className={`mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-medium ${tagStyle}`}
      >
        {card.category}
      </span>
      <p className="mb-2 text-[11px] leading-snug text-slate-500">{card.condition}</p>

      <div className="overflow-hidden rounded-[14px] border border-slate-300 bg-white">
        <div
          className="flex h-[100px] items-center justify-center"
          style={{ backgroundColor: card.imageBg }}
        >
          <Icon type={card.icon} color={card.iconColor} />
        </div>
        <div className="px-3.5 py-3">
          <p className="text-[11px] text-slate-500">{card.sender}</p>
          <p className="mt-1.5 text-[13px] font-bold text-slate-900">{card.title}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{card.body}</p>
          <div className="my-3 border-t border-slate-200" />
          <div className="rounded-md border border-slate-300 py-2 text-center text-[13px] font-medium text-slate-700">
            {card.button}
          </div>
          {card.showUnsubscribe ? (
            <p className="mt-2.5 text-center text-[10px] text-slate-400">
              무료 수신거부 1600-0000
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function AlimtalkPreviewPage() {
  return (
    <div className="mx-auto grid w-fit grid-cols-2 gap-5">
      {cards.map((card) => (
        <AlimtalkCard key={card.id} card={card} />
      ))}
    </div>
  );
}
