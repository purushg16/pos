import { create } from "zustand";
import { Product } from "../../components/entities/Product";

interface ProductStore {
  baseProducts: Product[];
  setProductList: (products: Product[]) => void;
  clearProductFilters: () => void;

  // By Category
  productsList: Product[];
  searchProductsByCategory: (category: string) => void;

  // By id
  searchedProductList: Product[];
  searchProductById: (digits: number[]) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  baseProducts: [],
  productsList: [],
  searchedProductList: [],

  setProductList: (products) =>
    set(() => ({ baseProducts: products, searchedProductList: products })),

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
          : store.baseProducts;
      }),
    })),

  clearProductFilters: () => set(() => ({ productsList: [] })),
}));

export default useProductStore;
