import { Action } from '@ngrx/store';
import { Edition } from '@app/editions/model/Edition.model';

export const SELECT_EDITION = '[Edition] SELECT EDITION';
export const SELECT_EDITION_SUCCESS = '[Edition] SELECT EDITION SUCCESS';
export const SELECT_EDITION_ERROR = '[Edition] SELECT EDITION ERROR';

export class SelectEdition implements Action {
  readonly type = SELECT_EDITION;
  constructor(public edition: Edition | null) {}
}

export class SelectEditionSuccess implements Action {
  readonly type = SELECT_EDITION_SUCCESS;
  constructor(public edition: Edition | null) {}
}

export class SelectEditionError implements Action {
  readonly type = SELECT_EDITION_ERROR;
  constructor(public payload: string) {}
}

export type EditionActions =
  | SelectEdition
  | SelectEditionSuccess
  | SelectEditionError;
