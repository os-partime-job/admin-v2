import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondManageComponent } from './diamond-manage.component';

describe('DiamondManageComponent', () => {
  let component: DiamondManageComponent;
  let fixture: ComponentFixture<DiamondManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamondManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
