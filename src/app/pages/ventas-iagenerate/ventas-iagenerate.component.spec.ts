import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasIAGenerateComponent } from './ventas-iagenerate.component';

describe('VentasIAGenerateComponent', () => {
  let component: VentasIAGenerateComponent;
  let fixture: ComponentFixture<VentasIAGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasIAGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasIAGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
