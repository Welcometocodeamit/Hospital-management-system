import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private route:Router, private http:HttpService){}

  ngOnInit(){
    this.http.getPhysician().subscribe((data:any)=>{
      this.physician=data.length
    })

    this.http.getPatient().subscribe((data:any)=>{
      this.patient=data.length
    })

    this.http.getNurse().subscribe((data:any)=>{
      this.nurse=data.length
    })
  }

  physician
  patient
  nurse

  openPhy(){
    this.route.navigate(['/Physician'])
  }

  openPat(){
    this.route.navigate(['/Patient'])
  }

  openNur(){
    this.route.navigate(['/Nurse'])
  }

}
