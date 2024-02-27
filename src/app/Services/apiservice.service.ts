import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor() { }

  physicianSubject= new Subject()
  patientSubjet=new Subject()

  patient:any
  
}
