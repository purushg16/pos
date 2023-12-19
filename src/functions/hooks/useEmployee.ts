import { useQuery } from "@tanstack/react-query";
import {
  Employee,
  GetEmployee,
  PostEmployee,
} from "../services/employe-client";
import useEmployeStore from "../store/employeStore";

interface Props {
  type: "GET" | "POST";
  employe?: Employee;
}

const useEmployee = ({ type, employe: employee }: Props) => {
  const setEmployeeList = useEmployeStore((s) => s.setEmployeeList);

  if (type === "POST") {
    if (employee)
      return useQuery({
        queryKey: ["party", employee],
        queryFn: () => PostEmployee.postData(employee).then((res) => res),
        enabled: false,
      });
  }

  return useQuery({
    queryKey: ["party", "allEmployee"],
    queryFn: () =>
      GetEmployee.getAll().then((res) => setEmployeeList(res.data)),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export default useEmployee;
