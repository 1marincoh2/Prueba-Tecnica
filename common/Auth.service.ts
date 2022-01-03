import { Api } from "~/common/baseApi";
import { AuthType } from "~/type/auth.model";

export class AuthService {
  private http = Api.Http;

  public async loginPost(user: AuthType) {
    return await this.http.post("/auth/login", user).then((res) => res.data);
  }
}
