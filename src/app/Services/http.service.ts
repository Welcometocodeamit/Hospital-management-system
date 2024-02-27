import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  BASE_URL='https://gdtc-training-api.azurewebsites.net/api/hospital/'

  getPhysician(){
    return this.http.get(this.BASE_URL+`physician`)
  }

  getPhysicianById(id:number){
    return this.http.get(this.BASE_URL+`physician/${id}`)
  }

  updatePhysician(physician){
    return this.http.put(this.BASE_URL+`physician`, physician)
  }

  addPhysician(physician){
    return this.http.post(this.BASE_URL+`physician`, physician)
  }

  deletePhysician(physician){
    return this.http.delete(this.BASE_URL+`physician`, {body:physician})
  }

  getPatient(){
    return this.http.get(this.BASE_URL+`patients`)
  }

  getPatientTreatmentDetails(id){
    return this.http.get(this.BASE_URL+`patients/patientUndergoing/${id}`)
  }

  updatePatient(patient){
    return this.http.put(this.BASE_URL+`patients/`, patient)
  }

  addPatient(patient){
    return this.http.post(this.BASE_URL+`patients`, patient)
  }

  deletePatient(patient){
    return this.http.delete(this.BASE_URL+`patients`, {body:patient})
  }
}
