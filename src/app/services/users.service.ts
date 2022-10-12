import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:3080/api/users';

  constructor(private http: HttpClient) { }

  login(form:any) {
    this.http.post(this.url + '/login', {
      email: form.email,
      password: form.password
    }).subscribe((res:any) => {
      if (res.status === 1) {
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('auth_token', res.token);
        window.location.reload();
      }
    });
  }

  getToken() {
    const token = localStorage.getItem("auth_token");
    return token
  }

  getUserLogged() {
    const token = this.getToken();
    if(token !== null){
        return true
    } else{
        return false
    }
  }

}
