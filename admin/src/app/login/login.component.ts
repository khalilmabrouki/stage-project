import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Admin } from '../Entity/Admin.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm: FormGroup;
  loginAttempts = 0;
  isLocked = false;
  timeLeft = 25;
  timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) { 
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
      ]),
      mdp: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ])
    }
    this.loginForm = this.fb.group(formControls);
  }

  get email() { return this.loginForm.get('email'); }
  get mdp() { return this.loginForm.get('mdp'); }

  startTimer() {
    this.isLocked = true;
    this.timeLeft = 25;
    
    // Create and show the timer dialog
    const timerDialog = Swal.fire({
      title: 'Compte bloqué',
      html: 'Temps restant: <strong></strong> secondes.',
      timer: 25000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        const content = Swal.getHtmlContainer();
        const timerElement = content?.querySelector('strong');
        this.timerInterval = setInterval(() => {
          this.timeLeft--;
          if (timerElement) {
            timerElement.textContent = this.timeLeft.toString();
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(this.timerInterval);
      }
    }).then((result) => {
      this.isLocked = false;
      this.loginAttempts = 0;
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          icon: 'info',
          title: 'Débloqué',
          text: 'Vous pouvez maintenant réessayer de vous connecter.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  login() {
    if (this.isLocked) {
      Swal.fire({
        icon: 'error',
        title: 'Accès temporairement bloqué',
        text: `Veuillez attendre ${this.timeLeft} secondes avant de réessayer.`,
        showConfirmButton: true
      });
      return;
    }

    if (this.loginForm.invalid) {
      let errorMessage = '';
      if (this.email?.errors) {
        if (this.email.errors['required']) {
          errorMessage += 'L\'email est requis.\n';
        } else if (this.email.errors['pattern']) {
          errorMessage += 'L\'email doit se terminer par @gmail.com\n';
        }
      }
      if (this.mdp?.errors) {
        if (this.mdp.errors['required']) {
          errorMessage += 'Le mot de passe est requis.\n';
        } else if (this.mdp.errors['minlength']) {
          errorMessage += 'Le mot de passe doit contenir au moins 3 caractères.\n';
        } else if (this.mdp.errors['pattern']) {
          errorMessage += 'Le mot de passe ne doit contenir que des caractères alphanumériques.\n';
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Champs invalides',
        text: errorMessage.trim(),
        showConfirmButton: true
      });
      return;
    }

    let data = this.loginForm.value;
    let admin = new Admin(null, null, null, data.email, data.mdp, null);

    this.service.loginAdmin(admin).subscribe({
      next: (res) => {
        let token = res.token;
        localStorage.setItem("myToken", token);
        localStorage.setItem("role", res.role);
        
        Swal.fire({
          icon: 'success',
          title: 'Connecté',
          text: 'Connexion réussie !',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['ajouteradmin']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        this.loginAttempts++;
        
        if (this.loginAttempts >= 3) {
          this.startTimer();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion',
            text: `Email ou mot de passe incorrect. Tentative ${this.loginAttempts}/3`,
            showConfirmButton: true
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }







}
