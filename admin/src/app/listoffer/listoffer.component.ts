import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Offer } from '../Entity/Offer.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listoffer',
  templateUrl: './listoffer.component.html',
  styleUrls: ['./listoffer.component.css']
})
export class ListofferComponent {
  // ✅ Même structure que Admin et Candidat
  listeOffer: Offer[] = [];
  role: string;

  constructor(private service: CrudService, private router: Router) {
    this.role = localStorage.getItem("role") as string;
    this.chargerOffers();
  }

  // ✅ Même méthode que chargerAdmins() et chargerCandidats()
  chargerOffers() {
    this.service.getOffer().subscribe({
      next: (offers) => {
        this.listeOffer = offers;
        console.log('✅ Offres chargées:', this.listeOffer);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des offres:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des offres'
        });
      }
    });
  }

  // ✅ Même structure que DeleteAdmin() et DeleteCandidat()
  DeleteOffer(offer: Offer) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer l'offre "${offer.titre}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteOffer(offer.id!).subscribe({
          next: () => {
            // ✅ Supprimer du tableau local
            this.listeOffer = this.listeOffer.filter(o => o.id !== offer.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'L\'offre a été supprimée avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('❌ Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression de l\'offre.'
            });
          }
        });
      }
    });
  }
}


