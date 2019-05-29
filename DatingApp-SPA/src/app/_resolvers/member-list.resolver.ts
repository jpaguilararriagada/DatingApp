import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MemberListResolver implements Resolve<User> {
/**
 *
 */
constructor(private userService: UserService,
            private router: Router,
            private alertifiy: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return  this.userService.getUsers().pipe(
            catchError(error => {
                this.alertifiy.error('Problema al traer data lista de members MemberList');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
