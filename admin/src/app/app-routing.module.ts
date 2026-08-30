import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { ListadminComponent } from './listadmin/listadmin.component';
import { LoginComponent } from './login/login.component';
import { ListcandidatComponent } from './listcandidat/listcandidat.component';
import { ListofferComponent } from './listoffer/listoffer.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { AuthGuard } from './service/AuthGuard.service';
import { HomeComponent } from './home/home.component';
import { ModfieradminComponent } from './modfieradmin/modfieradmin.component';

const routes: Routes = [

{path : 'ajouteradmin' , component :AjouteradminComponent, canActivate: [AuthGuard]},
{path : 'listadmin' , component : ListadminComponent,canActivate: [AuthGuard]},
{path : '' , component : LoginComponent},
{path : 'listcandidat', component:ListcandidatComponent, canActivate: [AuthGuard]},
{path : 'listoffer', component:ListofferComponent,canActivate: [AuthGuard]},
{path : 'listcontact', component:ListcontactComponent,canActivate: [AuthGuard]}, 
{path : 'home', component:HomeComponent,canActivate: [AuthGuard]},
{path : 'modfieradmin/:id', component:ModfieradminComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
