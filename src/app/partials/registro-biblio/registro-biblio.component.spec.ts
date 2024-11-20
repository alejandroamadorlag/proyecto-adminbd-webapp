import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBiblioComponent } from './registro-biblio.component';

describe('RegistroBiblioComponent', () => {
  let component: RegistroBiblioComponent;
  let fixture: ComponentFixture<RegistroBiblioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroBiblioComponent]
    });
    fixture = TestBed.createComponent(RegistroBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
