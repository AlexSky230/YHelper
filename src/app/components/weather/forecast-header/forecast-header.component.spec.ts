import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastHeaderComponent } from './forecast-header.component';

describe('ForecastHeaderComponent', () => {
  let component: ForecastHeaderComponent;
  let fixture: ComponentFixture<ForecastHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
