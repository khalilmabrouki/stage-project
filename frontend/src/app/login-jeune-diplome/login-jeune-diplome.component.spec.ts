import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginJeuneDiplomeComponent } from './login-jeune-diplome.component';

describe('LoginJeuneDiplomeComponent', () => {
  let component: LoginJeuneDiplomeComponent;
  let fixture: ComponentFixture<LoginJeuneDiplomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginJeuneDiplomeComponent]
    });
    fixture = TestBed.createComponent(LoginJeuneDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
