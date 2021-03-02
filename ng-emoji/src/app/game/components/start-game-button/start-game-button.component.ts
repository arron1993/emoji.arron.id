import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-start-game-button',
  templateUrl: './start-game-button.component.html',
  styleUrls: ['./start-game-button.component.scss']
})
export class StartGameButtonComponent implements OnInit {

  constructor(private rs: RoomService) { }

  ngOnInit(): void {
  }

  startGame() {
    this.rs.startGame()
  }
}
