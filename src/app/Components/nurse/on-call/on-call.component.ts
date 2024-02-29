import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';
import { OnCallDialogComponent } from './on-call-dialog/on-call-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-on-call',
  templateUrl: './on-call.component.html',
  styleUrls: ['./on-call.component.css']
})
export class OnCallComponent {

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  

  dataSource:any = []
  displayedColumns: string[] = ['onCallId', 'nurseName', 'block', 'startTime', 'endTime', 'action'];

  onCalls
  blocks

  ngOnInit(){
    this.http.getOnCalls().subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    this.service.onCallSubject.subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    
  }

  addOnCall(method){
    let onCall={onCallId:0, nurse:{nurseId:0}, block:{blockId:0}, onCallStart:0, onCallEnd:0}
    this.openDialog(onCall, method)
  }
  

  updateOnCall(element, method){
    this.openDialog(element, method)
  }


  deleteOnCall(element){
    let onCall={onCallId:element.onCallId, nurseId:element.nurse.nurseId, blockId:1, onCallStart:element.onCallStart, onCallEnd:element.onCallEnd}
    this.http.deleteOnCall(onCall).subscribe((data)=>{
      this.http.getOnCalls().subscribe((data)=>{
        this.service.onCallSubject.next(data)
      })
    })
  }

  openDialog(oncall, action) {
    const dialogRef = this.dialog.open(OnCallDialogComponent,
      {data:{
        onCall:oncall,
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
