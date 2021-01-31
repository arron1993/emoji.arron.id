import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-round-display',
  templateUrl: './round-display.component.html',
  styleUrls: ['./round-display.component.scss']
})
export class RoundDisplayComponent implements OnInit {

  newRoundSub: Subscription;
  answer;
  currentRound;
  constructor(private rs: RoomService) { }

  ngOnInit(): void {
    this.newRoundSub = this.rs.onNewRound().subscribe(resp => {
      this.currentRound = resp.round;
      this.answer = "";
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
