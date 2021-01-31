import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-room-link',
  templateUrl: './share-room-link.component.html',
  styleUrls: ['./share-room-link.component.scss']
})
export class ShareRoomLinkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get location() {
    return window.location.href
  }

  copyLink(input) {
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }
}
