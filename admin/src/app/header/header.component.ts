import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userDetails:any;
constructor(private service: CrudService,private router:Router) { 
   this.userDetails = this.service.userDetails();
  }
  ngOnInit(): void {
console.log(this.userDetails); }  
  logout() {
    
    localStorage.clear();
    sessionStorage.clear();
    
    
    this.router.navigate(['/']).then(() => {
      
      window.location.reload();
      
      
      setTimeout(() => {
        alert('Vous avez été déconnecté avec succès');
      }, 100);
    });
  }

}
