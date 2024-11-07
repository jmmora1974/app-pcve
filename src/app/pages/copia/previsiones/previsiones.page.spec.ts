import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrevisionesPage } from './previsiones.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PrevisionesPage', () => {
  let component: PrevisionesPage;
  let fixture: ComponentFixture<PrevisionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
