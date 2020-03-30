import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeHeaderComponent } from './fridge-header.component';

describe('FridgeHeaderComponent', () => {
  let component: FridgeHeaderComponent;
  let fixture: ComponentFixture<FridgeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
