import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutFormComponent } from './shortcut-form.component';

describe('ShortcutFormComponent', () => {
  let component: ShortcutFormComponent;
  let fixture: ComponentFixture<ShortcutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
