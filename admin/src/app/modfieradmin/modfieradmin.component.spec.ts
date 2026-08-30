import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModfieradminComponent } from './modfieradmin.component';

describe('ModfieradminComponent', () => {
  let component: ModfieradminComponent;
  let fixture: ComponentFixture<ModfieradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModfieradminComponent]
    });
    fixture = TestBed.createComponent(ModfieradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
