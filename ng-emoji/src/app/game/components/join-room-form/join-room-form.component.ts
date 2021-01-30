import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-join-room-form',
  templateUrl: './join-room-form.component.html',
  styleUrls: ['./join-room-form.component.scss']
})
export class JoinRoomFormComponent implements OnInit {
  @Input() roomId;
  @Output() username = new EventEmitter();

  constructor(private rs: RoomService) { }

  ngOnInit(): void {
  }

  onSubmit(form) {  
    this.rs.join(this.roomId, form.value.username)
    this.username.emit(form.value.username)
  }
}
