import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
        const loadRoute = (delay) => delay ? timer(2000).pipe(flatMap(_ => load())) : load();
        return route.data && route.data.preload ? loadRoute(route.data.delay) : of(null);
    } else {
        return of(null);
    }
  }
}
