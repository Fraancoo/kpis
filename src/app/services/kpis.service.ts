import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KpisService {

  // url = 'http://localhost:3080/kpis';
  url = '/api/kpis';

  constructor(private http: HttpClient) { }

  getKPIs(){
    return this.http.get(this.url);
  }
}
