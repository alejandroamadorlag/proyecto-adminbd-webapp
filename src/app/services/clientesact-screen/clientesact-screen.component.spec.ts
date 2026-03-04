import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesactScreenComponent } from './clientesact-screen.component';

describe('ClientesactScreenComponent', () => {
  let component: ClientesactScreenComponent;
  let fixture: ComponentFixture<ClientesactScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesactScreenComponent]
    });
    fixture = TestBed.createComponent(ClientesactScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
