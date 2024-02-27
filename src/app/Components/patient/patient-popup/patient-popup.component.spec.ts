import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPopupComponent } from './patient-popup.component';

describe('PatientPopupComponent', () => {
  let component: PatientPopupComponent;
  let fixture: ComponentFixture<PatientPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientPopupComponent]
    });
    fixture = TestBed.createComponent(PatientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
