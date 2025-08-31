import axios from "axios";
import { z } from "zod";
import { createApiResponseSchema } from "@vRendevski/shared/schemas/rest";

class RestService {
  async get<T extends z.ZodType>(schema: T, url: string) {
    const response = await axios.get(url);
    return createApiResponseSchema(schema).parse(response.data);
  }
  
  async post<T extends z.ZodType>(schema: T, url: string, data?: object) {
    const response = await axios.post(url, data);
    return createApiResponseSchema(schema).parse(response.data);
  }
}

const restService = new RestService();

export default restService;