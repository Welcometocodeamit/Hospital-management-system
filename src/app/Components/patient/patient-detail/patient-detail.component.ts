import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { PatientPopupComponent } from '../patient-popup/patient-popup.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';

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
    })
  }

  patientDetail=null
  particularPatient

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
    this.http.deletePatient(this.particularPatient).subscribe((data)=>{
      this.router.navigate([`/Patient`])
    })
  }


  

}
