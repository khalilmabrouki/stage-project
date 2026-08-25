import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JeuneDiplome } from '../Entity/JeuneDiplome.Entity';
import { ResponsableEntreprise } from '../Entity/ResponsableEntreprise.Entity';
import { Candidat } from '../Entity/Candidat.Entity';
import { Contact } from '../Entity/Contact.Entity';

@Injectable({
  providedIn: 'root'
})



export class CrudService {

  apiUrl='http://localhost:8080/api';



  constructor(private http : HttpClient) { }


  // ===== JEUNE DIPLOME =====
getJeuneDiplome(): Observable<JeuneDiplome[]> {
  return this.http.get<JeuneDiplome[]>(`${this.apiUrl}/jeunediplome`);
}

onDeleteJeuneDiplome(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/jeunediplome/${id}`);
}

registerJeuneDiplome(jeuneDiplome: JeuneDiplome): Observable<any> {
  return this.http.post(`${this.apiUrl}/jeunediplome`, jeuneDiplome);
}

// ===== JEUNE DIPLOME =====
loginJeuneDiplome(jeuneDiplome: JeuneDiplome): Observable<any> {
  console.log('🔵 Login jeune diplômé:', jeuneDiplome);
  return this.http.post(`${this.apiUrl}/jeunediplome/login`, jeuneDiplome);
}






// ===== RESPONSABLE ENTREPRISE =====
getResponsableEntreprise(): Observable<ResponsableEntreprise[]> {
  return this.http.get<ResponsableEntreprise[]>(`${this.apiUrl}/responsableentreprise`);
}

onDeleteResponsableEntreprise(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/responsableentreprise/${id}`);
}

registerResponsableEntreprise(responsable: ResponsableEntreprise): Observable<any> {
  return this.http.post(`${this.apiUrl}/responsableentreprise`, responsable);
}
  // ===== RESPONSABLE ENTREPRISE =====
loginResponsableEntreprise(responsable: ResponsableEntreprise): Observable<any> {
  console.log('🔵 Login responsable:', responsable);
  return this.http.post(`${this.apiUrl}/responsableentreprise/login`, responsable);
}





// ===== CANDIDAT =====
registerCandidat(candidat: Candidat): Observable<any> {
  console.log('🔵 Inscription candidat:', candidat);
  return this.http.post(`${this.apiUrl}/candidat`, candidat);
}
// ===== CANDIDAT LOGIN =====
loginCandidat(candidat: Candidat): Observable<any> {
  console.log('🔵 Login candidat:', candidat);
  return this.http.post(`${this.apiUrl}/candidat/login`, candidat);
}




// ===== CONTACT =====
addContact(contact: Contact): Observable<any> {
  console.log('🔵 Envoi du message:', contact);
  return this.http.post(`${this.apiUrl}/contact`, contact);
}

getContacts(): Observable<Contact[]> {
  return this.http.get<Contact[]>(`${this.apiUrl}/contact`);
}

deleteContact(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/contact/${id}`);
}
}
