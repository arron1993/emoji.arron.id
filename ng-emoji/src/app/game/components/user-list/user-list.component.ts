import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  playerJoinedSub$: Subscription;
  playerLeftSub$: Subscription;
  getPlayersSub$: Subscription;

  players = [];

  @Input() roomId: number;
  constructor(private rs: RoomService) { }

  ngOnInit(): void {
    this.getPlayersSub$ = this.rs.onGetPlayers().subscribe(resp => {
      this.players = resp.players
      console.log(this.players)
    })
    this.rs.getPlayers(this.roomId);

    this.playerJoinedSub$ = this.rs.onPlayerJoinedRoom().subscribe(resp => {
      this.players.push(resp.player)
    })

    this.playerLeftSub$ = this.rs.onPlayerLeftRoom().subscribe(resp => {
      this.players = this.players.filter(x => x.id != resp.player.id)
    })
  }

  ngOnDestroy() {
    this.playerJoinedSub$.unsubscribe()
    this.playerLeftSub$.unsubscribe()
    this.getPlayersSub$.unsubscribe()
  }
}
