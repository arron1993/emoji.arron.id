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
  username: string;
  joinedRoomSub: Subscription;
  startGameSub: Subscription;
  timerSub: Subscription;

  currentRound = null;

  timer = 0;

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
      this.currentRound = resp.round;
    })

    this.timerSub = this.rs.onRoundTimerUpdate().subscribe(resp => {
      this.timer = resp.time;
    })
  }

  updateAnswer() {
    this.rs.updateAnswer(this.answer);
    
  }

  addToAnswer(emoji) {
    this.answer += emoji;
    this.updateAnswer();
  }
}
