import {FormDetails} from '../../form.service';
import {Action} from '@ngrx/store';
import {ActionEx,ResultActionTypes} from '../../app.state'
import {Observable} from 'rxjs'

export const initialState = []

export function FormReducer(state= initialState, action: ActionEx) {
  switch(action.type) {
    case ResultActionTypes.Add:
      console.log(action.payload)
      return [...state, action.payload];
    case ResultActionTypes.Remove:
      return [
        ...state.slice(0,action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }

}
