import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianDetailComponent } from './physician-detail.component';

describe('PhysicianDetailComponent', () => {
  let component: PhysicianDetailComponent;
  let fixture: ComponentFixture<PhysicianDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicianDetailComponent]
    });
    fixture = TestBed.createComponent(PhysicianDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
