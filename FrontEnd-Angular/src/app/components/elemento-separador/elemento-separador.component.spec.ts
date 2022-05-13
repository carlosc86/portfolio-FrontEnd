import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoSeparadorComponent } from './elemento-separador.component';

describe('ElementoSeparadorComponent', () => {
  let component: ElementoSeparadorComponent;
  let fixture: ComponentFixture<ElementoSeparadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementoSeparadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoSeparadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
