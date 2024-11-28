import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalGaragesComponent } from './modal-garages.component';

describe('ModalGaragesComponent', () => {
  let component: ModalGaragesComponent;
  let fixture: ComponentFixture<ModalGaragesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalGaragesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
