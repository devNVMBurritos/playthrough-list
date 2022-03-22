import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean
  admin: boolean
  constructor(
    authenticationService: AuthenticationService
  ) {
    this.loggedIn = authenticationService.isLoggedIn
    this.admin = authenticationService.currentUserValue.isAdmin
    authenticationService.currentUser?.subscribe(
      data =>{
        this.loggedIn = data.username != null;
        this.admin = data.isAdmin;
      }
    )
  }

  ngOnInit(): void {
  }

}
