import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms'
import {FormService, FormDetails,FormFields, JSONoutput} from '../../form.service'
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


  myForm : FormGroup;

  title = 'FrontEnd Assessment';

  results: Observable<JSONoutput[]>;

  json: JSONoutput = {
    label : "",
    value : "",
    isValid: false,

  };


  credentials: FormFields = {
    label : "",
    type : "",
    value : "",
    isOptional : 'no',
    isHidden : 'no'
  };


  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private router: Router,
              private store: Store<{results : JSONoutput[]}>) {
                this.results = store.pipe(select('results'))
              }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.myForm = this.formBuilder.group({
      label : '',
      type : 'number',
      value : '',
      isOptional : 'no',
      isHidden : 'no'
    });
  }

  addResult() {
    console.log(this.json)
    const result = new JSONoutput();
    result.label = this.json.label;
    result.value = this.json.value;
    result.isValid = this.json.isValid;
    this.store.dispatch(new ResultAdd(result))
  }


  onSubmitForm() {

    const formValue = this.myForm.value;

    this.credentials.label = formValue.label
    this.credentials.type = formValue.type
    this.credentials.value = formValue.value
    this.credentials.isOptional = formValue.isOptional
    this.credentials.isHidden = formValue.isHidden


    this.formService.generateJson(this.credentials).subscribe((data) => {
      console.log(data);
      if(data.error){
        alert(data.error)
      }
      else{
        this.json.label = data.label;
        this.json.value = data.value;
        this.json.isValid = true;
        this.addResult()
      }
    })



  //  this.router.navigate(['result'])

  }

}
