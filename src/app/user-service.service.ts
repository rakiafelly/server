import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  usersUrl: string = 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Utilisateur[]>(this.usersUrl)
  }
  deleteUser(user: Utilisateur | number): any {
    const id = typeof user === 'number' ? user : user.id;
    const url = this.usersUrl + '/' + id;

    return this.http.delete(url);
  }

  addUser(user: Utilisateur) {
    return this.http.post(this.usersUrl, user)

  }

  getUserDetail(id:any){
    return this.http.get(this.usersUrl+'/'+id)
  }

  updateUser(id:any,user:Utilisateur){
    return this.http.put(this.usersUrl+'/'+id,user)

  }
}
