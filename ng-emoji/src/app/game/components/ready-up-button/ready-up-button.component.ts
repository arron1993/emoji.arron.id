import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-ready-up-button',
  templateUrl: './ready-up-button.component.html',
  styleUrls: ['./ready-up-button.component.scss']
})
export class ReadyUpButtonComponent implements OnInit {

  constructor(private rs: RoomService) { }

  ngOnInit(): void {
  }

  readyUp() {
    this.rs.readyUp();
  }
}
