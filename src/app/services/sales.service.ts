import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = '/sales';

  constructor(private http: HttpClient) { }

  getSales2022(){
    return this.http.get(this.url+'?year=2022');
  }
  
  getSalesPerMonth(month:any) {
    return this.http.get(this.url+'?year=2022?&month='+month);
  }
}
