import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { UpdatePhysicianComponent } from './physician-detail/update-physician/update-physician.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent {

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  ngOnInit(){
    this.http.getPhysician().subscribe((data:any)=>{
      this.dataSource=data
    })

    this.service.physicianSubject.subscribe((data:any)=>{
      this.dataSource=data
    })
  }

  dataSource = []
  displayedColumns: string[] = ['physicianId', 'name', 'position', 'action'];

  goToPhysicianDetail(value){
    this.router.navigate([`Physician/${value}`])
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdatePhysicianComponent,
      {data:{
        physicianId:0,
        name:"",
        position:"",
        method:"Add"
      }});

    dialogRef.afterClosed().subscribe(result => {
       
    });
  }
}
