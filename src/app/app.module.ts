import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/Nav/nav/nav.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhysicianComponent } from './Components/physician/physician.component';
import { TreatmentComponent } from './Components/treatment/treatment.component';
import { AppointmentComponent } from './Components/appointment/appointment.component';
import { NurseComponent } from './Components/nurse/nurse.component';
import { PatientComponent } from './Components/patient/patient.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './Interceptor/http-interceptor.interceptor';
import { PhysicianDetailComponent } from './Components/physician/physician-detail/physician-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UpdatePhysicianComponent } from './Components/physician/physician-detail/update-physician/update-physician.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientDetailComponent } from './Components/patient/patient-detail/patient-detail.component';
import { PatientPopupComponent } from './Components/patient/patient-popup/patient-popup.component';

const routes: Routes = [
  {path:'Physician', component:PhysicianComponent },
  {path:'Physician/:physicianId', component:PhysicianDetailComponent },
  {path:'Treatment', component:TreatmentComponent  },
  {path:'Appointment', component:AppointmentComponent },
  {path:'Nurse', component:NurseComponent },
  {path:'Patient', component:PatientComponent },
  {path:'Patient/:patientId', component:PatientDetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PhysicianComponent,
    TreatmentComponent,
    AppointmentComponent,
    NurseComponent,
    PatientComponent,
    PhysicianDetailComponent,
    UpdatePhysicianComponent,
    PatientDetailComponent,
    PatientPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
