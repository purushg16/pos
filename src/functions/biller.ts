import { BillData } from "../components/entities/BillData";
import useBillStore from "./store/billStore";
import { BillingEntry } from "../components/entities/BillingEntry";
import useCustomerStore from "./store/customerStore";
import useEmployeStore from "./store/employeStore";
import useGSTStore from "./store/gstStore";

const biller = () => {
  const currentCustomer = useCustomerStore((s) => s.currentCustmer);

  const BillEntries = useBillStore((s) => s.BillEntries);

  const gstin = useGSTStore((s) => s.currentGstin);

  const billType = useBillStore((s) => s.billType);
  const biller = useEmployeStore((s) => s.currentBiller);
  const itemHandled = useBillStore((s) => s.itemHandled);
  const handler = useEmployeStore((s) => s.currentHandler);

  const partialAmount = useBillStore((s) => s.partialAmount);
  const partialPayment = useBillStore((s) => s.partialPayment);
  const paymentMode = useBillStore((s) => s.paymentMode);

  const BillProducts = BillEntries.map((entry) => ({
    productId: String(entry.productId),
    stock: entry.quantity,
    salesPrice: entry.salesPrice,
  }));

  const BillData: BillData = {
    customer: currentCustomer?.name!,
    billAmount: BillEntries.reduce((acc, entry: BillingEntry) => {
      return acc + entry.total;
    }, 0),
    gstinNo: gstin?.gstinNo!,
    billType: billType!,
    billerName: biller?.name!,
    itemHandled: itemHandled,
    handler: handler?.name!,
    paymentMode: paymentMode!,
    payment: partialPayment!,
    partialAmount: partialAmount!,
    products: BillProducts,
  };

  return BillData;
};

export default biller;
