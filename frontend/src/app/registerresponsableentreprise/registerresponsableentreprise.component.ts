import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResponsableEntreprise } from '../Entity/ResponsableEntreprise.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-registerresponsableentreprise',
  templateUrl: './registerresponsableentreprise.component.html',
  styleUrls: ['./registerresponsableentreprise.component.css']
})
export class RegisterresponsableentrepriseComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      email: new FormControl(''),
      mdp: new FormControl(''),
      confirmMdp: new FormControl(''),
      telephone: new FormControl(''),
      nomEntreprise: new FormControl(''),
      adresseEntreprise: new FormControl(''),
      poste: new FormControl('')
    });
  }

  register() {
    // Vérifier si les mots de passe correspondent
    if (this.registerForm.value.mdp !== this.registerForm.value.confirmMdp) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas.'
      });
      return;
    }

    const data = this.registerForm.value;
    const responsable = new ResponsableEntreprise(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.mdp,
      data.telephone,
      data.nomEntreprise,
      data.adresseEntreprise,
      data.poste,
      'Actif'
    );

    this.service.registerResponsableEntreprise(responsable).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie !',
          text: 'Votre compte responsable d\'entreprise a été créé avec succès.',
          timer: 3000,
          showConfirmButton: true
        }).then(() => {
          this.router.navigate(['login']);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'inscription.'
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }


}
