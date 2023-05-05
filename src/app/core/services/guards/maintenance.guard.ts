import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../generic/general.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard {

  constructor(private _router: Router, private generalService: GeneralService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isUnderMaintenance(state.url.trim());
  }

  private navigateToMaintenance():boolean {
    this._router.navigate(['/maintenance']);
    return false;
  }
  private navigateToHome(currentUrl: string, isUnderMaintenance?: boolean): boolean {
    if ((currentUrl === '/maintenance' || currentUrl === "/subscriptions/maintenance") && !(isUnderMaintenance)) {
      this._router.navigate(['/']);
      return false;
    } else if (currentUrl === '/maintenance' && isUnderMaintenance === true) {
      return true;
    } else if (isUnderMaintenance === true)
      this.navigateToMaintenance();
    else
      return true;
  }

  private isUnderMaintenance(currentUrl:string): Promise<boolean> {
    return new Promise((resolve) => {
      this.generalService.isUnderMaintenance().subscribe(response => {
        if (response && response.data) {
          return resolve(this.navigateToHome(currentUrl,response.data.status));
        }
        else
          return resolve(true);
      }, err => {
        console.log('err',err);
        return resolve(true);
      })
    })
  }
}
