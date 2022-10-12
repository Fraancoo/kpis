import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = localStorage.getItem('auth_token');

  loginData = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', Validators.required)
  });

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    if (this.token !== null) {
      this.router.navigate(['/']);
    }
  }

  login(form:any) {
    if (this.loginData.valid) {
      this.usersService.login(form);
    }
  }

}
