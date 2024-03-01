import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor() { }

  physicianSubject= new Subject()
  physicianDetailSubject=new Subject()
  patientSubjet=new Subject()
  patientDetailSubject=new Subject()
  onCallSubject=new Subject()
  nurseSubject=new Subject()
  appointmentHomeSubject=new Subject()
  appointmentSubject=new Subject()
  patient:any
  nurses
  
}
