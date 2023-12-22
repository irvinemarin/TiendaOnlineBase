import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCustomComponent } from './nav-custom.component';

describe('NavCustomComponent', () => {
  let component: NavCustomComponent;
  let fixture: ComponentFixture<NavCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
