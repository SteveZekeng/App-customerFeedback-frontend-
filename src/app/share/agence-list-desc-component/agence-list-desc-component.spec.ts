import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceListDescComponent } from './agence-list-desc-component';

describe('AgenceListDescComponent', () => {
  let component: AgenceListDescComponent;
  let fixture: ComponentFixture<AgenceListDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenceListDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenceListDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
