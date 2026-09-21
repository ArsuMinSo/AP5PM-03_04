import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment the counter', () => {
    component.count = 0;

    component.increment();

    expect(component.count).toBe(1);
  });

  it('should decrement the counter', () => {
    component.count = 1;

    component.decrement();

    expect(component.count).toBe(0);
  });

  it('should not decrement the counter below 0', () => {
    component.count = 0;

    component.decrement();

    expect(component.count).toBe(0);
  });

  it('should reset the counter', () => {
    component.count = 5;

    component.reset();

    expect(component.count).toBe(0);
  });

  it('should reset the counter and update the template', () => {
    component.count = 5;
    component.reset();
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector(
      '.counter-value',
    ) as HTMLElement;

    expect(component.count).toBe(0);
    expect(value.textContent?.trim()).toBe('0');
  });

});
