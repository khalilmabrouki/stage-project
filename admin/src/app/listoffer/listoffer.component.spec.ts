import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofferComponent } from './listoffer.component';

describe('ListofferComponent', () => {
  let component: ListofferComponent;
  let fixture: ComponentFixture<ListofferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListofferComponent]
    });
    fixture = TestBed.createComponent(ListofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
