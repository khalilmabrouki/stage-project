import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidat } from '../Entity/Candidat.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) {
    let formControls = {
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-ZÀ-ÿ\\s'-]+$")
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
      ]),
      mdp: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      confirmMdp: new FormControl('', [
        Validators.required
      ]),
      telephone: new FormControl('', [
        Validators.pattern('^[0-9]{8}$')
      ]),
      cv: new FormControl('')
    };
    this.registerForm = this.fb.group(formControls);
  }

  // Getters
  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get email() { return this.registerForm.get('email'); }
  get mdp() { return this.registerForm.get('mdp'); }
  get confirmMdp() { return this.registerForm.get('confirmMdp'); }
  get telephone() { return this.registerForm.get('telephone'); }
  get cv() { return this.registerForm.get('cv'); }

  // Vérifier si les mots de passe correspondent
  passwordMatch(): boolean {
    return this.mdp?.value === this.confirmMdp?.value;
  }

  // Afficher les messages d'erreur
  getErrorMessage(control: any, fieldName: string) {
    if (control?.hasError('required')) {
      return `Le champ ${fieldName} est obligatoire`;
    }
    if (control?.hasError('minlength')) {
      return `Le champ ${fieldName} doit contenir au moins ${control.errors?.minlength?.requiredLength} caractères`;
    }
    if (control?.hasError('pattern')) {
      switch(fieldName) {
        case 'nom':
        case 'prenom':
          return 'Seuls les caractères alphabétiques sont autorisés';
        case 'email':
          return 'L\'email doit se terminer par @gmail.com';
        case 'mdp':
          return 'Le mot de passe doit contenir uniquement des caractères alphanumériques';
        case 'telephone':
          return 'Le téléphone doit contenir 8 chiffres';
        default:
          return 'Format invalide';
      }
    }
    if (control?.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    }
    if (control?.hasError('min')) {
      return 'Les années d\'expérience ne peuvent pas être négatives';
    }
    return '';
  }

  register() {
    // Vérifier si le formulaire est invalide
    if (this.registerForm.invalid) {
      let errorMessages: string[] = [];
      
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          const errorMsg = this.getErrorMessage(control, key);
          if (errorMsg) {
            errorMessages.push(errorMsg);
          }
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

    // Vérifier si les mots de passe correspondent
    if (!this.passwordMatch()) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas.',
        showConfirmButton: true
      });
      return;
    }

    // Récupérer les données du formulaire
    let data = this.registerForm.value;
    
    // Créer l'objet candidat
    let candidat = new Candidat(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.mdp,
      data.telephone,
      data.cv
    );

    console.log('📝 Candidat à inscrire:', candidat);

    // Appel au service
    this.service.registerCandidat(candidat).subscribe({
      next: (res) => {
        console.log('✅ Inscription réussie:', res);
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie !',
          text: 'Votre compte candidat a été créé avec succès. Vous pouvez maintenant vous connecter.',
          timer: 3000,
          showConfirmButton: true
        }).then(() => {
          this.router.navigate(['login']);
        });
      },
      error: (err) => {
        console.error('❌ Erreur d\'inscription:', err);
        
        let errorMessage = 'Une erreur est survenue lors de l\'inscription.';
        
        if (err.status === 409) {
          errorMessage = 'Cet email est déjà utilisé. Veuillez utiliser un autre email.';
        } else if (err.status === 400) {
          errorMessage = 'Données invalides. Vérifiez vos informations.';
        } else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'inscription',
          text: errorMessage,
          showConfirmButton: true
        });
      }
    });
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.registerForm.reset();
  }

  // Rediriger vers la page de connexion
  goToLogin() {
    this.router.navigate(['login']);
  }
}