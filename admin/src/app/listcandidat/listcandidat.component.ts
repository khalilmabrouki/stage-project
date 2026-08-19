import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidat } from '../Entity/Candidat.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listcandidat',
  templateUrl: './listcandidat.component.html',
  styleUrls: ['./listcandidat.component.css']
})
export class ListcandidatComponent {


    listeCandidat: Candidat[] = [];
  role: string;

  constructor(private service: CrudService, private router: Router) {
    this.role = localStorage.getItem("role") as string;
    this.chargerCandidats();
  }

  // ✅ PAS DE "ngOnInit()", juste la méthode directement
  chargerCandidats() {
    this.service.getCandidat().subscribe({
      next: (candidats) => {
        this.listeCandidat = candidats;
        console.log('✅ Candidats chargés:', this.listeCandidat);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des candidats:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des candidats'
        });
      }
    });
  }

  DeleteCandidat(candidat: Candidat) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le candidat "${candidat.nom} ${candidat.prenom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteCandidat(candidat.id!).subscribe({
          next: () => {
            this.listeCandidat = this.listeCandidat.filter(c => c.id !== candidat.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le candidat a été supprimé avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('❌ Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du candidat.'
            });
          }
        });
      }
    });
  }
}

