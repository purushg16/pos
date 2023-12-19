import { create } from "zustand";
import { Category } from "../services/category-services";

interface CategoryStore {
  baseCategory: Category[];
  setCategories: (categories: Category[]) => void;
  filteredCategories: Category[] | undefined;
  filterCategory: (categoryId: string) => void;
  reverseCategory: () => void;
  clearCategoriesFilters: () => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  baseCategory: [],
  filteredCategories: undefined,

  setCategories: (categories) =>
    set(() => ({ baseCategory: categories, filteredCategories: categories })),

  filterCategory: (catergoryId) =>
    set((store) => ({
      filteredCategories:
        store.filteredCategories?.find(
          (category) => category._id === catergoryId
        )?.children || [],
    })),
  reverseCategory: () =>
    set((store) => ({
      filteredCategories: store.baseCategory,
    })),
  clearCategoriesFilters: () =>
    set((store) => ({ filteredCategories: store.baseCategory })),
}));

export default useCategoryStore;
