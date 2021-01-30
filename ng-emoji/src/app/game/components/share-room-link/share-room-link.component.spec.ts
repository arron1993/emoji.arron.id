import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRoomLinkComponent } from './share-room-link.component';

describe('ShareRoomLinkComponent', () => {
  let component: ShareRoomLinkComponent;
  let fixture: ComponentFixture<ShareRoomLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareRoomLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareRoomLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
