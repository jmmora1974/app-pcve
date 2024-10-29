import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeccionesPage } from './secciones.page';

describe('SeccionesPage', () => {
  let component: SeccionesPage;
  let fixture: ComponentFixture<SeccionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
