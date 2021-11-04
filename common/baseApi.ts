import axios, { AxiosInstance } from 'axios'

class ApiService {
    public host = 'http://45.32.170.178:4000';

    Http: AxiosInstance = axios.create({
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'

      },
      baseURL: this.host
    });
}

export const Api = new ApiService()