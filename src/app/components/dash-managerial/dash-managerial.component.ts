import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-dash-managerial',
  templateUrl: './dash-managerial.component.html',
  styleUrls: ['./dash-managerial.component.scss']
})
export class DashManagerialComponent implements OnInit {

  mSales: any;
  salesPM: any;

  // salesPerMonthChart = new Chart('salesPerMonth', {
  //   type: 'doughnut',
  //       data: {
  //         datasets: [{
  //           data: []
  //         }]
  //       }
  // });

  constructor(private salesService: SalesService) { }

  salesPerMonthValues = new FormGroup({
    option: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.salesService.getSales2022().subscribe(res => {
      this.mSales = res;
      console.log(this.mSales);

      let monthlySalesChart = new Chart('monthlySales', {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: [
              this.mSales[0].total,
              this.mSales[1].total,
              this.mSales[2].total,
              this.mSales[3].total,
              this.mSales[4].total,
              this.mSales[5].total,
              this.mSales[6].total,
              this.mSales[7].total,
              this.mSales[8].total,
              this.mSales[9].total,
              this.mSales[10].total,
              this.mSales[11].total,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    });
  }

  salesPerMonth() {
    if (this.salesPerMonthValues.valid) {
      this.salesService.getSalesPerMonth(this.salesPerMonthValues.value.month).subscribe(res => {
        this.salesPM = res;

        let productsNames = this.getDataFromObject('productsNames');
        let productsTotales = this.getDataFromObject('productsTotales');
        let servicesNames = this.getDataFromObject('servicesNames');
        let servicesTotales = this.getDataFromObject('servicesTotales');

        let randomProductsColors = this.generateRandomColors(productsNames);
        let randomServicesColors = this.generateRandomColors(servicesNames);

        if (this.salesPerMonthValues.value.option === 'products') {
          var salesPerMonthChart = new Chart('salesPerMonth', {
            type: 'doughnut',
            data: {
              labels: productsNames,
              datasets: [{
                data: productsTotales,
                backgroundColor: randomProductsColors,
                borderColor: randomProductsColors,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true
                }
              }
            }
          });
        } else if(this.salesPerMonthValues.value.option === 'services') {
          let salesPerMonthChart = new Chart('salesPerMonth', {
            type: 'doughnut',
            data: {
              labels: servicesNames,
              datasets: [{
                data: servicesTotales,
                backgroundColor: randomServicesColors,
                borderColor: randomServicesColors,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true
                }
              }
            }
          });
        }
      });
    }
  }

  getDataFromObject(obj: any) {
    let data = new Array;
    if (obj === 'productsNames') {
      for (let i = 0; i < Object.keys(this.salesPM.products).length; i++) {
        data.push(this.salesPM.products[i].product);
      }
      return data
    } else if (obj === 'productsTotales') {
      for (let i = 0; i < Object.keys(this.salesPM.products).length; i++) {
        data.push(this.salesPM.products[i].total);
      }
      return data
    } else if (obj === 'servicesNames') {
      for (let i = 0; i < Object.keys(this.salesPM.services).length; i++) {
        data.push(this.salesPM.services[i].service);
      }
      return data
    } else if (obj === 'servicesTotales') {
      for (let i = 0; i < Object.keys(this.salesPM.services).length; i++) {
        data.push(this.salesPM.services[i].total);
      }
      return data
    }
    return data
  }

  generateRandomColors(array:any) {
    let colors = new Array;
    for (let i = 0; i < array.length; i++) {
      colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
    return colors
  }
}
