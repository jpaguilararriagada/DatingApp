import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MemberDetailResolver implements Resolve<User> {
/**
 *
 */
constructor(private userService: UserService,
            private router: Router,
            private alertifiy: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return  this.userService.getUser(route.params.id).pipe(
            catchError(error =>{
                this.alertifiy.error('Problema al traer data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
