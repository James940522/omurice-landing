export interface OpenMonth {
  year: number;
  month: number;
}

export const getNewBadgeOpenMonth = (now: Date): OpenMonth => {
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  return {
    year: previousMonth.getFullYear(),
    month: previousMonth.getMonth() + 1,
  };
};
