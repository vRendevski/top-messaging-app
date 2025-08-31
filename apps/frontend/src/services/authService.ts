import { AuthSchemas } from '@vRendevski/shared/schemas/rest';
import restService from './restService';

class AuthService {
  async signup(username: string, email: string, password: string) {
    return restService.post(AuthSchemas.responses.register, "/api/auth/register", { username, email, password });
  }

  async login(email: string, password: string) {
    return restService.post(AuthSchemas.responses.login, "/api/auth/login", { email, password });
  }

  async me() {
    return restService.get(AuthSchemas.responses.me, "/api/auth/me");
  }

  async logout(){
    return restService.post(AuthSchemas.responses.logout, "/api/auth/logout");
  }
}

const authService = new AuthService();

export default authService;