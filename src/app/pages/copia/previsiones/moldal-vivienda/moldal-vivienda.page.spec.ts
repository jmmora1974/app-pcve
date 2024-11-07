import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoldalViviendaPage } from './moldal-vivienda.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MoldalViviendaPage', () => {
  let component: MoldalViviendaPage;
  let fixture: ComponentFixture<MoldalViviendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldalViviendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
