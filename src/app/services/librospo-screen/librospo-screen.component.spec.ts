import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrospoScreenComponent } from './librospo-screen.component';

describe('LibrospoScreenComponent', () => {
  let component: LibrospoScreenComponent;
  let fixture: ComponentFixture<LibrospoScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrospoScreenComponent]
    });
    fixture = TestBed.createComponent(LibrospoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
