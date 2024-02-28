import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnCallDialogComponent } from './on-call-dialog.component';

describe('OnCallDialogComponent', () => {
  let component: OnCallDialogComponent;
  let fixture: ComponentFixture<OnCallDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnCallDialogComponent]
    });
    fixture = TestBed.createComponent(OnCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
