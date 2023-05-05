import { Injectable,SecurityContext } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { COUNTRY,environment } from 'environments/in/environment.dev';
import { CryptoService } from '../crypto.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../generic/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private _router: Router, private cryptoService: CryptoService,private sanitizer: DomSanitizer	,private _userService: UserService) {
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {   
    if (!route.params.hasOwnProperty('configToken')) {
      return this.checkAuthenticatedUser(state);
    } else {
      return true;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkAuthenticatedUser('');
  }

  checkAuthenticatedUser(state) {
    const currentUser: any = this._userService.getLocalstorageData();
    if (currentUser && currentUser.userType && currentUser.userType.trim() !== 'DEALER') {
      return true;
    }

    if (COUNTRY.COUNTRY_CODE === 'sg') {
     // this._router.navigate(['/login'], {queryParams: {_returnUrl: state.url}});
      this.gcdmLogin();
      return false;
    } else {
      const userType = localStorage.getItem('userType') ? this.cryptoService.get('userType', localStorage.getItem('userType')) : '';
      if (userType === 'guest' && localStorage.getItem('guest-user-details')) {
        return true;
      } else {
        this.gcdmLogin();
        //this._router.navigate(['/login']);
        return false;
      }
    }

    // return false;
  }

  gcdmLogin(){      
    let loginUrl =  environment.GCDM_LOGIN;
    window.open(this.buildLoginUrl(loginUrl),'_self');    
  }

  buildLoginUrl(login){
    let countryCode =  COUNTRY.COUNTRY_CODE.toUpperCase();
    let marketBrand = 'bmw';
    if(countryCode.toLowerCase() === 'au_bmw'){
      countryCode = 'AU';
    }else if(countryCode.toLowerCase() === 'in_mini'){
      countryCode = 'IN';
      marketBrand = 'mini';
    }
    let state =  (window as any).location.href.split('#')[1];   
    let redirectUrl =  encodeURIComponent((window as any).location.href.split('#')[0]);    
    let buildUrl = this.sanitizer.sanitize(SecurityContext.HTML,login+'?client=smmsonlinesales&brand='+marketBrand+'&country='+countryCode+'&language=en&scope=authenticate_user openid&response_type=code id_token&redirect_uri='+redirectUrl+'&state='+state);    
    buildUrl = buildUrl.replace(/amp;/g, '');
    return buildUrl;
  } 
}
