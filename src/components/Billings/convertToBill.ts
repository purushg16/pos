import { Product } from "../entities/Product";
import { BillingEntry } from "../entities/BillingEntry";

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
    salesPrice: product.salesPrice,
    billPrice: product.salesPrice,
    taxApplied: product.taxRate,
    total: product.salesPrice,
    quantityPrice: product.salesPrice,
    taxPrice: taxPrice,
    priceWithoutTax: priceWithoutTax,

    unit: product.unit,
    topUnit: product.topUnit,
    unitConv: product.unitConv,
    currentUnit: product.unit,
    currentUnitValue: 1,
  } as BillingEntry;
};

export default convertToBill;
