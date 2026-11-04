export const parseStoreOpenDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3] ?? 1);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  // Month-only values use the month's start for sorting, without inventing an opening day.
  const calendarDate = `${match[1]}-${match[2]}-${match[3] ?? '01'}`;
  const date = new Date(`${calendarDate}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.getUTCDate() !== day) return null;

  return {
    year,
    month,
    sortTime: new Date(`${calendarDate}T00:00:00+09:00`).getTime(),
  };
};
