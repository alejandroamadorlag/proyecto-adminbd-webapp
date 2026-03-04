import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosnodisponiblesScreenComponent } from './librosnodisponibles-screen.component';

describe('LibrosnodisponiblesScreenComponent', () => {
  let component: LibrosnodisponiblesScreenComponent;
  let fixture: ComponentFixture<LibrosnodisponiblesScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosnodisponiblesScreenComponent]
    });
    fixture = TestBed.createComponent(LibrosnodisponiblesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
