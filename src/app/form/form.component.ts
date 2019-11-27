import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms'
import {FormService, FormDetails} from '../../form.service'
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs'
import {ResultAdd} from '../../app.state';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private id = 0;
  myForm : FormGroup;


  title = 'FrontEnd Assessment';

  results: Observable<FormDetails[]>;

  credentials: FormDetails = {
    label : "",
    type : "",
    value : "",

  } as FormDetails;


  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private router: Router,
              private store: Store<{results : FormDetails[]}>) {
                this.results = store.pipe(select('results'))
              }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.myForm = this.formBuilder.group({
      label : '',
      type : '',
      value : '',
      isOptional : 'no',
      isHidden : 'no'
    });
  }

  addResult() {
    const results = {
      label: this.credentials.label,
      type: this.credentials.type,
      value: this.credentials.value
    }

    this.store.dispatch(new ResultAdd(results))

  }


  onSubmitForm() {

    const formValue = this.myForm.value;

    this.credentials.label = formValue.label
    this.credentials.type = formValue.type
    this.credentials.value = formValue.value

    this.addResult()


    console.log(this.credentials)


  //  this.router.navigate(['result'])

  }

}
