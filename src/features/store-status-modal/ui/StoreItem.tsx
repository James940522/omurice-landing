import type { Store } from '@/lib/stores';

interface StoreItemProps {
  store: Store;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getOpenStatus = (openDate: string) => {
  if (!DATE_PATTERN.test(openDate)) {
    return { label: '오픈완료', upcoming: false };
  }

  const [year, month] = openDate.split('-').map(Number);
  if (year >= 2026) {
    return { label: `${month}월 오픈`, upcoming: true };
  }

  return { label: '오픈완료', upcoming: false };
};

export default function StoreItem({ store }: StoreItemProps) {
  const openDate = store.open_date?.trim() ?? '';
  const { label, upcoming } = getOpenStatus(openDate);
  const statusClass = upcoming ? 'bg-[#fec601] text-[#4e2d14]' : 'bg-[#ff6b12] text-white';

  return (
    <div className="flex h-[58px] w-full flex-col overflow-hidden rounded-[5px] border border-[#ffdf92]/70 bg-[#fffaf0] shadow-[0_3px_0_rgba(37,18,7,0.28)] sm:h-[76px] sm:rounded-[7px] sm:shadow-[0_4px_0_rgba(37,18,7,0.3)]">
      <div className="flex min-h-0 flex-1 items-center justify-center px-0.5 text-center sm:px-1.5">
        <p className="max-w-full whitespace-normal font-heading text-[9px] font-black leading-[1.05] text-[#301809] [overflow-wrap:anywhere] [word-break:normal] sm:text-[13px] sm:leading-tight">
          {store.branch_name}
        </p>
      </div>
      <div
        className={`flex h-[18px] items-center justify-center whitespace-nowrap font-heading text-[9px] font-black leading-none sm:h-7 sm:text-[13px] ${statusClass}`}
      >
        {label}
      </div>
    </div>
  );
}
