import { Component, OnInit} from '@angular/core';
import {FormDetails} from '../../form.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  Json : String;

  results: Observable<FormDetails[]>;

  constructor(private store: Store<{results : FormDetails[]}>) {

  }

  ngOnInit() {
    this.results = this.store.pipe(select('results'))

    console.log(this.results);

  }




}
