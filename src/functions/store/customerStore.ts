import { create } from "zustand";
import { Customer } from "../services/customer-services";

interface CustomerStore {
  customersList: Customer[];
  setCustomers: (customers: Customer[]) => void;
  selectedCustomers: Customer[] | undefined;
  selectCustomers: (name: string) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  customersList: [],
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
