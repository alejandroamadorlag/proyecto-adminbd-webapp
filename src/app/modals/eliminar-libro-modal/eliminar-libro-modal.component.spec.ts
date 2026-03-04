import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLibroModalComponent } from './eliminar-libro-modal.component';

describe('EliminarLibroModalComponent', () => {
  let component: EliminarLibroModalComponent;
  let fixture: ComponentFixture<EliminarLibroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarLibroModalComponent]
    });
    fixture = TestBed.createComponent(EliminarLibroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
