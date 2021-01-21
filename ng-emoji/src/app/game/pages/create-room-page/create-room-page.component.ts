import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-create-room-page',
  templateUrl: './create-room-page.component.html',
  styleUrls: ['./create-room-page.component.scss']
})
export class CreateRoomPageComponent implements OnInit {
  sub: Subscription;

  constructor(
    private rs: RoomService,
    private router: Router) { }

  ngOnInit(): void {
    this.onCreatedRoom();
  }

  createRoom() {
    this.rs.create();    
  }

  onCreatedRoom() {
    this.sub = this.rs.onCreatedRoom().subscribe(resp => {
      this.router.navigate([resp.roomId]);
    })
  }
}
