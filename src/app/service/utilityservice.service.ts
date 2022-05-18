import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Utilityservice {

  isUpdate = new BehaviorSubject<boolean>(false);
  constructor() { }
}
