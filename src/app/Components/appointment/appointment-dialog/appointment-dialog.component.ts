import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent {

  constructor(private service:ApiserviceService, private formBuilder:FormBuilder, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpService, private activeRoute:ActivatedRoute){}

  
  

  patients
  physicians
  oncalls

  ngOnInit(): void {
    this.http.getPatient().subscribe((data)=>{
      this.patients=data
    })

    this.http.getPhysician().subscribe((data)=>{
      this.physicians=data
    })

    this.http.getOnCalls().subscribe((data)=>{
      this.oncalls=data
    })


    this.appointmentForm = this.formBuilder.group({
      appointmentId:[this.data.appointment.appointmentId, ],
      patientId:[this.data.appointment.patient.patientId ,],
      physicianId: [this.data.appointment.physician.physicianId ,],
      onCallId: [this.data.appointment.prepNurse.onCallId ,],
      startDateTime:[this.data.appointment.starDateTime,],
      endDateTime:[this.data.appointment.endDateTime,]
    });
  }

  appointmentForm:FormGroup

  update(){
    if(this.data.method=='Update'){
      this.http.updateAppointment(this.appointmentForm.value).subscribe((data)=>{
        this.http.getAppointmentById(this.data.appointment.appointmentId).subscribe((data)=>{
          this.service.appointmentSubject.next(data)
        })
      })
    }else if(this.data.method=='Add'){
      this.http.addAppointment(this.appointmentForm.value).subscribe((data)=>{
        this.http.getAppointments().subscribe((data)=>{
          this.service.appointmentHomeSubject.next(data)
        })
      })
    }
  }
}
