import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListOldComponent } from './shopping-list-old.component';

describe('ShoppingListOldComponent', () => {
  let component: ShoppingListOldComponent;
  let fixture: ComponentFixture<ShoppingListOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
