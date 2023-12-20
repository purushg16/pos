import { create } from "zustand";
import { Category } from "../../components/entities/Category";

interface CategoryStore {
  baseCategory: Category[];
  setCategories: (categories: Category[]) => void;
  filteredCategories: Category[] | undefined;
  filterCategory: (categoryId: string) => void;
  reverseCategory: () => void;
  clearCategoriesFilters: () => void;
  currentCategory: Category | undefined;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  baseCategory: [],
  filteredCategories: undefined,
  currentCategory: undefined,

  setCategories: (categories) =>
    set(() => ({ baseCategory: categories, filteredCategories: categories })),

  filterCategory: (catergoryId) =>
    set((store) => ({
      filteredCategories:
        store.filteredCategories?.find(
          (category) => category._id === catergoryId
        )?.children || [],
      currentCategory: store.filteredCategories?.find(
        (category) => category._id === catergoryId
      ),
    })),
  reverseCategory: () =>
    set((store) => ({
      filteredCategories: store.baseCategory,
    })),
  clearCategoriesFilters: () =>
    set((store) => ({ filteredCategories: store.baseCategory })),
}));

export default useCategoryStore;
