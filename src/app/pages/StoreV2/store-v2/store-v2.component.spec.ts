import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreV2Component } from './store-v2.component';

describe('StoreV2Component', () => {
  let component: StoreV2Component;
  let fixture: ComponentFixture<StoreV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
