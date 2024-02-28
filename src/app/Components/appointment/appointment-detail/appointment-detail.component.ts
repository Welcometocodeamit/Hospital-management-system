import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { PrescriptionComponent } from '../prescription/prescription.component';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent {

  constructor(private activeRoute:ActivatedRoute, private http:HttpService, public dialog: MatDialog, private route:Router, private service:ApiserviceService){}
  appointmentDetail
  prescription
  ngOnInit(){
    this.http.getAppointmentById(this.activeRoute.snapshot.params['appointmentId']).subscribe((data)=>{
      this.appointmentDetail=data
      this.http.getPriscriptionByAppointmentId(this.appointmentDetail.appointmentId).subscribe((data)=>{
        this.prescription=data
      })
    })

    this.service.appointmentSubject.subscribe((data)=>{
      this.appointmentDetail=data
      this.http.getPriscriptionByAppointmentId(this.appointmentDetail.appointmentId).subscribe((data)=>{
        this.prescription=data
      })
    })
  }

  openDialog(action) {
    const dialogRef = this.dialog.open(AppointmentDialogComponent,
      {data:{
        appointment:this.appointmentDetail,
        method:action
      }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteAppointment(){
    let appointment={appointmentId:this.appointmentDetail.appointmentId, 
                      patientId:this.appointmentDetail.patient.patientId, 
                      physicianId:this.appointmentDetail.physician.physicianId, 
                      onCallId:this.appointmentDetail.prepNurse.onCallId, 
                      startDateTime:this.appointmentDetail.startDateTime, 
                      endDateTime:this.appointmentDetail.endDateTime}
    this.http.deleteAppointment(appointment).subscribe((data)=>{
      this.route.navigate(['/Appointment'])
    })
  }

  AddPrescription(action){
    let p
    if(action=='Add'){
      p={
        prescribedId:0,
        physician:{physicianId:this.appointmentDetail.physician.physicianId},
        patientId:this.appointmentDetail.patient.patientId,
        medication:{medicationId:0},
        dose:''
      }
      this.openDialogPresciption(action, p)
    }else{

      this.openDialogPresciption(action, this.prescription)
    }

  }

  openDialogPresciption(action, prescription) {
 
    const dialogRef = this.dialog.open(PrescriptionComponent,
      {data:{
        prescription:prescription,
        appointmentId:this.appointmentDetail.appointmentId,
        method:action
      }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deletePrescription(){

    let pre={
      id:this.prescription.prescribedId,
      physician:this.prescription.physician.physicianId,
      patient:this.prescription.patientId,
      medication:this.prescription.medication.medicationId,
      date:this.prescription.appointmentDate,
      dose:this.prescription.dose
    }

    this.http.deletePrescription(pre).subscribe((data)=>{
     this.http.getAppointmentById(this.appointmentDetail.appointmentId).subscribe((data)=>{
      this.service.appointmentSubject.next(data)
     })
    })
  }}

  