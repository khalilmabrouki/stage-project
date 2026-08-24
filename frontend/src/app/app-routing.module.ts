import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterjeunediplomeComponent } from './registerjeunediplome/registerjeunediplome.component';
import { RegisterresponsableentrepriseComponent } from './registerresponsableentreprise/registerresponsableentreprise.component';

const routes: Routes = [

 { path: 'home', component: HomeComponent },
 {path : 'about',component :AboutComponent},
 {path: 'contact',component :ContactComponent},
 {path :'login', component:LoginComponent},
 {path:'register',component:RegisterComponent},
 {path :'registerjeunediplome',component:RegisterjeunediplomeComponent},
 {path :'registerresponsableentreprise',component:RegisterresponsableentrepriseComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
