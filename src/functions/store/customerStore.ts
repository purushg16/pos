import { create } from "zustand";
import { Customer } from "../../components/entities/Customer";

interface CustomerStore {
  customersList: Customer[];
  setCustomers: (customers: Customer[]) => void;
  selectedCustomers: Customer[] | undefined;
  selectCustomers: (name: string) => void;

  currentCustmer: Customer | null;
  setCurrentCustomer: (customer: Customer) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  customersList: [],
  currentCustmer: null,
  setCurrentCustomer: (customer) => set(() => ({ currentCustmer: customer })),
  setCustomers: (customers) =>
    set(() => ({ customersList: customers, selectedCustomers: customers })),
  selectedCustomers: [],
  selectCustomers: (name) =>
    set((store) => ({
      selectedCustomers: name
        ? store.customersList.filter(
            (customer) =>
              customer.name.toLowerCase().includes(name.toLowerCase()) // search names by letters.
          )
        : store.customersList,
    })),
}));

export default useCustomerStore;
