import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from './auth.service';


// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: number, user: User) {
    console.log( `El id es ${id} y el user:`);
    console.log(user);
    return this.http.put(`${this.baseUrl}users/${id}`, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(`${this.baseUrl}users/${userId}/photos/${id}/setMain`, {});
  }

  deletePhoto(userId: number, id: number){
    return this.http.delete(`${this.baseUrl}users/${userId}/photos/${id}`, {});
  }
}

