import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';
import { NursePopupComponent } from './nurse-popup/nurse-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.http.getNurse().subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.service.nurses=data
      this.dataSource.paginator = this.paginator;
    })

    this.service.nurseSubject.subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  dataSource:any = []
  displayedColumns: string[] = ['nurseId', 'name', 'position', 'action'];

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  updateNurse(nurse){
    this.openDialog(nurse, "Update")
  }

  deleteNurse(nurse){
    this.openDeleteNurseDialog(nurse)
  }

  openDeleteNurseDialog(nurse) {
    const dialogRef = this.dialog.open(DeletePopupComponent,
      {data:{
        head:'Nurse',
        content:nurse.name
      }});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.http.deletNurse(nurse).subscribe((data)=>{
          this.http.getNurse().subscribe((data)=>{
            this.service.nurseSubject.next(data)
          })
        })
    } 
    });
  }

  addNurse(){
    let nurse={nurseId:0, name:'', position:'', registered:true }
    this.openDialog(nurse, "Add")
  }

  onBlock(){
    this.router.navigate(['/Service'])
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
