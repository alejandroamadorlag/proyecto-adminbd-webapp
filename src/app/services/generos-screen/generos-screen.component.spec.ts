import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosScreenComponent } from './generos-screen.component';

describe('GenerosScreenComponent', () => {
  let component: GenerosScreenComponent;
  let fixture: ComponentFixture<GenerosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerosScreenComponent]
    });
    fixture = TestBed.createComponent(GenerosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
