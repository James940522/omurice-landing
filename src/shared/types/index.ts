export interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageColor: string;
}

export interface BaeminOrder {
  id: string;
  storeName: string;
  orderCount: number;
  period: string;
  bgColor: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  openingDate: string;
}

export interface InquiryForm {
  name: string;
  phone: string;
  email?: string;
  storeType: '샵인샵' | '단독매장' | '홀매장' | '기타매장';
  region: string;
  hasStore: '있음' | '없음';
  message?: string;
  agree: boolean;
}
