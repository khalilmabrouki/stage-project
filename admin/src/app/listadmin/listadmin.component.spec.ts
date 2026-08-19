import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadminComponent } from './listadmin.component';

describe('ListadminComponent', () => {
  let component: ListadminComponent;
  let fixture: ComponentFixture<ListadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadminComponent]
    });
    fixture = TestBed.createComponent(ListadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
