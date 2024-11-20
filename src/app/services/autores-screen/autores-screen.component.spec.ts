import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresScreenComponent } from './autores-screen.component';

describe('AutoresScreenComponent', () => {
  let component: AutoresScreenComponent;
  let fixture: ComponentFixture<AutoresScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoresScreenComponent]
    });
    fixture = TestBed.createComponent(AutoresScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
