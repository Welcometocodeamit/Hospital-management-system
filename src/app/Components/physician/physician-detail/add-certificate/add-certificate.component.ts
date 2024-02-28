import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css']
})
export class AddCertificateComponent {

  constructor(private service:ApiserviceService, private formBuilder:FormBuilder, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpService, private activeRoute:ActivatedRoute){}

  certificateForm:FormGroup
  treatments

  ngOnInit(): void {
    this.http.getTreatments().subscribe((data)=>{
      this.treatments=data
    })
    this.certificateForm = this.formBuilder.group({
      id:[0],
      physician:[this.data.physicianId],
      treatment:[],
      certificationDate: [],
      certificationExpires: []
    });
  }

  create(){
    this.http.createCertificate(this.certificateForm.value).subscribe((data)=>{
      this.http.getPhysicianById(this.data.physicianId).subscribe((data)=>{
        this.service.physicianDetailSubject.next(data)
      })
    })
  }
}
