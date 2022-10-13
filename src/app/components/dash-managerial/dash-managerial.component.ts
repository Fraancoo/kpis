import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-dash-managerial',
  templateUrl: './dash-managerial.component.html',
  styleUrls: ['./dash-managerial.component.scss']
})
export class DashManagerialComponent implements OnInit {

  monthlySale:any
  monthsColor:any

  constructor(private salesService: SalesService) { }

  salesPerMonthValues = new FormGroup({
    option : new FormControl('', Validators.required),
    month : new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.salesService.getSales2022().subscribe(res => {
      this.monthlySale = res;
      console.log(this.monthlySale);
      
      for (let i = 0; i < this.monthlySale.length; i++) {
        let months = document.getElementById('months');
        let total = (this.monthlySale[i].total*350)/1000000
        let rect = this.getNode('rect', {x:(10+(i*34)), width:31, y:350-total, height:total});
        // <rect class="bar" x="10" width="31" y="250" height="100"></rect>
        months?.appendChild(rect);
      }
    });
  }

  getNode(n:any, v:any) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);    
    for (var p in v)
      n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
    return n
  }

  setColor(months:any) {
    var colors1 = ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA', '#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5', '#FFEBEE', '#FCE4EC'];
  }

  salesPerMonth() {
    if (this.salesPerMonthValues.valid) {
      this.salesService.getSalesPerMonth(this.salesPerMonthValues.value.month).subscribe(res => {
        let data = res
        let products_chart = document.getElementById('pie-products');
        let services_chart = document.getElementById('pie-services');
        
        let circle1 = '<circle r="8" cx="10" cy="10" fill="transparent" stroke="bisque"	stroke-width="4" stroke-dasharray="calc(75 * 50.24 / 100) 50.24" transform="rotate(-90) translate(-20)" />'
        // products_chart?.innerHTML = circle1;

        products_chart?.append(circle1);

        console.log(products_chart);
        
      });
    }
  }

}
