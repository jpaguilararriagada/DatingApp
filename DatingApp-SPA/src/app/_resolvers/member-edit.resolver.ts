import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class MemberEditResolver implements Resolve<User> {
/**
 *
 */
constructor(private userService: UserService,
            private router: Router,
            private alertifiy: AlertifyService,
            private auth: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return  this.userService.getUser(this.auth.decodedToken.nameid).pipe(
            catchError(error => {
                console.log(error);
                this.alertifiy.error('Problema al traer data,editar');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
