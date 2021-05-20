import { createSelector } from '@ngrx/store';

import * as fromEdition from '../index';

export const getEdition = createSelector(
  fromEdition.getEditionStore,
  (state: any) => {
    if (state && state.edition) {
      return state.edition;
    }
    return null;
  }
);
