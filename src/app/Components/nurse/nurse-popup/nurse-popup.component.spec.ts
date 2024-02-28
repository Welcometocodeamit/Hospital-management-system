import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePopupComponent } from './nurse-popup.component';

describe('NursePopupComponent', () => {
  let component: NursePopupComponent;
  let fixture: ComponentFixture<NursePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NursePopupComponent]
    });
    fixture = TestBed.createComponent(NursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
