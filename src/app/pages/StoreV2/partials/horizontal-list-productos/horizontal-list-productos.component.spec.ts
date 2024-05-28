import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalListProductosComponent } from './horizontal-list-productos.component';

describe('HorizontalListProductosComponent', () => {
  let component: HorizontalListProductosComponent;
  let fixture: ComponentFixture<HorizontalListProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalListProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalListProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
