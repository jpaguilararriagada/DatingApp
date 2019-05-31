import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';


@Injectable({providedIn: 'root'})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(
        component: MemberEditComponent,
    ): Observable<boolean>|Promise<boolean>|boolean {
        if (component.editForm.dirty) {
            return confirm('Estas seguro que deseas continuar sin guardar los cambios ?. Los cambios hechos se perderan.');
        }
        return true;
    }
}
