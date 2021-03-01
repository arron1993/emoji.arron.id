import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit {
  answer = "";
  roomId: number;
  player;

  getPlayerDetailsSub$: Subscription;

  currentRound = null;

  timer = 0;
  endGame = false;
  rounds = [];

  constructor(
    private rs: RoomService,
    private ps: PlayerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      this.roomId = params.roomId;
      this.setupSubs();
      this.ps.getPlayerDetails();
    })
  }

  setupSubs() {    
    this.getPlayerDetailsSub$ = this.ps.onGetPlayerDetails().subscribe(resp => {
      console.log(resp)
      this.player = resp.player
    })
  }

  ngOnDestroy() {
    this.getPlayerDetailsSub$.unsubscribe();
  }
}
