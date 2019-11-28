import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface FormDetails {
  label: string
  type: string
  value: string
}

@Injectable()
export class FormService {

  constructor(){}

}
