import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../Entity/Contact.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.css']
})
export class ListcontactComponent {



    listeContact: Contact[] = [];
  role: string;

  constructor(private service: CrudService, private router: Router) {
    this.role = localStorage.getItem("role") as string;
    this.chargerContacts();
  }

  // ✅ Même méthode que les autres
  chargerContacts() {
    this.service.getContact().subscribe({
      next: (contacts) => {
        this.listeContact = contacts;
        console.log('✅ Contacts chargés:', this.listeContact);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des contacts:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des contacts'
        });
      }
    });
  }

  // ✅ Même structure que DeleteAdmin(), DeleteCandidat(), DeleteOffer()
  DeleteContact(contact: Contact) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer ce message de "${contact.email}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteContact(contact.id!).subscribe({
          next: () => {
            // ✅ Supprimer du tableau local
            this.listeContact = this.listeContact.filter(c => c.id !== contact.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le message a été supprimé avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('❌ Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du message.'
            });
          }
        });
      }
    });
  }
}



