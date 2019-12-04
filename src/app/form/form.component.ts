//Imports declarations

import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms'
import {FormService, FormDetails,Field, JSONoutput} from '../../form.service'
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs'
import {ResultAdd} from '../../app.state';
import {MatSnackBar} from '@angular/material/snack-bar';

//The JSON file (That should have been sent by the server)
import JSONFields from '../../ApiFields.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

//The class implements OnInit in order to initialize the form when you access to the component.
export class FormComponent implements OnInit {

  //Variables declarations


  myForm : FormGroup;

  title = 'FrontEnd Assessment';

  Json : Field[];

  results: Observable<JSONoutput[]>;

  items : FormArray


  //FormBuilder is the module I used from angular to create my form
  //formService is the Service I created in order to manage the asynchronous actions
  //snackBar is the module form Angular Material that I used to make the alert errors
  //Store Module permit the state Management with ngrx
  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private _snackBar: MatSnackBar,
              private store: Store<{results : JSONoutput[]}>) {
                this.results = store.pipe(select('results'))
              }


  //Method lauched when you access to the component
  ngOnInit() {
    this.myForm = this.formBuilder.group({});

    //We call the method that will request the Json to the API
    this.formService.getJsonFromApi().subscribe((data) => {
        this.Json = data;

        this.initForm(data);
    },(error) => {
      console.log("error : " + error);
    }
  )
  }


  //Building the form dynamicaly
  initForm(data){

    this.myForm = this.formBuilder.group({
      values: this.formBuilder.array([])
    });

    for(let field of data){
      this.addField(field)
    }
  }


  //Method which permits to create a new field in our form
  createFields(field): FormGroup {
    return this.formBuilder.group({
      label : field.label,
      type : field.type,
      value : [field.value],
      default : field.default,
      isOptional : field.isOptional,
      isHidden : field.isHidden
    })
  }

  //Method which permits to add a new field in our form
  addField(item){
    this.items = this.myForm.get('values') as FormArray;
    this.items.push(this.createFields(item))
  }

  //Methode used to send the result on the result component with the state management
  addResult(field : JSONoutput) {
    const result = new JSONoutput();
    result.label = field.label;
    result.value = field.value;
    result.isValid = field.isValid;
    this.store.dispatch(new ResultAdd(result))
  }



  //Method launched when submitting the form
  onSubmitForm() {

    const formValue = this.myForm.value;

    //We send this tab to the service which will check if the field value is Valid (async method)
    this.formService.generateJson(formValue.values).subscribe((data) => {
      //And then we manage the result, if it's an error we alert the user, if not we change the state.

      if(data.error){
        this.openSnackBar(data.error);
      }
      else{

        let Json : JSONoutput = {
          label : '',
          value : '',
          isValid: false
        }

        //We send the JSON for all the fields. That would have been easier to send only one Json
        //but I've done like this in order to keep the model {label,value,isValid}.

        for(let field of data){
          Json.label = field.label;
          Json.value = field.value;
          Json.isValid = true;
          this.addResult(Json);
        }
      }
    })
  }




  //Open an alert pop-up if there is an error.
  openSnackBar(action: string) {
      this._snackBar.open('Error : ', action, {
        duration: 2000,
      });
    }

}
