import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffByagenceComponent } from './staff-byagence-component';

describe('StaffByagenceComponent', () => {
  let component: StaffByagenceComponent;
  let fixture: ComponentFixture<StaffByagenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffByagenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffByagenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
