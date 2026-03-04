import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarGeneroModalComponent } from './eliminar-genero-modal.component';

describe('EliminarGeneroModalComponent', () => {
  let component: EliminarGeneroModalComponent;
  let fixture: ComponentFixture<EliminarGeneroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarGeneroModalComponent]
    });
    fixture = TestBed.createComponent(EliminarGeneroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
