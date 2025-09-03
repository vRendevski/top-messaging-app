import axios, { type AxiosInstance } from "axios";
import { z } from "zod";
import { createApiResponseSchema } from "@vRendevski/shared/schemas/rest";

class RestService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      validateStatus: () => true
    })
  }

  async get<T extends z.ZodType>(schema: T, url: string) {
    const response = await this.api.get(url);
    return createApiResponseSchema(schema).parse(response.data);
  }
  
  async post<T extends z.ZodType>(schema: T, url: string, data?: object) {
    const response = await this.api.post(url, data);
    return createApiResponseSchema(schema).parse(response.data);
  }
}

const restService = new RestService();

export default restService;