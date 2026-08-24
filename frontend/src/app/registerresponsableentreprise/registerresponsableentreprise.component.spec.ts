import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterresponsableentrepriseComponent } from './registerresponsableentreprise.component';

describe('RegisterresponsableentrepriseComponent', () => {
  let component: RegisterresponsableentrepriseComponent;
  let fixture: ComponentFixture<RegisterresponsableentrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterresponsableentrepriseComponent]
    });
    fixture = TestBed.createComponent(RegisterresponsableentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
