import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarBiblioModalComponent } from './eliminar-biblio-modal.component';

describe('EliminarBiblioModalComponent', () => {
  let component: EliminarBiblioModalComponent;
  let fixture: ComponentFixture<EliminarBiblioModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarBiblioModalComponent]
    });
    fixture = TestBed.createComponent(EliminarBiblioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
