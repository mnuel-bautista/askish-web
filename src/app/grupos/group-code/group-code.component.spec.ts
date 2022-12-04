import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCodeComponent } from './group-code.component';

describe('GroupCodeComponent', () => {
  let component: GroupCodeComponent;
  let fixture: ComponentFixture<GroupCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
