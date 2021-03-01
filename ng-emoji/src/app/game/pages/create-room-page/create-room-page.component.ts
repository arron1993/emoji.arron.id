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
  onCreateRoom$: Subscription;
  username: string;

  constructor(
    private rs: RoomService,
    private router: Router) { }

  ngOnInit(): void {
    this.onCreateRoom();
  }

  createRoom() {
    this.rs.create(this.username);    
  }

  onCreateRoom() {
    this.onCreateRoom$ = this.rs.onCreateRoom().subscribe(resp => {
      console.log(resp)
      this.router.navigate([resp.roomId]);
    })
  }

  ngOnDestroy() {
    this.onCreateRoom$.unsubscribe()
  }
}
