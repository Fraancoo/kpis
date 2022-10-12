import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-dash-managerial',
  templateUrl: './dash-managerial.component.html',
  styleUrls: ['./dash-managerial.component.scss']
})
export class DashManagerialComponent implements OnInit {

  monthlySale:any

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getSales2022().subscribe(res => {
      this.monthlySale = res;
      console.log(this.monthlySale);
      
    });
  }

}
