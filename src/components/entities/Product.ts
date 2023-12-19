import { ProductSupplier } from "../../functions/services/inventory-services";

export interface Product {
  _id?: string;
  itemName: string;
  barCode: number;
  code: number;
  unit: string;
  topUnit: string;
  unitConv: number;
  category: string;
  salesPrice: number;
  taxRate: number;
  mrp: number;
  zone: string;
  suppliers?: ProductSupplier[];
}
