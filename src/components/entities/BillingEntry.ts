export interface BillingEntry {
  _id: string;
  productId: number;
  productName: string;
  quantity: number;
  unit?: number;
  salesPrice: number;
  billPrice: number;
  taxApplied: number;
  total: number;
  quantityPrice: number;
  taxPrice: number;
  priceWithoutTax: number;
}
