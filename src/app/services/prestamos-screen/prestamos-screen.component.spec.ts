import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosScreenComponent } from './prestamos-screen.component';

describe('PrestamosScreenComponent', () => {
  let component: PrestamosScreenComponent;
  let fixture: ComponentFixture<PrestamosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestamosScreenComponent]
    });
    fixture = TestBed.createComponent(PrestamosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
