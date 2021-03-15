import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEmpComponent } from './index-emp.component';

describe('IndexEmpComponent', () => {
  let component: IndexEmpComponent;
  let fixture: ComponentFixture<IndexEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
