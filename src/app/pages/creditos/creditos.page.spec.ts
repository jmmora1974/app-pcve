import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditosPage } from './creditos.page';

describe('CreditosPage', () => {
  let component: CreditosPage;
  let fixture: ComponentFixture<CreditosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
