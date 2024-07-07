import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaInfoComponent } from './gia-info.component';

describe('GiaInfoComponent', () => {
  let component: GiaInfoComponent;
  let fixture: ComponentFixture<GiaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
