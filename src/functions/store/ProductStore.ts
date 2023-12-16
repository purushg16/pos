import { create } from "zustand";
import { Product } from "../services/inventory-services";

interface ProductStore {
  baseProducts: Product[];
  productsList: Product[];
  setProductList: (products: Product[]) => void;

  searchProductsByCategory: (category: string) => void;
  searchedProductList: Product[];
  searchProductById: (digits: number[]) => void;
  clearProductFilters: () => void;
}

const useProductStore = create<ProductStore>((set) => ({
  baseProducts: [],
  productsList: [],
  setProductList: (products) => set(() => ({ baseProducts: products })),
  searchedProductList: [],

  searchProductsByCategory: (category) => {
    set((store) => ({
      productsList: store.baseProducts.filter(
        (product) => product.category === category
      ),
    }));
  },

  searchProductById: (digits) =>
    set((store) => ({
      searchedProductList: store.baseProducts.filter((product) => {
        const itemDigits = product.code.toString().split("").map(Number);

        return itemDigits
          ? digits.every((digit, index) => digit === itemDigits[index])
          : [];
      }),
    })),

  clearProductFilters: () => set((store) => ({ productsList: [] })),
}));

export default useProductStore;
