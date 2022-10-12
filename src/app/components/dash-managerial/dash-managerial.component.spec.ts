import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashManagerialComponent } from './dash-managerial.component';

describe('DashManagerialComponent', () => {
  let component: DashManagerialComponent;
  let fixture: ComponentFixture<DashManagerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashManagerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashManagerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
