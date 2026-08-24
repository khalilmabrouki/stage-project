import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterjeunediplomeComponent } from './registerjeunediplome.component';

describe('RegisterjeunediplomeComponent', () => {
  let component: RegisterjeunediplomeComponent;
  let fixture: ComponentFixture<RegisterjeunediplomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterjeunediplomeComponent]
    });
    fixture = TestBed.createComponent(RegisterjeunediplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
