import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../Entity/Contact.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      sujet: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  get sujet() { return this.contactForm.get('sujet'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  getErrorMessage(control: any, fieldName: string) {
    if (control?.hasError('required')) {
      return `Le champ ${fieldName} est obligatoire`;
    }
    if (control?.hasError('minlength')) {
      return `Le champ ${fieldName} doit contenir au moins ${control.errors?.minlength?.requiredLength} caractères`;
    }
    if (control?.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    }
    if (control?.hasError('pattern')) {
      return 'L\'email doit se terminer par @gmail.com';
    }
    return '';
  }

  sendMessage() {
    if (this.contactForm.invalid) {
      let errorMessages: string[] = [];
      
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
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

    const data = this.contactForm.value;
    const contact = new Contact(
      undefined,
      data.sujet,
      data.email,
      data.message
    );

    this.service.addContact(contact).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Message envoyé !',
          text: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
          timer: 3000,
          showConfirmButton: true
        }).then(() => {
          this.contactForm.reset();
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'envoi du message.'
        });
      }
    });
  }

  resetForm() {
    this.contactForm.reset();
  }

}
