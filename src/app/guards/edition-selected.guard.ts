/* core */
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
/* store */
import { State } from '../store/edition/reducers/edition.reducers';

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getEdition } from '@app/store/edition/selectors/edition.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class EditionSelectedGuard implements CanActivate, CanLoad {
  constructor(private store: Store<State>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.store.pipe(
      select(getEdition),
      map(edition => {
        if (edition) {
          return true;
        }
        return false;
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.store.pipe(
      select(getEdition),
      map(edition => {
        if (edition) {
          return true;
        }
        return false;
      })
    );
  }
}
