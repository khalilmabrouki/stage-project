import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginResponsableEnterpriseComponent } from './login-responsable-enterprise.component';

describe('LoginResponsableEnterpriseComponent', () => {
  let component: LoginResponsableEnterpriseComponent;
  let fixture: ComponentFixture<LoginResponsableEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginResponsableEnterpriseComponent]
    });
    fixture = TestBed.createComponent(LoginResponsableEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
