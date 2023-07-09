import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormRegistroDinamicoComponent} from './form-registro-dinamico.component';

describe('FormRegistroDinamicoComponent', () => {
  let component: FormRegistroDinamicoComponent;
  let fixture: ComponentFixture<FormRegistroDinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRegistroDinamicoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
