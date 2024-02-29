import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-nurse-popup',
  templateUrl: './nurse-popup.component.html',
  styleUrls: ['./nurse-popup.component.css']
})
export class NursePopupComponent {

  constructor(private service:ApiserviceService, private formBuilder:FormBuilder, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpService, private activeRoute:ActivatedRoute){}

  nurseForm:FormGroup
  registered:boolean[]=[true, false]

  ngOnInit(): void {
    this.nurseForm = this.formBuilder.group({
      nurseId:[this.data.nurseData.nurseId, ],
      name:[this.data.nurseData.name , Validators.required],
      position: [this.data.nurseData.position , Validators.required],
      registered: [this.data.nurseData.registered , Validators.required]
    });
  }

  updateNurse(){
    if(this.data.method=="Update"){
      this.http.updateNurse(this.nurseForm.value).subscribe((data)=>{
        this.http.getNurse().subscribe((data)=>{
          this.service.nurseSubject.next(data)
        })
      })
    }else if(this.data.method=="Add"){
      this.http.addNurse(this.nurseForm.value).subscribe((data)=>{
        this.http.getNurse().subscribe((data)=>{
          this.service.nurseSubject.next(data)
        })
      })
    }
  }
}
