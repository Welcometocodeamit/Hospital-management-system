import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { PatientPopupComponent } from './patient-popup/patient-popup.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements AfterViewInit {

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(){
    this.http.getPatient().subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.service.patientSubjet.subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  dataSource:any = [];
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
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
