import { Product } from "../../functions/services/inventory-services";
import { BillingEntry } from "../../functions/store/BillStore";

const convertToBill = (product: Product) => {
  return {
    billId: 0,
    productId: product.code,
    productName: product.itemName,
    quantity: 1,
    quantityPrice: product.salePrice,
    tax: product.taxRate,
    billPrice: product.salePrice,
    salePrice: product.salePrice,
    purchasePrice: product.purchasePrice,
    total: parseFloat(
      (product.salePrice + product.taxRate * product.purchasePrice).toFixed(2)
    ),
    taxPrice: parseFloat((product.taxRate * product.purchasePrice).toFixed(2)),
  } as BillingEntry;
};

export default convertToBill;
