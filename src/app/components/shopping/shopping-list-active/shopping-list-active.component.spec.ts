import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListActiveComponent } from './shopping-list-active.component';

describe('ShoppingListActiveComponent', () => {
  let component: ShoppingListActiveComponent;
  let fixture: ComponentFixture<ShoppingListActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
