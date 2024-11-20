import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAutorComponent } from './registro-autor.component';

describe('RegistroAutorComponent', () => {
  let component: RegistroAutorComponent;
  let fixture: ComponentFixture<RegistroAutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroAutorComponent]
    });
    fixture = TestBed.createComponent(RegistroAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
