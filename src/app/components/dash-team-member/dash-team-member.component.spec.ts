import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTeamMemberComponent } from './dash-team-member.component';

describe('DashTeamMemberComponent', () => {
  let component: DashTeamMemberComponent;
  let fixture: ComponentFixture<DashTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashTeamMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
