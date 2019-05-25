import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.login( this.model ).subscribe( next => {
      this.alertify.success('Bienvenido');
    }, error => this.alertify.error(`${error}`),
    () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {

    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Hasta luego!');
    this.router.navigate(['/home']);
    this.model = {};
  }
}
