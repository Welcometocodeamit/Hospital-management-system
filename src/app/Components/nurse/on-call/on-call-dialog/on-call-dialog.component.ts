import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Services/apiservice.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-on-call-dialog',
  templateUrl: './on-call-dialog.component.html',
  styleUrls: ['./on-call-dialog.component.css']
})
export class OnCallDialogComponent {
  constructor(private service:ApiserviceService, private formBuilder:FormBuilder, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private http:HttpService, private activeRoute:ActivatedRoute){}

  onCallForm:FormGroup
  blocks
  nurse
  ngOnInit(): void {
    this.onCallForm = this.formBuilder.group({
      onCallId:[this.data.onCall.onCallId, ],
      nurseId:[this.data.onCall.nurse.nurseId ,],
      blockId: [this.data.onCall.block.blockId,],
      onCallStart: [this.data.onCall.onCallStart ,],
      onCallEnd: [this.data.onCall.onCallEnd ,]
    });

    this.http.getBlocks().subscribe((data)=>{
      this.blocks=data
      this.http.getNurse().subscribe((data)=>{
        this.nurse=data
      })
    })

    
  }

  updateOnCall(){
    if(this.data.method=='Update'){
      this.http.updateOnCall(this.onCallForm.value).subscribe((data)=>{
        this.http.getOnCalls().subscribe((data)=>{
          this.service.onCallSubject.next(data)
        })
      })
    }else{
      this.http.addOnCall(this.onCallForm.value).subscribe((data)=>{
        this.http.getOnCalls().subscribe((data)=>{
          this.service.onCallSubject.next(data)
        })
      })
    }
  }
}
