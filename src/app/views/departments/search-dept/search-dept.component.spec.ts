import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDeptComponent } from './search-dept.component';

describe('SearchDeptComponent', () => {
  let component: SearchDeptComponent;
  let fixture: ComponentFixture<SearchDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
