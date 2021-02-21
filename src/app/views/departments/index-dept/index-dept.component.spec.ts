import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDeptComponent } from './index-dept.component';

describe('IndexDeptComponent', () => {
  let component: IndexDeptComponent;
  let fixture: ComponentFixture<IndexDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
