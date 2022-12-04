import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingParticipantsComponent } from './waiting-participants.component';

describe('WaitingParticipantsComponent', () => {
  let component: WaitingParticipantsComponent;
  let fixture: ComponentFixture<WaitingParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
