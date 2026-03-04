import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPrestamoModalComponent } from './eliminar-prestamo-modal.component';

describe('EliminarPrestamoModalComponent', () => {
  let component: EliminarPrestamoModalComponent;
  let fixture: ComponentFixture<EliminarPrestamoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarPrestamoModalComponent]
    });
    fixture = TestBed.createComponent(EliminarPrestamoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
