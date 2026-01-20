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
  region: string;
  agree: boolean;
}
