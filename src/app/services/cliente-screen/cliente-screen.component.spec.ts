import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteScreenComponent } from './cliente-screen.component';

describe('ClienteScreenComponent', () => {
  let component: ClienteScreenComponent;
  let fixture: ComponentFixture<ClienteScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteScreenComponent]
    });
    fixture = TestBed.createComponent(ClienteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
