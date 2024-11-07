import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalServGeneralesPage } from './modal-serv-generales.page';

describe('ModalServGeneralesPage', () => {
  let component: ModalServGeneralesPage;
  let fixture: ComponentFixture<ModalServGeneralesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServGeneralesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
