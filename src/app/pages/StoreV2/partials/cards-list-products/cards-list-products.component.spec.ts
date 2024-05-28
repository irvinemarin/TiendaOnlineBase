import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsListProductsComponent } from './cards-list-products.component';

describe('CardsListProductsComponent', () => {
  let component: CardsListProductsComponent;
  let fixture: ComponentFixture<CardsListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsListProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
