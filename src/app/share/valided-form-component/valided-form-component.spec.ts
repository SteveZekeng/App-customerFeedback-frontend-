import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidedFormComponent } from './valided-form-component';

describe('ValidedFormComponent', () => {
  let component: ValidedFormComponent;
  let fixture: ComponentFixture<ValidedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
