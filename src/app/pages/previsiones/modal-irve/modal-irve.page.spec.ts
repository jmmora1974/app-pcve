import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalIrvePage } from './modal-irve.page';

describe('ModalIrvePage', () => {
  let component: ModalIrvePage;
  let fixture: ComponentFixture<ModalIrvePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIrvePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
