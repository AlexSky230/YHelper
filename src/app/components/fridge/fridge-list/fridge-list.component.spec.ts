import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeListComponent } from './fridge-list.component';

describe('FridgeListComponent', () => {
  let component: FridgeListComponent;
  let fixture: ComponentFixture<FridgeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
