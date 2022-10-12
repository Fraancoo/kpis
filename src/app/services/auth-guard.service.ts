import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router, private usersService: UsersService) { }

  canActivate() {
    if (this.usersService.getUserLogged() === false) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
