import { Component} from '@angular/core';
import {JSONoutput, FormDetails,Field} from '../../form.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs'
import {ResultRemove} from '../../app.state';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent{

  //We define the Observable where or results will be stored
  results: Observable<JSONoutput[]>;


  //We use the pipe method to get the result of the form when the state change
  constructor(private store: Store<{results : JSONoutput[]}>) {
    this.results = this.store.pipe(select('results'))
  }

  //We remove the result by calling the method ResultRemove from the app state action manager
  removeResult(index) {
    this.store.dispatch(new ResultRemove(index));
  }





}
