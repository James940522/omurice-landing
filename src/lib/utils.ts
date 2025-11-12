export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPhoneNumber(phone: string): string {
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (numbers.length === 10) {
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

