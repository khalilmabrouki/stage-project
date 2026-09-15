import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userDetails:any;
constructor(private service: CrudService,private router:Router) { 
   this.userDetails = this.service.userDetails();
  }
}
