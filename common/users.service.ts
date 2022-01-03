import { Api } from "~/common/baseApi";
import { UserType } from "~/type/users.model";

export class UserService {
  private http = Api.Http;

  public async userGet() {
    return await this.http.get("/users").then((res) => res.data);
  }

  public async userPost(newUser: UserType) {
    return await this.http
      .post("/server/usuario", newUser)
      .then((res) => res.data);
  }

  public async userDelete(deletUser: UserType) {
    return await this.http
      .delete("/server/usuario/" + deletUser.id)
      .then((res) => res.data);
  }
  public async userPatch(UpdateUser: UserType) {
    return await this.http
      .patch("/server/usuario/" + UpdateUser.id, UpdateUser)
      .then((res) => res.data);
  }

  public async userGet1(id: string) {
    return await this.http.get("/server/usuario/" + id).then((res) => res.data);
  }
}
