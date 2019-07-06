import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenukeduaPage } from './menukedua.page';

describe('MenukeduaPage', () => {
  let component: MenukeduaPage;
  let fixture: ComponentFixture<MenukeduaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenukeduaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenukeduaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
