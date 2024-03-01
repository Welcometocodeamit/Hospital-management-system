import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../../delete-popup/delete-popup.component';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent {

  constructor(private activeRoute:ActivatedRoute, private http:HttpService, public dialog: MatDialog, private route:Router, private service:ApiserviceService){}
  appointmentDetail:any=[]
  prescription
  displayedColumns: string[] = ['item', 'value'];
  dataSource
  ngOnInit(){
    this.http.getAppointmentById(this.activeRoute.snapshot.params['appointmentId']).subscribe((data:any)=>{
      this.appointmentDetail=data
      this.setAppointMentData()
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
    this.openDeleteAppointmentDialog(`appointment for ${this.appointmentDetail.patient.name}`)
  }


  openDeleteAppointmentDialog(content) {
    const dialogRef = this.dialog.open(DeletePopupComponent,
      {data:{
        head:'Appointment',
        content:content
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
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
    });
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
    this.openDeletePreDialog(`prescription for ${this.prescription.medication.name}`)
   
  }


  openDeletePreDialog(element) {
    const dialogRef = this.dialog.open(DeletePopupComponent,
      {data:{
        head:'Prescription',
        content:element
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
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
    } 
    });
  }

  appointmentTableData

  setAppointMentData(){
    this.appointmentTableData = [
      {item: 'Appointment Start Time', value: this.appointmentDetail.starDateTime},
      {item: 'Appointment End Time', value: this.appointmentDetail.endDateTime},
      {item: 'Patient Name', value: this.appointmentDetail.patient.name},
      {item: 'Patient Address', value: this.appointmentDetail.patient.address},
      {item: 'Patient Phone', value: this.appointmentDetail.patient.phone},
      {item: 'Physician Name', value: this.appointmentDetail.physician.name},
      {item: 'Physician Position', value: this.appointmentDetail.physician.position},
      {item: 'Nurse Name', value: this.appointmentDetail.prepNurse.nurse.name},
      {item: 'Nurse Position', value: this.appointmentDetail.prepNurse.nurse.position}
    ];
  }
  

}

  