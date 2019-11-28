import {JSONoutput} from '../../form.service';
import {Action} from '@ngrx/store';
import {ActionEx,ResultActionTypes} from '../../app.state'
import {Observable} from 'rxjs'

export function FormReducer(state: JSONoutput[] = [], action: ActionEx) {
  switch(action.type) {
    case ResultActionTypes.Add:
      console.log(state)
      console.log([...state, action.payload])
      return [...state, action.payload];
    case ResultActionTypes.Remove:
      console.log(action.payload)
      return [
        ...state.slice(0,action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      console.log('test')
      return state;
  }
}
