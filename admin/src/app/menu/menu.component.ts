import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  
  userDetails:any;
constructor(private service: CrudService,private router:Router) { 
   this.userDetails = this.service.userDetails();
  }
}
