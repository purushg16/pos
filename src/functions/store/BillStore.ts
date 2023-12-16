import { create } from "zustand";

export interface BillingEntry {
  billId: number;
  productId: number;
  productName: string;
  quantity: number;
  unit?: number;
  tax: number;
  billPrice: number;
  salePrice: number;
  purchasePrice: number;
  total: number;
  taxPrice: number;
  quantityPrice: number;
}

interface BillingEntryList {
  BillEntries: BillingEntry[];
  addBillEntries: (newBillingEntry: BillingEntry) => void;
  removeBillEntry: (productId: number) => void;
  clearEntries: () => void;
  updateBillEntryQuantity: (productId: number, quantity: number) => void;
  updateBillEntryPrice: (productId: number, price: number) => void;
}

const useBillStore = create<BillingEntryList>((set) => ({
  BillEntries: [],

  addBillEntries: (newBillingEntry: BillingEntry) =>
    set((store) => ({
      BillEntries: store.BillEntries.find(
        (entry) => entry.productId === newBillingEntry.productId
      )
        ? store.BillEntries.map((entry) =>
            entry.productId === newBillingEntry.productId
              ? {
                  ...entry,
                  quantity: entry.quantity + 1,
                  quantityPrice: entry.salePrice * (entry.quantity + 1),
                  billPrice: entry.salePrice * (entry.quantity + 1),
                  total: parseFloat(
                    (
                      entry.salePrice * (entry.quantity + 1) +
                      entry.taxPrice
                    ).toFixed(2)
                  ),
                  taxPrice: parseFloat(
                    (
                      entry.tax *
                      entry.purchasePrice *
                      (entry.quantity + 1)
                    ).toFixed(2)
                  ),
                }
              : entry
          )
        : [...store.BillEntries, newBillingEntry],
    })),

  removeBillEntry: (productId: number) =>
    set((store) => ({
      BillEntries: store.BillEntries.filter(
        (entry) => entry.productId !== productId
      ),
    })),

  clearEntries: () =>
    set(() => ({
      BillEntries: [],
    })),

  updateBillEntryQuantity: (productId: number, quantity: number) =>
    set((store) => ({
      BillEntries: store.BillEntries.map((entry) =>
        entry.productId === productId
          ? {
              ...entry,
              quantity: quantity || 0,
              billPrice: entry.salePrice * (quantity || 1),
              quantityPrice:
                entry.salePrice * (quantity || 1) * (quantity || 1),
              total: parseFloat(
                (entry.salePrice * (quantity || 1) + entry.taxPrice).toFixed(2)
              ),
            }
          : entry
      ),
    })),

  updateBillEntryPrice: (productId: number, price) =>
    set((store) => ({
      BillEntries: store.BillEntries.map((entry) =>
        entry.productId === productId
          ? {
              ...entry,
              billPrice: price,
              quantityPrice: price * entry.quantity,
              total: parseFloat(
                (
                  (price + entry.purchasePrice * entry.tax) *
                  entry.quantity
                ).toFixed(2)
              ),
            }
          : entry
      ),
    })),
}));

export default useBillStore;
