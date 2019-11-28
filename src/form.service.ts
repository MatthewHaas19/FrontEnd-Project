import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface FormDetails {
  label: string
  type: string
  value: string
}

export interface FormFields {
  label: string
  type: string
  value: string
  isOptional: string
  isHidden: string
}

export class JSONoutput {
  label: string
  value: string
  isValid: boolean
}





@Injectable()
export class FormService {

  constructor(){}


  public generateJson(result: FormFields) : Observable<any> {

    if(!result.label){
      return of(JSON.parse('{"error" : "ERROR_missingeLabel"}'))
    }

    if(result.isOptional === 'no' && !result.value){
      return of(JSON.parse('{"error" : "ERROR_MissingField"}'));
    }
    else{
      if(!result.value){
        return of(result)
      }
    }


    if(result.type === "number"){
      if(Number(result.value)){
        return of(result);
      }
      else{
        return of(JSON.parse('{"error" : "ERROR_Number"}'));
      }
    }
    if(result.type === "email"){

        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(regexp.test(result.value)){
          return of(result);
        }
        else{
          return of(JSON.parse('{"error" : "ERROR_Mail"}'));
        }
    }
    else{
      return of(result);
    }



  }
}
