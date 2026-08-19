import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { ListadminComponent } from './listadmin/listadmin.component';
import { LoginComponent } from './login/login.component';
import { ListcandidatComponent } from './listcandidat/listcandidat.component';
import { ListofferComponent } from './listoffer/listoffer.component';
import { ListcontactComponent } from './listcontact/listcontact.component';

const routes: Routes = [

{path : 'ajouteradmin' , component :AjouteradminComponent},
{path : 'listadmin' , component : ListadminComponent},
{path : '' , component : LoginComponent},
{path : 'listcandidat', component:ListcandidatComponent},
{path : 'listoffer', component:ListofferComponent},
{path : 'listcontact', component:ListcontactComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
