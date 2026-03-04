import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialScreenComponent } from './historial-screen.component';

describe('HistorialScreenComponent', () => {
  let component: HistorialScreenComponent;
  let fixture: ComponentFixture<HistorialScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialScreenComponent]
    });
    fixture = TestBed.createComponent(HistorialScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
