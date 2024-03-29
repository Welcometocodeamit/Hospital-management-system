import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.http.getAppointments().subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    this.service.appointmentHomeSubject.subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  dataSource:any = []
  displayedColumns: string[] = ['appointmentId', 'starDateTime', 'endDateTime', 'patientName', 'physicianName',  'action'];

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  addAppointment(action){
    this.openDialog(action)

  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter   = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action) {
    let appointment={appointmentId:0, patient:{patientId:0}, physician:{physicianId:0}, prepNurse:{onCallId:0}, startDateTime:0, endDateTime:0}
    const dialogRef = this.dialog.open(AppointmentDialogComponent,
      {data:{
        appointment:appointment,
        method:action
      }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  viewAppointment(appointment){
    this.router.navigate([`/Appointment/${appointment.appointmentId}`])
  }

 


 

  
}
