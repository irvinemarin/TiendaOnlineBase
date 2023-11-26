import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePageMainComponent } from './store-page-main.component';

describe('StorePageMainComponent', () => {
  let component: StorePageMainComponent;
  let fixture: ComponentFixture<StorePageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePageMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
