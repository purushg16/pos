import { Product } from "../entities/Product";
import { BillingEntry } from "../../functions/store/billStore";

const convertToBill = (product: Product) => {
  const priceWithoutTax = parseFloat(
    (product.salesPrice / (1 + product.taxRate / 100)).toFixed(2)
  );

  const taxPrice = parseFloat(
    (product.salesPrice - priceWithoutTax).toFixed(2)
  );

  return {
    _id: product._id,
    productId: product.code,
    productName: product.itemName,
    quantity: 1,
    unit: 1,
    salesPrice: product.salesPrice,
    billPrice: product.salesPrice,
    taxApplied: product.taxRate,
    total: product.salesPrice,
    quantityPrice: product.salesPrice,
    taxPrice: taxPrice,
    priceWithoutTax: priceWithoutTax,
    // tax: product.taxRate,
    // salePrice: product.salesPrice,
    // unit: 1,
    // taxPrice: taxPercent,
    // total: product.salesPrice,
  } as BillingEntry;
};

export default convertToBill;
