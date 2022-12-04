import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCuestionarioComponent } from './nuevo-cuestionario.component';

describe('NuevoCuestionarioComponent', () => {
  let component: NuevoCuestionarioComponent;
  let fixture: ComponentFixture<NuevoCuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoCuestionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
