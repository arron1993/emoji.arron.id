import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {

  roomId: number;
  username: string;
  joinedRoomSub: Subscription;
  startGameSub: Subscription;

  gameStarted = false;
  constructor(
    private rs: RoomService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setupSubs();
  }

  onSubmit(form) {
    this.route.params.subscribe(params => {
      this.roomId = params.roomId;
      this.username = form.value.username;
      this.rs.join(this.roomId, form.value.username)
    })
  }

  setupSubs() {    
    this.joinedRoomSub = this.rs.onJoinedRoom().subscribe(resp => {
      console.log(resp);
    })

    this.startGameSub = this.rs.onStartGame().subscribe(resp => {
      console.log("start game")
      this.gameStarted = true;
    })
  }
}
