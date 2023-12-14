import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEMAcordionComponent } from './iem-acordion.component';

describe('IEMAcordionComponent', () => {
  let component: IEMAcordionComponent;
  let fixture: ComponentFixture<IEMAcordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IEMAcordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IEMAcordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
