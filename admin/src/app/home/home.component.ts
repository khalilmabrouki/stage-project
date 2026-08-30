import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { CrudService } from '../service/crud.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  totalAdmin: number = 0;
  totalCandidat: number = 0;
  totalOffer: number = 0;

  myGroup: FormGroup;

  private percentageChart?: Chart;
  private timer: any;

  constructor(private router: Router, private service: CrudService) {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });

    Chart.register(...registerables);
    
    this.loadStats();

    this.timer = setInterval(() => {
      this.loadStats();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);

    if (this.percentageChart) {
      this.percentageChart.destroy();
      this.percentageChart = undefined;
    }
  }

  loadStats() {
    forkJoin({
      admins: this.service.getAdmin(),
      candidats: this.service.getCandidat(),
      offers: this.service.getOffer(),
    }).subscribe({
      next: ({ admins, candidats, offers }) => {
        
        this.totalAdmin = admins?.length || 0;
        this.totalCandidat = candidats?.length || 0;
        this.totalOffer = offers?.length || 0;

        this.renderOrUpdatePercentageChart();
      },
      error: (err) => {
        console.error('Erreur loadStats:', err);
      }
    });
  }

  /* chart.js */
  renderOrUpdatePercentageChart() {
    const total =
      this.totalAdmin +
      this.totalCandidat +
      this.totalOffer;

    const percentageAdmin = total ? (this.totalAdmin / total) * 100 : 0;
    const percentageCandidat = total ? (this.totalCandidat / total) * 100 : 0;
    const percentageOffer = total ? (this.totalOffer / total) * 100 : 0;

    if (this.percentageChart) {
      this.percentageChart.data.labels = [
        'Admin',
        'Candidat',
        'Offer',
      ];

      this.percentageChart.data.datasets[0].data = [
        percentageAdmin,
        percentageCandidat,
        percentageOffer,
      ];

      this.percentageChart.update();
      return;
    }

    this.percentageChart = new Chart('percentageCanvas', {
      type: 'pie',
      data: {
        labels: ['Admin', 'Candidat', 'Offer'],
        datasets: [{
          label: 'Pourcentage global',
          data: [
            percentageAdmin,
            percentageCandidat,
            percentageOffer
          ],
          backgroundColor: [
            '#0d6efd',   // Admin - Bleu
            '#198754',   // Candidat - Vert
            '#ffc107'    // Offer - Jaune
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Pourcentage Admin / Candidat / Offer'
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${Number(ctx.raw)?.toFixed(1)} %`
            }
          }
        }
      }
    });
  }
}

  


