import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {

  constructor(private service:ApiserviceService, private formBuilder:FormBuilder, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpService, private activeRoute:ActivatedRoute){}



  prescriptionForm:FormGroup

  medication
  date=new Date

  ngOnInit(): void {
    this.http.getMedications().subscribe((data)=>{
      this.medication=data
    })

    this.prescriptionForm = this.formBuilder.group({
      id:[this.data.prescription.prescribedId],
      physician:[this.data.prescription.physician.physicianId],
      patient: [this.data.prescription.patientId],
      medication: [this.data.prescription.medication.medicationId],
      date:[this.date],
      appointment:[this.data.appointmentId],
      dose:[this.data.prescription.dose]
    });
  }

  Add(){
    if(this.data.method=='Add'){
      this.http.addPrescription(this.prescriptionForm.value).subscribe((data)=>{
        this.http.getAppointmentById(this.data.appointmentId).subscribe((data)=>{
          this.service.appointmentSubject.next(data)
        })
      })
    }else{
      this.http.updatePrescription(this.prescriptionForm.value).subscribe((data)=>{
        this.http.getAppointmentById(this.data.appointmentId).subscribe((data)=>{
          this.service.appointmentSubject.next(data)
        })
      })
    }
  }
}
