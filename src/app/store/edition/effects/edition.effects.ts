import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as EditionsActions from '../actions/edition.actions';
import { State } from '@app/store/edition/reducers/edition.reducers';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EditionsEffects {
  constructor(private actions$: Actions) {}

  @Effect() selectEdition$: Observable<any> = this.actions$.pipe(
    ofType(EditionsActions.SELECT_EDITION),
    map(
      (action: any) => new EditionsActions.SelectEditionSuccess(action.edition)
    ),
    catchError(err => of(err))
  );
}
