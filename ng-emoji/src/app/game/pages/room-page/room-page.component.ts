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
  answer = "";
  roomId: number;
  username: string = "";
  joinedRoomSub: Subscription;
  newRoundSub: Subscription;
  timerSub: Subscription;
  endGameSub: Subscription;

  currentRound = null;

  timer = 0;
  endGame = false;
  rounds = [];

  constructor(
    private rs: RoomService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      this.roomId = params.roomId;
      this.setupSubs();
    })
  }

  setUsername(username) {
    this.username = username;
  }

  setupSubs() {    
    this.joinedRoomSub = this.rs.onJoinedRoom().subscribe(resp => {
      console.log(resp);
    })

    this.endGameSub = this.rs.onEndGame().subscribe(resp => {
      console.log(resp.rounds);
      this.endGame = true;
      this.rounds = resp.rounds;
    })
  }


}
