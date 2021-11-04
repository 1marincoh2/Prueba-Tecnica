import { Api } from '~/common/baseApi'
import { UserType } from '~/type/users.model';



export class UserService {
    private http = Api.Http;
    
    public async userGet () {
      return await this.http.get('/users').then(res => res.data)
    }
    
    public async userPost (newUser:UserType ) {
      return await this.http.post('/users', newUser).then(res => res.data)
    }

    public async userDelete (deletUser: UserType) {
      return await this.http.delete('/users/' + deletUser.id).then(res => res.data)

  }
 public async userPatch (UpdateUser: UserType) {
      return await this.http.patch('/users/' + UpdateUser.id, UpdateUser).then(res => res.data)
    }

    public async userGet1 (id:number) {
      return await this.http.get( '/users/' + id).then(res => res.data)
    }
 
}
