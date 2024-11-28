import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLocalesPage } from './modal-locales.page';

describe('ModalLocalesPage', () => {
  let component: ModalLocalesPage;
  let fixture: ComponentFixture<ModalLocalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
