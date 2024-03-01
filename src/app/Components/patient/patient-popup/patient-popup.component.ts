import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-patient-popup',
  templateUrl: './patient-popup.component.html',
  styleUrls: ['./patient-popup.component.css']
})
export class PatientPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder:FormBuilder, private http:HttpService, private router:Router, private service:ApiserviceService){}

  patientForm:FormGroup

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      patientId:[this.data.patientId, ],
      name:[this.data.name , Validators.required],
      address: [this.data.address , Validators.required],
      phone: [this.data.phone , [Validators.required, Validators.minLength(10)]]
    });
  }

  updatePatient(){
    if(this.data.method=="Update"){
      this.http.updatePatient(this.patientForm.value).subscribe((data)=>{
      //  this.http.getPatientTreatmentDetails(this.patientForm.value.patientId).subscribe((data)=>{
      //   this.service.patientDetailSubject.next(data)
      //  })
        // this.router.navigate([`Patient/`+this.data.patientId])
      })
    }else if(this.data.method=="Add"){
      this.http.addPatient(this.patientForm.value).subscribe((data)=>{
        this.http.getPatient().subscribe((data)=>{
          this.service.patientSubjet.next(data)
         })
      })
    }
  }

}
