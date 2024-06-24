import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherManageComponent } from './voucher-manage.component';

describe('VocherManageComponent', () => {
  let component: VoucherManageComponent;
  let fixture: ComponentFixture<VoucherManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
