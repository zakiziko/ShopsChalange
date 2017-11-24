import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefferedShopComponent } from './preffered-shop.component';

describe('PrefferedShopComponent', () => {
  let component: PrefferedShopComponent;
  let fixture: ComponentFixture<PrefferedShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefferedShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefferedShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
