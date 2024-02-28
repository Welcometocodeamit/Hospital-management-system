import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';
import { NursePopupComponent } from './nurse-popup/nurse-popup.component';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {

  ngOnInit(){
    this.http.getNurse().subscribe((data:any)=>{
      this.dataSource=data
      this.service.nurses=data
    })

    this.service.nurseSubject.subscribe((data:any)=>{
      this.dataSource=data
    })
  }

  dataSource = []
  displayedColumns: string[] = ['nurseId', 'name', 'position', 'action'];

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  updateNurse(nurse){
    this.openDialog(nurse, "Update")
  }

  deleteNurse(nurse){
    this.http.deletNurse(nurse).subscribe((data)=>{
      this.http.getNurse().subscribe((data)=>{
        this.service.nurseSubject.next(data)
      })
    })
  }

  addNurse(){
    let nurse={nurseId:0, name:'', position:'', registered:true }
    this.openDialog(nurse, "Add")
  }

  openDialog(nurse, action) {
    const dialogRef = this.dialog.open(NursePopupComponent,
      {data:{
        nurseData:nurse,
        method:action
      }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
