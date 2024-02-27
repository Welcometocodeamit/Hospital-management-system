import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendPhysician } from 'src/app/Models/UpdatePhysician';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-update-physician',
  templateUrl: './update-physician.component.html',
  styleUrls: ['./update-physician.component.css']
})
export class UpdatePhysicianComponent {

  constructor(private service:ApiserviceService, private formBuilder:FormBuilder, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpService, private activeRoute:ActivatedRoute){}

  updatePhysicianForm:FormGroup

  ngOnInit(): void {
    this.updatePhysicianForm = this.formBuilder.group({
      physicianId:[this.data.physicianId, ],
      name:[this.data.name ,],
      position: [this.data.position ,]
    });
  }

  updatePhysician(){
    if(this.data.method=="Update"){
      this.http.updatePhysician(this.updatePhysicianForm.value).subscribe((data)=>{
        this.router.navigate([`Physician/`+this.data.physicianId])
      })
    }else if(this.data.method=="Add"){
      this.http.addPhysician(this.updatePhysicianForm.value).subscribe((data)=>{
        this.http.getPhysician().subscribe((data)=>{
          this.service.physicianSubject.next(data)
         })
      })
    }
  }



}
