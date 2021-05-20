import * as edition from '../actions/edition.actions';
import { Edition } from '@app/editions/model/Edition.model';

export interface State {
  selectedEdition: string | null;
  edition: Edition;
  loaded: boolean | false;
  loading: boolean | false;
}

export const initialState: State = {
  selectedEdition: null,
  edition: null,
  loaded: false,
  loading: false
};

export function reducer(state: State, action: edition.EditionActions): State {
  switch (action.type) {
    case edition.SELECT_EDITION_SUCCESS: {
      return {
        edition: action.edition ? action.edition : null,
        selectedEdition: action.edition ? action.edition._id : null,
        loading: true,
        loaded: false
      };
    }

    default: {
      return state;
    }
  }
}
