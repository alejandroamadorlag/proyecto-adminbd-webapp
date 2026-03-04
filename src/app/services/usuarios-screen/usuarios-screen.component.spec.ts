import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosScreenComponent } from './usuarios-screen.component';

describe('UsuariosScreenComponent', () => {
  let component: UsuariosScreenComponent;
  let fixture: ComponentFixture<UsuariosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosScreenComponent]
    });
    fixture = TestBed.createComponent(UsuariosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
