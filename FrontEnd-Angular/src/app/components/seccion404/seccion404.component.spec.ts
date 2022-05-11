import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion404Component } from './seccion404.component';

describe('Seccion404Component', () => {
  let component: Seccion404Component;
  let fixture: ComponentFixture<Seccion404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Seccion404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Seccion404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
