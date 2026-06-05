import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type InquiryLeadValidationInput = {
  name: string;
  phone: string;
  region: string;
  privacyAgree: boolean;
};

export type InquiryLeadValidationResult =
  | { valid: true }
  | {
      valid: false;
      field: keyof InquiryLeadValidationInput;
      message: string;
    };

const PHONE_INPUT_PATTERN = /^[\d\s-]+$/;
const MOBILE_PHONE_PATTERN = /^(?:010\d{8}|01[16789]\d{7,8})$/;
const AREA_PHONE_PATTERN = /^(?:02\d{7,8}|0(?:3[1-3]|4[1-4]|5[1-5]|6[1-4]|70)\d{7,8})$/;
const NAME_PATTERN = /^(?=.*[가-힣])[가-힣a-zA-Z\s.]{2,30}$/u;
const REGION_PATTERN = /^(?=.*[가-힣])[가-힣0-9\s.-]{2,40}$/u;

export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function formatPhoneNumber(phone: string): string {
  const numbers = normalizePhoneNumber(phone).slice(0, 11);

  if (!numbers) return '';

  if (numbers.startsWith('02')) {
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    if (numbers.length <= 9) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    }
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;

  if (numbers.length === 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

export function sanitizePhoneInput(phone: string): string {
  return formatPhoneNumber(phone);
}

export function isValidKoreanPhoneNumber(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed || !PHONE_INPUT_PATTERN.test(trimmed)) return false;

  const numbers = normalizePhoneNumber(trimmed);
  if (/^(\d)\1+$/.test(numbers)) return false;

  return MOBILE_PHONE_PATTERN.test(numbers) || AREA_PHONE_PATTERN.test(numbers);
}

export function isValidInquiryName(name: string): boolean {
  return NAME_PATTERN.test(name.trim().replace(/\s+/g, ' '));
}

export function isValidInquiryRegion(region: string): boolean {
  return REGION_PATTERN.test(region.trim().replace(/\s+/g, ' '));
}

export function validateInquiryLead({
  name,
  phone,
  region,
  privacyAgree,
}: InquiryLeadValidationInput): InquiryLeadValidationResult {
  if (!isValidInquiryName(name)) {
    return {
      valid: false,
      field: 'name',
      message: '성함은 한글이 포함된 2~30자로 입력해주세요.',
    };
  }

  if (!isValidKoreanPhoneNumber(phone)) {
    return {
      valid: false,
      field: 'phone',
      message: '연락처는 숫자만 입력된 올바른 전화번호로 입력해주세요.',
    };
  }

  if (!isValidInquiryRegion(region)) {
    return {
      valid: false,
      field: 'region',
      message: '희망지역은 한글이 포함된 지역명으로 입력해주세요.',
    };
  }

  if (!privacyAgree) {
    return {
      valid: false,
      field: 'privacyAgree',
      message: '개인정보 수집 및 이용에 동의해주세요.',
    };
  }

  return { valid: true };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}
