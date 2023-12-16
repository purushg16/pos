import axios, { AxiosRequestConfig } from "axios";
import { Customer } from "./customer-services";

export interface FetchResponse<T> {
  data: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://pos-svn4.onrender.com/",
  //   params: {
  //     key: "38d8bf2791f74269bf804090176f9cf6",
  //   },
});

export default class APIClient<T> {
  // class attributes
  endpoint: string;

  // constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // class methods
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  postCustomer = (data: Customer) => {
    return axiosInstance.post(this.endpoint, data);
  };
}
