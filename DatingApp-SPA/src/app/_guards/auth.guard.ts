import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertifiy: AlertifyService) {
  }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertifiy.error('Debe logearte antes de acceder a esta seccion.');
    this.router.navigate(['/home']);
    return false;
  }



}
