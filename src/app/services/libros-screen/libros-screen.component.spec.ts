import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosScreenComponent } from './libros-screen.component';

describe('LibrosScreenComponent', () => {
  let component: LibrosScreenComponent;
  let fixture: ComponentFixture<LibrosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosScreenComponent]
    });
    fixture = TestBed.createComponent(LibrosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
