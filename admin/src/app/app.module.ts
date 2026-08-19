import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { ListadminComponent } from './listadmin/listadmin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListcandidatComponent } from './listcandidat/listcandidat.component';
import { ListofferComponent } from './listoffer/listoffer.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
@NgModule({
  declarations: [
    AppComponent,
    AjouteradminComponent,
    ListadminComponent,
    LoginComponent,
    ListcandidatComponent,
    ListofferComponent,
    ListcontactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
