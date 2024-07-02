import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleManageComponent } from './sale-manage.component';

describe('SaleManageComponent', () => {
  let component: SaleManageComponent;
  let fixture: ComponentFixture<SaleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
