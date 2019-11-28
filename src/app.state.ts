import {Action} from '@ngrx/store';

//We define the app state action manager


//Method selector : Add or Remove
export enum ResultActionTypes {
  Add = '[Form] Add',
  Remove = '[Form] Remove'
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class ResultAdd implements ActionEx {
  readonly type = ResultActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class ResultRemove implements ActionEx {
  readonly type = ResultActionTypes.Remove;
  constructor(public payload: any) {
  }
}
