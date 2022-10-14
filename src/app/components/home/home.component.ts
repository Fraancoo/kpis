import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token = localStorage.getItem('auth_token')?.substring(6);

  constructor() { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('auth_token');
    window.location.reload();
  }

}
