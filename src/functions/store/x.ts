import { create } from "zustand";

interface BillingEntry {
  billId?: number;
  productId?: number;
  productName?: string;
  barCode?: number;
  quantity?: number;
  unit?: number;
  tax?: number;
  billPrice?: number;
  salePrice?: number;
  purchasePrice?: number;
  total?: number;
}

interface BillEntryStore {
  billEntry: BillingEntry;
  setBillId: (billId: number) => void;
  setProductId: (productId: number) => void;
  setProductName: (productName: string) => void;
  setBarCode: (barcode: number) => void;
  setQuantity: (quantity: number) => void;
  setUnit: (unit: number) => void;
  setTax: (tax: number) => void;
  setBillPrice: (quantity: number, price: number) => void;
  setSalesPrice: (salePrice: number) => void;
  setPurchasePrice: (purchasePrice: number) => void;
  setTotal: (total: number) => void;
}

create<BillEntryStore>((set) => ({
  billEntry: {},
  setBillId: (billId) =>
    set((store) => ({ billEntry: { ...store.billEntry, billId } })),
  setProductName: (productName) =>
    set((store) => ({ billEntry: { ...store.billEntry, productName } })),
  setProductId: (productId) =>
    set((store) => ({ billEntry: { ...store.billEntry, productId } })),
  setBarCode: (barCode) =>
    set((store) => ({ billEntry: { ...store.billEntry, barCode } })),
  setQuantity: (quantity) =>
    set((store) => ({ billEntry: { ...store.billEntry, quantity } })),
  setUnit: (unit) =>
    set((store) => ({ billEntry: { ...store.billEntry, unit } })),
  setTax: (tax) => set((store) => ({ billEntry: { ...store.billEntry, tax } })),
  setBillPrice: (billPrice, price) =>
    set((store) => ({ billEntry: { ...store.billEntry, billPrice } })),
  setSalesPrice: (salePrice) =>
    set((store) => ({ billEntry: { ...store.billEntry, salePrice } })),
  setPurchasePrice: (purchasePrice) =>
    set((store) => ({ billEntry: { ...store.billEntry, purchasePrice } })),
  setTotal: (total) =>
    set((store) => ({ billEntry: { ...store.billEntry, total } })),
}));
