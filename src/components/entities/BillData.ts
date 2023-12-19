export interface BillProducts {
  productId: string;
  stock: number;
  salesPrice: number;
}

export interface BillData {
  customer: string;
  billAmount: number;
  gstinNo: string;
  billType: string;
  billerName: string;
  itemHandled: boolean;
  handler: string;
  paymentMode: string;
  payment: string;
  partialAmount?: number;
  products: BillProducts[];
}
