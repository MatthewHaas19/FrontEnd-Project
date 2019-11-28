import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//We define a service which will permit to check if our fields are correct and we also define our models.


export interface FormDetails {
  label: string
  type: string
  value: string
}

export interface Field {
  label: string
  type: string
  value: string
  default: string
  isOptional: boolean
  isHidden: boolean
}

export class JSONoutput {
  label: string
  value: string
  isValid: boolean
}





@Injectable()
export class FormService {

  constructor(){}


  //We check for all of our fields if the type is correct and if there is no missing field
  public generateJson(fields: Field[]) : Observable<any> {

    for(let field of fields){
      if(!field.isOptional && !field.value){
        return of(JSON.parse('{"error" : "Missinge Field"}'));
      }

      if(field.type === "number"){
        if(!Number(field.value) && field.value !== '0'){
          return of(JSON.parse('{"error" : "Value is not a number"}'));
        }
      }

      if(field.type === "mail"){
          const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          if(!regexp.test(field.value)){
            return of(JSON.parse('{"error" : "Value is not of mail type"}'));
          }
      }
    }
    return of(fields)
  }
}
