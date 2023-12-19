import { Product } from "../../components/entities/Product";
import { APIGetClient, APIPostClient } from "./api-client";

export interface ProductSupplier {
  supplierId: string;
  purchasePrice: number;
  stock: number;
}

const getAllProducts = new APIGetClient<Product>("/inventory/allItems");
const postProduct = new APIPostClient<Product>("/inventory/addItem");

export { getAllProducts, postProduct };
