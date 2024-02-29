import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { UpdatePhysicianComponent } from './physician-detail/update-physician/update-physician.component';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent {

  constructor(private http:HttpService, private router:Router, public dialog: MatDialog, private service:ApiserviceService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.http.getPhysician().subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })

    this.service.physicianSubject.subscribe((data:any)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  dataSource:any = []
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter  = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
