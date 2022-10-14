import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { KpisService } from 'src/app/services/kpis.service';

@Component({
  selector: 'app-dash-team-member',
  templateUrl: './dash-team-member.component.html',
  styleUrls: ['./dash-team-member.component.scss']
})
export class DashTeamMemberComponent implements OnInit {

  kpis: any;
  ventasMinValue:any; ventasValueCaptured:any;
  ventasCreated:any; // <---- localhost
  cuentasMaxValue:any; cuentasValueCaptured:any;
  cuentasCreated:any; // <---- localhost
  inventarioMinValue:any; inventarioMaxValue:any; inventarioValueCaptured:any;
  inventarioCreated:any; // <---- localhost

  constructor(private kpisService: KpisService) { }

  ngOnInit(): void {
    this.kpisService.getKPIs().subscribe(res => {
      this.kpis = res;
      this.kpis = this.kpis.kpis // <---- localhost

      this.ventasMinValue = this.kpis[0].goal.value;
      this.ventasValueCaptured  = this.kpis[0].captured;
      this.ventasCreated  = this.kpis[0].created_at;
      var kpiVentas = document.getElementById('kpiVentas');
      
      if (this.ventasValueCaptured < this.ventasMinValue) {
        kpiVentas?.classList.add('kpiDivDanger');
      } else {
        kpiVentas?.classList.add('kpiDivSuccess');
      }
      
      this.cuentasMaxValue = this.kpis[1].goal.value;
      this.cuentasValueCaptured  = this.kpis[1].captured;
      this.cuentasCreated  = this.kpis[1].created_at;
      var kpiCuentas = document.getElementById('kpiCuentas');
      
      if (this.cuentasValueCaptured > this.cuentasMaxValue) {
        kpiCuentas?.classList.add('kpiDivDanger');
      } else {
        kpiCuentas?.classList.add('kpiDivSuccess');
      }

      this.inventarioMinValue = this.kpis[2].goal.value.min;
      this.inventarioMaxValue = this.kpis[2].goal.value.max;
      this.inventarioValueCaptured  = this.kpis[2].captured;
      this.inventarioCreated  = this.kpis[2].created_at;
      var kpiInventario = document.getElementById('kpiInventario');

      if (this.inventarioValueCaptured > this.inventarioMinValue) {
        if (this.inventarioValueCaptured < this.inventarioMaxValue) {
            kpiInventario?.classList.add('kpiDivSuccess');
        } else {
          kpiInventario?.classList.add('kpiDivDanger');
        }
      } else {
        kpiInventario?.classList.add('kpiDivDanger');
      }

      let kpiChart = new Chart('ventasChart', {
        type: 'bar',
        data: {
          labels: ['Min', 'Captured'],
          datasets: [{
            data: [
              this.ventasMinValue,
              this.ventasValueCaptured
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
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

      let cuentasChart = new Chart('cuentasChart', {
        type: 'bar',
        data: {
          labels: ['Max', 'Captured'],
          datasets: [{
            data: [
              this.cuentasMaxValue,
              this.cuentasValueCaptured
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
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

      let inventarioChart = new Chart('inventarioChart', {
        type: 'bar',
        data: {
          labels: ['Min', 'Captured', 'Max'],
          datasets: [{
            data: [
              this.inventarioMinValue,
              this.inventarioValueCaptured,
              this.inventarioMaxValue
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
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

  getDataFromObject(obj: any) {
    let data = new Array;
    if (obj === 'name') {
      for (let i = 0; i < Object.keys(this.kpis).length; i++) {
        data.push(this.kpis[i].name);
      }
      return data
    } else if (obj === 'captured') {
      for (let i = 0; i < Object.keys(this.kpis).length; i++) {
        data.push(this.kpis[i].captured);
      }
      return data
    }
    return data
  }

}
