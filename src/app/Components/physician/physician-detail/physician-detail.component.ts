import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { UpdatePhysicianComponent } from './update-physician/update-physician.component';
import { BackendPhysician } from 'src/app/Models/UpdatePhysician';
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { DeletePopupComponent } from '../../delete-popup/delete-popup.component';

@Component({
  selector: 'app-physician-detail',
  templateUrl: './physician-detail.component.html',
  styleUrls: ['./physician-detail.component.css']
})
export class PhysicianDetailComponent {

  constructor(private service:ApiserviceService, private activeRoute:ActivatedRoute, private http:HttpService, public dialog: MatDialog, private route:Router){}
  physicianDetail=null
  ngOnInit(){
    this.http.getPhysicianById(this.activeRoute.snapshot.params['physicianId']).subscribe((data)=>{
      this.physicianDetail=data
    })

    this.service.physicianDetailSubject.subscribe((data)=>{
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

  openDialogCertificate() {
    const dialogRef = this.dialog.open(AddCertificateComponent,
      {data:{
        physicianId:this.physicianDetail.physicianId
      }});

    dialogRef.afterClosed().subscribe(result => {
       
    });
  }

  deletePhysician(){
    let content=this.physicianDetail.name
    this.openDeletePhysicianDialog(content)
  }

  delete(certificate){
    this.openDeleteCertificateDialog(certificate)
  }


  openDeleteCertificateDialog(certificate) {
    const dialogRef = this.dialog.open(DeletePopupComponent,
      {data:{
        head:'Certificate',
        content:certificate.treatment.name
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        let c={id:certificate.trainedInId, physicianId:certificate.physicianId, treatment:certificate.treatment.procedureId, certificationDate:certificate.certificationDate, certificationExpires:certificate.certificationExpires}
    this.http.deleteCertificate(c).subscribe((data)=>{
      this.http.getPhysicianById(this.physicianDetail.physicianId).subscribe((data)=>{
        this.service.physicianDetailSubject.next(data)
      })
    })
    } 
    });
  }

  openDeletePhysicianDialog(content) {
    const dialogRef = this.dialog.open(DeletePopupComponent,
      {data:{
        head:'Physician',
        content:content
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        let deletePhysician:BackendPhysician={physicianId:this.physicianDetail.physicianId, name:this.physicianDetail.name, position:this.physicianDetail.position}
        this.http.deletePhysician(deletePhysician).subscribe((data)=>{
          this.route.navigate(['/Physician'])
        })
    } 
    });
  }

}
