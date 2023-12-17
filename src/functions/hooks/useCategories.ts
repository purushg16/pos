import { useQuery } from "@tanstack/react-query";
import {
  Category,
  GetCategory,
  PostCategory,
} from "../services/category-services";
import useCategoryStore from "../store/categoryStore";

interface Props {
  type: "GET" | "POST";
  category?: Category;
}

const useCategoryies = ({ type, category }: Props) => {
  const setCategories = useCategoryStore((s) => s.setCategories);

  if (type === "POST") {
    if (category) {
      return useQuery({
        queryKey: ["categories"],
        queryFn: () => PostCategory.postData(category).then((res) => res),
        staleTime: 0,
      });
    }
  }

  return useQuery({
    queryKey: ["categories"],
    queryFn: () => GetCategory.getAll().then((res) => setCategories(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useCategoryies;
