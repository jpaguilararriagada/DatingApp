import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any ={};
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.login( this.model ).subscribe( next => {
      console.log('Logeado');
    }, error => console.log(error));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
