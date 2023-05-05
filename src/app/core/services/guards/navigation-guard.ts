import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmitterService } from '@core/services/emitter.service';

@Injectable({
    providedIn: 'root'
})

export class NavigationGuard implements CanDeactivate<any> {
  constructor(
    private _emitterService: EmitterService,
  ) {}
  canDeactivate() {
    this._emitterService.navigation$.subscribe((value) => {
      if (value) {
        history.pushState(null, null, location.href);
        this._emitterService.updateNavigation(false);
        return false;
      }
    });
    return true;
  }
}

