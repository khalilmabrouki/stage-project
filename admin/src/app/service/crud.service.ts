import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entity/Admin.Entity';
import { Observable } from 'rxjs';
import { Candidat } from '../Entity/Candidat.Entity';
import { Offer } from '../Entity/Offer.Entity';
import { Contact } from '../Entity/Contact.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  helper= new JwtHelperService();
  apiUrl='http://localhost:8080/api';
 loginurl='http://localhost:8080/api/admin/login';


  constructor(private http : HttpClient) { }




  /* َAdmin CRUD operations */

  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginurl, admin);
  }

  
addadmin(admin:Admin){
    return this.http.post<any>(this.apiUrl+"/admin", admin);
  }


getAdmin(): Observable<any> {  // Utiliser any au lieu du type complexe
  return this.http.get<any>(`${this.apiUrl}/admin`);
}
  onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}` //lire id dans entity admin 
    return this.http.delete(url )
  }


isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  userDetails(){
    let token:any=localStorage.getItem('myToken'); 
    let decodeToken= this.helper.decodeToken(token); 
     return decodeToken.data; 
   }


   updateAdmin(id:number,admin: Admin) {
    const url = `${this.apiUrl+"/admin"}/${id}`;
    return this.http.put<any>(url,admin);
  }


   findAdminById(id : number): Observable<Admin> {
    const url = `${this.apiUrl + "/admin"}/${id}`;
    return this.http.get<Admin>(url)
  }

  /* َCandidat CRUD operations */

getCandidat(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/candidat`);
}



  onDeleteCandidat(id: number): Observable<any> {
    const url = `${this.apiUrl}/candidat/${id}`;
    return this.http.delete(url);
  }

  

  /* َOffer CRUD operations */

getOffer(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/offer`);
}

  onDeleteOffer(id: number): Observable<any> {
    const url = `${this.apiUrl}/offer/${id}`;
    return this.http.delete(url);
  }




  /* Contact CRUD operations */

   getContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + "/contact");
  }

  onDeleteContact(id: number): Observable<any> {
    const url = `${this.apiUrl}/contact/${id}`;
    return this.http.delete(url);
  }

  

}
