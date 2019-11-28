import { Component} from '@angular/core';
import {JSONoutput, FormDetails,FormFields} from '../../form.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs'
import {ResultRemove} from '../../app.state';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent{

  results: Observable<JSONoutput[]>;

  constructor(private store: Store<{results : JSONoutput[]}>) {
    this.results = this.store.pipe(select('results'))
  }

  removeResult(index) {
    this.store.dispatch(new ResultRemove(index));
  }





}
