interface StockProducts {
  productId: string;
  purchasePrice: number;
  stock: number;
}

export interface Stock {
  supplierId: string;
  amount: number;
  billNo: number;
  products: StockProducts[];
}
