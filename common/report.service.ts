import { Api } from "~/common/baseApi";

export class ReportService {
  private http = Api.Http;

  public async StudensGet() {
    return await this.http.get("/reportes").then((res) => res.data);
  }
}
