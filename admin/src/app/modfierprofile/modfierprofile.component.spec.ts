import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModfierprofileComponent } from './modfierprofile.component';

describe('ModfierprofileComponent', () => {
  let component: ModfierprofileComponent;
  let fixture: ComponentFixture<ModfierprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModfierprofileComponent]
    });
    fixture = TestBed.createComponent(ModfierprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
