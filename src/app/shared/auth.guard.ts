import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, currentRoute: ActivatedRoute) {}
    canActivate(route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if (route.queryParams['code']) {
                return true;
            } else {
                this.router.navigate(['/']);
            }
    }
}
