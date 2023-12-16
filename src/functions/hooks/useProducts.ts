import { useQuery } from "@tanstack/react-query";
import inventoryServices from "../services/inventory-services";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => inventoryServices.getAll({}),
    staleTime: 0,
  });
};

export default useProducts;
