import { useQuery } from "@tanstack/react-query";
import { addCustomer, getAllCustomer } from "../services/customer-services";
import { Customer } from "../../components/entities/Customer";
import useCustomerStore from "../store/customerStore";

interface Props {
  type: "GET" | "POST";
  customer?: Customer;
}

const useCustomers = ({ type, customer }: Props) => {
  const setCustomers = useCustomerStore((s) => s.setCustomers);

  if (type == "POST") {
    if (customer)
      return useQuery({
        queryKey: ["party", customer],
        queryFn: () => addCustomer.postData(customer).then((res) => res),
        enabled: false,
      });
  }

  return useQuery({
    queryKey: ["party", "allCustomers"],
    queryFn: () =>
      getAllCustomer.getAll().then((res) => setCustomers(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useCustomers;
