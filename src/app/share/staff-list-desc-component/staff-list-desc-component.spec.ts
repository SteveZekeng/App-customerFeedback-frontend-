import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListDescComponent } from './staff-list-desc-component';

describe('StaffListDescComponent', () => {
  let component: StaffListDescComponent;
  let fixture: ComponentFixture<StaffListDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffListDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffListDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
