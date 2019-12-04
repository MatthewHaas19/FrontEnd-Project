import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

//We define a service which will permit to check if our fields are correct and we also define our models.


export interface FormDetails {
  label: string
  type: string
  value: string
}

export interface Field {
  label: string
  type: string
  value: any
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

  constructor(private http: HttpClient){}



  //http request to get the json from the api, errors are handled in the interceptor service
  public getJsonFromApi(): Observable<Field[]> {

    return this.http.get<Field[]>('/api');

  }


  //We check for all of our fields if the type is correct and if there is no missing field
  public generateJson(fields: Field[]) : Observable<any> {

    let ret = []
    for(let field of fields){
      if(field.isHidden){
        field.result = field.value;
      }

      if(!field.result){
        if(field.isOptional){
          if(field.default){
            field.result = field.default;
          }else{
            field.result = ""
          }
        }
        else{
          if(!field.isOptional){
            if(field.default){
              field.result = field.default;
            }
            else{
              return of(JSON.parse('{"error" : "Missinge Field"}'));
            }
          }
        }
      }





      if(field.type === "email"){
          const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          if(!regexp.test(field.result)){
            return of(JSON.parse('{"error" : "Value is not of mail type"}'));
          }
      }

      if(field.type === "telephone"){
          const regexp = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
          if(!regexp.test(field.result)){
            return of(JSON.parse('{"error" : "Value is not of telephone type"}'));
          }
      }


      ret.push(field)
    }
    return of(ret)
  }
}
