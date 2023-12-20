import { create } from "zustand";
import { ProductSuppliers } from "../../components/entities/ProductSuppliers";

export interface StockProduct {
  productId: string;
  purchasePrice: number;
  quantity: number;

  productName?: string;
  code?: number;
}

interface StockStore {
  supplierId: string | undefined;
  amount: number | null;
  billNo: number | undefined;
  stockProducts: StockProduct[];

  setSupplier: (supplier: ProductSuppliers) => void;
  // setAmount: () => void;
  setBillNo: (billNo: number) => void;
  addProducts: (products: StockProduct) => void;
  updateStockQuantity: (producId: string, quantity: number) => void;
  updateStockPrice: (producId: string, amount: number) => void;
}

const useStockStore = create<StockStore>((set) => ({
  supplierId: undefined,
  amount: 0,
  billNo: undefined,
  stockProducts: [],

  setSupplier: (supplier) => set(() => ({ supplierId: supplier._id })),
  setBillNo: (billNo) => set(() => ({ billNo: billNo })),

  addProducts: (newProduct) =>
    set((store) => ({
      stockProducts: store.stockProducts.find(
        (product) => product.productId === newProduct.productId
      )
        ? store.stockProducts.map((product) =>
            product.productId === newProduct.productId
              ? {
                  ...product,
                  productName: product.productName,
                  quantity: product.quantity + 1,
                  purchasePrice: product.purchasePrice,
                }
              : product
          )
        : [...store.stockProducts, newProduct],

      amount:
        store.stockProducts.reduce(
          (acc, product) => acc + product.purchasePrice * product.quantity,
          0
        ) + newProduct.purchasePrice,
    })),

  updateStockQuantity: (producId, quantity) =>
    set((store) => ({
      stockProducts: store.stockProducts.map((product) =>
        product.productId === producId
          ? {
              ...product,
              quantity: quantity || 0,
            }
          : product
      ),

      amount: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId !== producId
            ? product.purchasePrice * product.quantity
            : product.purchasePrice * quantity),
        0
      ),
    })),

  updateStockPrice: (producId, price) =>
    set((store) => ({
      stockProducts: store.stockProducts.map((product) =>
        product.productId === producId
          ? { ...product, purchasePrice: price }
          : product
      ),

      amount: store.stockProducts.reduce(
        (acc, product) =>
          acc +
          (product.productId !== producId
            ? product.purchasePrice * product.quantity
            : price * product.quantity),
        0
      ),
    })),
}));

export default useStockStore;
