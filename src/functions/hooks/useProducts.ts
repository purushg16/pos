import { useQuery } from "@tanstack/react-query";
import {
  Product,
  getAllProducts,
  postProduct,
} from "../services/inventory-services";
import useProductStore from "../store/ProductStore";

interface Props {
  type: "GET" | "POST";
  product?: Product;
}

const useProducts = ({ type, product }: Props) => {
  const { setProductList } = useProductStore();

  if (type === "POST") {
    if (product) {
      return useQuery({
        queryKey: ["products"],
        queryFn: () =>
          postProduct.postData(product).then((res) => {
            console.log(res);
            return res;
          }),
        staleTime: 0,
        enabled: false,
      });
    }
  }

  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getAllProducts.getAll().then((res) => setProductList(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useProducts;
