import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  playerJoinedSub$: Subscription;
  playerLeftSub$: Subscription;
  updatePlayerSub$: Subscription;
  getPlayersSub$: Subscription;

  players = [];

  @Input() roomId: number;
  constructor(
    private rs: RoomService,
    private ps: PlayerService) { }

  ngOnInit(): void {
    this.getPlayersSub$ = this.rs.onGetPlayers().subscribe(resp => {
      this.players = resp.players      
    })

    this.rs.getPlayers(this.roomId);

    this.playerJoinedSub$ = this.rs.onPlayerJoinedRoom().subscribe(resp => {
      this.players.push(resp.player)
    })

    this.playerLeftSub$ = this.rs.onPlayerLeftRoom().subscribe(resp => {
      this.players = this.players.filter(x => x.id != resp.player.id)
    })

    this.updatePlayerSub$ = this.ps.onUpdatePlayer().subscribe(resp => {
      this.players = this.players.map(x => {
        if (x.id == resp.player.id) {
          return resp.player
        } else {
          return x
        }
      })
    })
  }

  ngOnDestroy() {
    this.playerJoinedSub$.unsubscribe()
    this.playerLeftSub$.unsubscribe()
    this.getPlayersSub$.unsubscribe()
  }
}
