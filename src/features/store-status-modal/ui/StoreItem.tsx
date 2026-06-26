import type { Store } from '@/lib/stores';

interface StoreItemProps {
  store: Store;
  currentOpenMonth: {
    year: number;
    month: number;
  } | null;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getOpenStatus = (
  openDate: string,
  currentOpenMonth: StoreItemProps['currentOpenMonth']
) => {
  if (!DATE_PATTERN.test(openDate)) {
    return { label: '오픈완료', upcoming: false, isCurrentMonthOpen: false };
  }

  const [year, month] = openDate.split('-').map(Number);
  const isCurrentMonthOpen =
    currentOpenMonth !== null &&
    year === currentOpenMonth.year &&
    month === currentOpenMonth.month;

  if (year >= 2026) {
    return { label: `${month}월 오픈`, upcoming: true, isCurrentMonthOpen };
  }

  return { label: '오픈완료', upcoming: false, isCurrentMonthOpen: false };
};

export default function StoreItem({ store, currentOpenMonth }: StoreItemProps) {
  const openDate = store.open_date?.trim() ?? '';
  const { label, upcoming, isCurrentMonthOpen } = getOpenStatus(openDate, currentOpenMonth);
  const cardClass = isCurrentMonthOpen
    ? 'store-current-month-card relative flex h-[58px] w-full flex-col overflow-hidden rounded-[5px] border-2 border-[#ff6b12] bg-linear-to-b from-[#fffef2] to-[#fff3c8] shadow-[0_3px_0_rgba(37,18,7,0.28)] sm:h-[76px] sm:rounded-[7px] sm:shadow-[0_4px_0_rgba(37,18,7,0.3)]'
    : 'relative flex h-[58px] w-full flex-col overflow-hidden rounded-[5px] border border-[#ffdf92]/70 bg-[#fffaf0] shadow-[0_3px_0_rgba(37,18,7,0.28)] sm:h-[76px] sm:rounded-[7px] sm:shadow-[0_4px_0_rgba(37,18,7,0.3)]';

  const statusClass = isCurrentMonthOpen
    ? 'store-current-month-status bg-linear-to-r from-[#ff2a5f] via-[#ff6b12] to-[#ffb800] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]'
    : upcoming
      ? 'bg-[#fec601] text-[#4e2d14]'
      : 'bg-[#ff6b12] text-white';
  const anonymizedBranchName = `${store.region || '전국'} OO점`;

  return (
    <div className={cardClass}>
      {isCurrentMonthOpen && (
        <span className="absolute left-0 top-0 z-20 rounded-br-[4px] border-b border-r border-[#ffeaa7]/40 bg-linear-to-r from-[#ff2a5f] to-[#ff6b12] px-[4px] py-[1.5px] font-heading text-[6px] font-black leading-none text-white sm:rounded-br-[6px] sm:px-1.5 sm:py-1 sm:text-[9px]">
          NEW
        </span>
      )}
      <div
        className={`flex min-h-0 flex-1 items-center justify-center px-0.5 text-center sm:px-1.5 ${
          isCurrentMonthOpen ? 'pt-[10px] sm:pt-[14px]' : ''
        }`}
      >
        <p className="max-w-full whitespace-normal font-heading text-[9px] font-black leading-[1.05] text-[#301809] [overflow-wrap:anywhere] [word-break:normal] sm:text-[13px] sm:leading-tight">
          {anonymizedBranchName}
        </p>
      </div>
      <div
        className={`relative flex h-[18px] items-center justify-center overflow-hidden whitespace-nowrap font-heading text-[9px] font-black leading-none sm:h-7 sm:text-[13px] ${statusClass}`}
      >
        {isCurrentMonthOpen ? (
          <>
            <span className="store-current-month-status__shine" aria-hidden="true" />
            <span className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1">
              <svg
                className="h-2 w-2 animate-pulse text-[#fff4d6] sm:h-3 sm:w-3"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
              <span className="shrink-0">{label}</span>
              <svg
                className="h-2 w-2 animate-pulse text-[#fff4d6] sm:h-3 sm:w-3"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
            </span>
          </>
        ) : (
          <span className="relative z-10">{label}</span>
        )}
      </div>
    </div>
  );
}
