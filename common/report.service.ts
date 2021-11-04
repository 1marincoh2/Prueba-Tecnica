import { Api } from '~/common/baseApi'



export class ReportService {
    private http = Api.Http;
    
    public async StudensGet () {
      return await this.http.get('/students/groupby').then(res => res.data)
    }
  
}
