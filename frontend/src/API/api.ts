import axios, { AxiosResponse } from "axios";

namespace api {
  const api_url: string = "http://localhost:5000";

  enum Methods {
    get,
    post,
    delete,
    patch,
  }

  const call = (
    method: Methods,
    endpoint: string,
    data: Object
  ): Promise<AxiosResponse<any>> => {
    switch (method) {
      case Methods.get:
        return axios.get(`${api_url}${endpoint}`);
      case Methods.delete:
        return axios.delete(`${api_url}${endpoint}`);
      case Methods.post:
        return axios.post(`${api_url}${endpoint}`);
      case Methods.patch:
        return axios.patch(`${api_url}${endpoint}`);
    }
  };
}

export default api;
