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
  const statusClass = isCurrentMonthOpen
    ? 'store-current-month-status bg-linear-to-r from-[#ff6b12] via-[#fec601] to-[#fff2a4] text-[#32190b]'
    : upcoming
      ? 'bg-[#fec601] text-[#4e2d14]'
      : 'bg-[#ff6b12] text-white';
  const anonymizedBranchName = `${store.region || '전국'} OO점`;

  return (
    <div className="flex h-[58px] w-full flex-col overflow-hidden rounded-[5px] border border-[#ffdf92]/70 bg-[#fffaf0] shadow-[0_3px_0_rgba(37,18,7,0.28)] sm:h-[76px] sm:rounded-[7px] sm:shadow-[0_4px_0_rgba(37,18,7,0.3)]">
      <div className="flex min-h-0 flex-1 items-center justify-center px-0.5 text-center sm:px-1.5">
        <p className="max-w-full whitespace-normal font-heading text-[9px] font-black leading-[1.05] text-[#301809] [overflow-wrap:anywhere] [word-break:normal] sm:text-[13px] sm:leading-tight">
          {anonymizedBranchName}
        </p>
      </div>
      <div
        className={`relative flex h-[18px] items-center justify-center overflow-hidden whitespace-nowrap font-heading text-[9px] font-black leading-none sm:h-7 sm:text-[13px] ${statusClass}`}
      >
        {isCurrentMonthOpen ? (
          <span className="store-current-month-status__shine" aria-hidden="true" />
        ) : null}
        <span className="relative z-10">{label}</span>
      </div>
    </div>
  );
}
