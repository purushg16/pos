import { create } from "zustand";
import customers from "../data/customers";

export interface Customer {
  name: string;
  phone: number;
}

interface CustomerStore {
  customersList: Customer[];
  selectedCustomers: Customer[] | undefined;
  selectCustomers: (name: string) => void;
}

const useCustomer = create<CustomerStore>((set) => ({
  customersList: customers,
  selectedCustomers: [],
  selectCustomers: (name) =>
    set(() => ({
      selectedCustomers: name
        ? customers.filter(
            (customer) =>
              customer.name.toLowerCase().includes(name.toLowerCase()) // search names by letters.
          )
        : [],
    })),
}));

export default useCustomer;
