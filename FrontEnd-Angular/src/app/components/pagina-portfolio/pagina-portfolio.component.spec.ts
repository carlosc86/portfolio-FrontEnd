import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPortfolioComponent } from './pagina-portfolio.component';

describe('PaginaPortfolioComponent', () => {
  let component: PaginaPortfolioComponent;
  let fixture: ComponentFixture<PaginaPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
