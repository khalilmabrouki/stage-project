import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterjeunediplomeComponent } from './registerjeunediplome/registerjeunediplome.component';
import { RegisterresponsableentrepriseComponent } from './registerresponsableentreprise/registerresponsableentreprise.component';
import { LoginJeuneDiplomeComponent } from './login-jeune-diplome/login-jeune-diplome.component';
import { LoginResponsableEnterpriseComponent } from './login-responsable-enterprise/login-responsable-enterprise.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ContactComponent,
    RegisterjeunediplomeComponent,
    RegisterresponsableentrepriseComponent,
    LoginJeuneDiplomeComponent,
    LoginResponsableEnterpriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
