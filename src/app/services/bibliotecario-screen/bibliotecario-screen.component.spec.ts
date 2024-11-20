import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecarioScreenComponent } from './bibliotecario-screen.component';

describe('BibliotecarioScreenComponent', () => {
  let component: BibliotecarioScreenComponent;
  let fixture: ComponentFixture<BibliotecarioScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BibliotecarioScreenComponent]
    });
    fixture = TestBed.createComponent(BibliotecarioScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
