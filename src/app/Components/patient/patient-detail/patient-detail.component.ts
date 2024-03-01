import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { PatientPopupComponent } from '../patient-popup/patient-popup.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { DeletePopupComponent } from '../../delete-popup/delete-popup.component';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent {

  constructor(public dialog: MatDialog, private activeRoute:ActivatedRoute, private http:HttpService, private service:ApiserviceService, private router:Router){}

  ngOnInit(){
    this.particularPatient=this.service.patient
    this.http.getPatientTreatmentDetails(this.activeRoute.snapshot.params['patientId']).subscribe((data)=>{
      this.patientDetail=data
      this.setPatientTableData()
    })

    this.service.patientDetailSubject.subscribe((data)=>{
      this.patientDetail=data
      this.setPatientTableData()
    })
  }

  patientDetail:any=null
  particularPatient
  displayedColumns: string[] = ['item', 'value'];
  patientTableData

  openDialog() {
    const dialogRef = this.dialog.open(PatientPopupComponent,
      {data:{
        patientId:this.particularPatient.patientId,
        name:this.particularPatient.name,
        address:this.particularPatient.address,
        phone:this.particularPatient.phone,
        method:"Update"
      }});

    dialogRef.afterClosed().subscribe(result => {
        this.http.getPatientTreatmentDetails(this.activeRoute.snapshot.params['patientId']).subscribe((data)=>{
          this.patientDetail=data
        })
    });
  }

  deletePatient(){
    this.openDeletePatientDialog(this.particularPatient.name)
  }

  setPatientTableData(){
    this.patientTableData = [
      {item: 'Treatment Name', value: this.patientDetail.procedure.name},
      {item: 'Treatment Cost', value: this.patientDetail.procedure.cost},
      {item: 'Physician Name', value: this.patientDetail.physician.name},
      {item: 'Physician Position', value: this.patientDetail.physician.position},
      {item: 'Nurse Name', value: this.patientDetail.nurse.name},
      {item: 'Nurse Position', value: this.patientDetail.nurse.position},
      {item: 'Stay Start Date', value: this.patientDetail.stay.startDateTime},
      {item: 'Stay End Date', value: this.patientDetail.stay.endDateTime},
      {item: 'Room no.', value: this.patientDetail.stay.room.roomNumber},
      {item: 'Room Type', value: this.patientDetail.stay.room.roomType},
      {item: 'Block Floor', value: this.patientDetail.stay.room.block.blockFloor},
      {item: 'Block Code', value: this.patientDetail.stay.room.block.blockCode},
    ];
  }


  openDeletePatientDialog(content) {
    const dialogRef = this.dialog.open(DeletePopupComponent,
      {data:{
        head:'Patient',
        content:content
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.http.deletePatient(this.particularPatient).subscribe((data)=>{
          this.router.navigate([`/Patient`])
        })
    } 
    });
  }


  

}
