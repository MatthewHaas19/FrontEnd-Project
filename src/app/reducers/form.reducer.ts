import {JSONoutput} from '../../form.service';
import {Action} from '@ngrx/store';
import {ActionEx,ResultActionTypes} from '../../app.state'
import {Observable} from 'rxjs'


//We define our Reducer which receive informations with 'Action' and send them to the 'Store'
//It's the center of our state Management process
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
      return state;
  }
}
