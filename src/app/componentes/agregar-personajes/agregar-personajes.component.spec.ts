import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPersonajesComponent } from './agregar-personajes.component';

describe('AgregarPersonajesComponent', () => {
  let component: AgregarPersonajesComponent;
  let fixture: ComponentFixture<AgregarPersonajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPersonajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
