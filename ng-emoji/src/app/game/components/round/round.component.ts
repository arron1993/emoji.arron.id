import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {
  round = null;
  time: number;
  answer = "";

  active = false;
  newRoundSub: Subscription;
  timerSub: Subscription;
  setActiveSub: Subscription;

  constructor(
    private rs: RoomService,
    private ps: PlayerService) { }

  ngOnInit(): void {
    this.newRoundSub = this.rs.onNewRound().subscribe(resp => {
      console.log(resp)
      this.round = resp.round;
    })

    this.timerSub = this.rs.onTimerTick().subscribe(resp => {
      console.log(resp)
      this.time = resp.time;
    })

    this.setActiveSub = this.ps.onSetActive().subscribe(resp => {
      this.active = resp.active;
    })
  }

  updateAnswer() {
    this.rs.updateAnswer(this.answer);    
  }

  addToAnswer(emoji) {
    console.log(emoji)
    this.answer += emoji;
    // this.updateAnswer();
  }

}
