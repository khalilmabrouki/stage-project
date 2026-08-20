import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entity/Admin.Entity';
import { Observable } from 'rxjs';
import { Candidat } from '../Entity/Candidat.Entity';
import { Offer } from '../Entity/Offer.Entity';
import { Contact } from '../Entity/Contact.Entity';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  
  apiUrl='http://localhost:8080/api';
 loginurl='http://localhost:8080/api/admin/login';


  constructor(private http : HttpClient) { }


  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginurl, admin);
  }

  
addadmin(admin:Admin){
    return this.http.post<any>(this.apiUrl+"/admin", admin);
  }



  getAdmin(): Observable<Admin[] | { admins: Admin[] } | { data: Admin[] }>{
    return this.http.get<Admin[] | { admins: Admin[] } | { data: Admin[] }>(this.apiUrl +"/admin");
  }
  onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}` //lire id dans entity admin 
    return this.http.delete(url )
  }







    getCandidat(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.apiUrl + "/candidat");
  }

  onDeleteCandidat(id: number): Observable<any> {
    const url = `${this.apiUrl}/candidat/${id}`;
    return this.http.delete(url);
  }

  




    getOffer(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl + "/offer");
  }

  onDeleteOffer(id: number): Observable<any> {
    const url = `${this.apiUrl}/offer/${id}`;
    return this.http.delete(url);
  }






   getContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + "/contact");
  }

  onDeleteContact(id: number): Observable<any> {
    const url = `${this.apiUrl}/contact/${id}`;
    return this.http.delete(url);
  }

  

}
