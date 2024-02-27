import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { UpdatePhysicianComponent } from './update-physician/update-physician.component';
import { BackendPhysician } from 'src/app/Models/UpdatePhysician';

@Component({
  selector: 'app-physician-detail',
  templateUrl: './physician-detail.component.html',
  styleUrls: ['./physician-detail.component.css']
})
export class PhysicianDetailComponent {

  constructor(private activeRoute:ActivatedRoute, private http:HttpService, public dialog: MatDialog, private route:Router){}
  physicianDetail=null
  ngOnInit(){
    this.http.getPhysicianById(this.activeRoute.snapshot.params['physicianId']).subscribe((data)=>{
      this.physicianDetail=data
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdatePhysicianComponent,
      {data:{
        physicianId:this.physicianDetail.physicianId,
        name:this.physicianDetail.name,
        position:this.physicianDetail.position,
        method:"Update"
      }});

    dialogRef.afterClosed().subscribe(result => {
        this.http.getPhysicianById(this.activeRoute.snapshot.params['physicianId']).subscribe((data)=>{
          this.physicianDetail=data
        })
    });
  }

  deletePhysician(){
    
    let deletePhysician:BackendPhysician={physicianId:this.physicianDetail.physicianId, name:this.physicianDetail.name, position:this.physicianDetail.position}
    this.http.deletePhysician(deletePhysician).subscribe((data)=>{
      this.route.navigate(['/Physician'])
    })
  }

}
