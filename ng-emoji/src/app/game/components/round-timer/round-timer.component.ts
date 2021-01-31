import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-round-timer',
  templateUrl: './round-timer.component.html',
  styleUrls: ['./round-timer.component.scss']
})
export class RoundTimerComponent implements OnInit {

  timer = 0;
  timerSub: Subscription;
  
  constructor(private rs: RoomService) { }

  ngOnInit(): void {
    this.timerSub = this.rs.onRoundTimerUpdate().subscribe(resp => {
      this.timer = resp.time;
    })
  }

}
