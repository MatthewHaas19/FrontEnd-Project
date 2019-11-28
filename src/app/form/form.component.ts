import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms'
import {FormService, FormDetails} from '../../form.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myForm : FormGroup;


  title = 'FrontEnd Assessment';

  credentials: FormDetails = {

    label : "",
    type : "",
    value : "",

  };


  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.myForm = this.formBuilder.group({
      label : '',
      type : '',
      value : ''
    });
  }

  onSubmitForm() {

    const formValue = this.myForm.value;

    this.credentials.label = formValue.label
    this.credentials.type = formValue.type
    this.credentials.value = formValue.value

    console.log(this.credentials)


    this.router.navigate(['result'])

  }

}
