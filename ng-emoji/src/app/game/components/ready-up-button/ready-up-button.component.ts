import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-ready-up-button',
  templateUrl: './ready-up-button.component.html',
  styleUrls: ['./ready-up-button.component.scss']
})
export class ReadyUpButtonComponent implements OnInit {

  constructor(private ps: PlayerService) { }

  ngOnInit(): void {
  }

  readyUp() {
    this.ps.updatePlayer({ready: true});
  }
}
