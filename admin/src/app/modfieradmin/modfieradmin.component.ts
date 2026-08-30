import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Admin } from '../Entity/Admin.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modfieradmin',
  templateUrl: './modfieradmin.component.html',
  styleUrls: ['./modfieradmin.component.css']
})
export class ModfieradminComponent {

  id: number;
  messageCommande = "";
  adminForm: FormGroup;
  userFile: any;
  public imagePath: any;
  emailURL: any;

  constructor(
    private services: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private rout: ActivatedRoute
  ) {
    let formControls = {
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Caractères alphabétiques uniquement
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$") // Caractères alphabétiques uniquement
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$') // Doit se terminer par @gmail.com
      ]),
      mdp: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$') // Caractères alphanumériques uniquement
      ]),
      role: new FormControl('', [
        Validators.required
      ])
    };
    this.adminForm = this.fb.group(formControls);
  }

  // Getters pour les contrôles du formulaire
  get nom() { return this.adminForm.get('nom'); }
  get prenom() { return this.adminForm.get('prenom'); }
  get email() { return this.adminForm.get('email'); }
  get mdp() { return this.adminForm.get('mdp'); }
  get role() { return this.adminForm.get('role'); }

  // Méthode pour afficher les messages d'erreur
  getErrorMessage(control: any, fieldName: string) {
    if (control.hasError('required')) {
      return `Le champ ${fieldName} est obligatoire`;
    }
    if (control.hasError('minlength')) {
      return `Le champ ${fieldName} doit contenir au moins ${control.errors.minlength.requiredLength} caractères`;
    }
    if (control.hasError('pattern')) {
      switch(fieldName) {
        case 'nom':
        case 'prenom':
          return 'Seuls les caractères alphabétiques sont autorisés';
        case 'email':
          return 'L\'email doit se terminer par @gmail.com';
        case 'mdp':
          return 'Le mot de passe doit contenir uniquement des caractères alphanumériques';
        default:
          return 'Format invalide';
      }
    }
    return '';
  }

  ngOnInit(): void {
    let idEvent = this.rout.snapshot.params['id'];
    this.id = idEvent;
    this.services.findAdminById(idEvent).subscribe({
      next: (result) => {
        let event = result;
        console.log(event);
        this.adminForm.patchValue({
          nom: event.nom,
          prenom: event.prenom,
          email: event.email,
          mdp: event.mdp,
          role: event.role,
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'admin:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les informations de l\'administrateur'
        });
      }
    });
  }

  updateAdmin() {
    if (this.adminForm.invalid) {
      let errorMessages: string[] = [];
      Object.keys(this.adminForm.controls).forEach(key => {
        const control = this.adminForm.get(key);
        if (control?.invalid) {
          errorMessages.push(this.getErrorMessage(control, key));
        }
      });

      Swal.fire({
        icon: 'error',
        title: 'Champs invalides',
        html: errorMessages.join('<br>'),
        showConfirmButton: true
      });
      return;
    }

    let data = this.adminForm.value;
    let admin = new Admin(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.mdp,
      data.role
    );

    this.services.updateAdmin(this.id, admin).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Administrateur modifié avec succès !',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/listadmin']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        console.error('Erreur lors de la modification:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la modification de l\'administrateur'
        });
      }
    });
  }

}
