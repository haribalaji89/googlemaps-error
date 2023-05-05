import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { UserService } from '../generic/user.service';

@Injectable({
  providedIn: 'root'
})
export class DealerAuthGuard implements CanLoad {
  constructor(private _router: Router,private _userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuthenticatedUser();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkAuthenticatedUser();
  }

  checkAuthenticatedUser() {
    //const currentUser: any = JSON.parse(localStorage.getItem('dealer-details'));
    const currentUser: any = this._userService.getDealerStorageData();
    if (currentUser && currentUser.userType && currentUser.userType.trim() === 'DEALER') {
      return true;
    }
    this._router.navigate(['/dealer/login']);
    return false;
  }
}
