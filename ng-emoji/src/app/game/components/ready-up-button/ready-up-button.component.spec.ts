import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyUpButtonComponent } from './ready-up-button.component';

describe('ReadyUpButtonComponent', () => {
  let component: ReadyUpButtonComponent;
  let fixture: ComponentFixture<ReadyUpButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyUpButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyUpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
