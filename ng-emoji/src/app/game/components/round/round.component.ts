import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {
  round;

  constructor(private rs: RoomService) { }

  newRoundSub: Subscription;

  ngOnInit(): void {
    this.newRoundSub = this.rs.onNewRound().subscribe(resp => {
      console.log(resp)
      this.round = resp.round;
    })
  }

}
