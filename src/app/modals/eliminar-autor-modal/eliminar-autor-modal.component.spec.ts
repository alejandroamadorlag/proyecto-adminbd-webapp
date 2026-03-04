import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAutorModalComponent } from './eliminar-autor-modal.component';

describe('EliminarAutorModalComponent', () => {
  let component: EliminarAutorModalComponent;
  let fixture: ComponentFixture<EliminarAutorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarAutorModalComponent]
    });
    fixture = TestBed.createComponent(EliminarAutorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
