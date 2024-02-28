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

  getNurse(){
    return this.http.get(this.BASE_URL+`nurse`)
  }

  addNurse(nurse){
    return this.http.post(this.BASE_URL+`nurse`, nurse)
  }

  updateNurse(nurse){
    return this.http.put(this.BASE_URL+`nurse`, nurse)
  }

  deletNurse(nurse){
    return this.http.delete(this.BASE_URL+`nurse`, {body:nurse})
  }

  getAppointments(){
    return this.http.get(this.BASE_URL+`appointment`)
  }

  getAppointmentById(appointmentId){
    return this.http.get(this.BASE_URL+`appointment/${appointmentId}`)
  }

  updateAppointment(appointment){
    return this.http.put(this.BASE_URL+`appointment`, appointment)
  }

  addAppointment(appointment){
    return this.http.post(this.BASE_URL+`appointment`, appointment)
  }

  deleteAppointment(appointment){
    return this.http.delete(this.BASE_URL+`appointment`, {body:appointment})
  }

  getPriscriptionByAppointmentId(id){
    return this.http.get(this.BASE_URL+`prescribed/appointment/${id}`)
  }

  addPrescription(prescription){
    return this.http.post(this.BASE_URL+`prescribed`, prescription)
  }

  updatePrescription(prescription){
    return this.http.put(this.BASE_URL+`prescribed`, prescription)
  }

  deletePrescription(prescription){
    return this.http.delete(this.BASE_URL+`prescribed`, {body:prescription})
  }

  getOnCalls(){
    return this.http.get(this.BASE_URL+`oncall`)
  }

  getMedications(){
    return this.http.get(this.BASE_URL+`medication`)
  }

  getBlocks(){
    return this.http.get(this.BASE_URL+`block`)
  }

  updateOnCall(onCall){
    return this.http.put(this.BASE_URL+`oncall`, onCall)
  }

  addOnCall(onCall){
    return this.http.post(this.BASE_URL+`oncall`, onCall)
  }

  deleteOnCall(oncall){
    return this.http.delete(this.BASE_URL+`oncall`, {body:oncall})
  }

  getTreatments(){
    return this.http.get(this.BASE_URL+`procedure`)
  }

  createCertificate(certificate){
    return this.http.post(this.BASE_URL+`trainedin`, certificate)
  }

  deleteCertificate(certificate){
    return this.http.delete(this.BASE_URL+ `trainedin`, {body:certificate})
  }
}
