import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = 'https://frontend-exercise.herokuapp.com/sales';

  constructor(private http: HttpClient) { }

  getSales2022(){
    return this.http.get(this.url+'?year=2022');
  }
}
