import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreBookGuard implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.loadPrebookingModule();
  }

  loadPrebookingModule(): boolean {
    return true;
  }
}
