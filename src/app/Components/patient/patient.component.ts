import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { PatientPopupComponent } from './patient-popup/patient-popup.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  ngOnInit(){
    this.http.getPatient().subscribe((data:any)=>{
      this.dataSource=data
    })
    this.service.patientSubjet.subscribe((data:any)=>{
      this.dataSource=data
    })
  }

  dataSource = []
  displayedColumns: string[] = ['patientId', 'name', 'address', 'phone', 'action'];


  goToPatientDetail(id:number, patient){
    this.service.patient=patient
    this.router.navigate([`/Patient/${id}`])
  }

  openDialog() {
    const dialogRef = this.dialog.open(PatientPopupComponent,
      {data:{
        patientId:0,
        name:'',
        address:'',
        phone:'',
        method:"Add"
      }});

    dialogRef.afterClosed().subscribe(result => {

    });
}}
