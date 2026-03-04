import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClienteScreenComponent } from './historial-cliente-screen.component';

describe('HistorialClienteScreenComponent', () => {
  let component: HistorialClienteScreenComponent;
  let fixture: ComponentFixture<HistorialClienteScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialClienteScreenComponent]
    });
    fixture = TestBed.createComponent(HistorialClienteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
