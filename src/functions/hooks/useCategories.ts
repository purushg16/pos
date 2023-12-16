import { useQuery } from "@tanstack/react-query";
import categoryServices from "../services/category-services";

const useCategoryies = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getAll({}),
    staleTime: 0,
  });
};

export default useCategoryies;
