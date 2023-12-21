import axios from "axios";

export interface FetchResponse<T> {
  data: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://pos-svn4.onrender.com/",
  //   params: {
  //     key: "38d8bf2791f74269bf804090176f9cf6",
  //   },
});

export class APIGetClient<T> {
  // class attributes
  endpoint: string;

  // constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };
}

export class APIPostClient<T> {
  // class attributes
  endpoint: string;

  // constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  postData = (data: T) => {
    return axiosInstance.post(this.endpoint, data).then((res) => res.data);
  };
}
