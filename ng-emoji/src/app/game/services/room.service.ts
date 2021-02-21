import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private ss: SocketService) { }

  onCreateRoom(): Observable<any> {
    return this.ss.on("createRoom")
  }

  create(username) {     
    this.ss.emit('createRoom', {username: username});
  }

  join(roomId, username) {     
    this.ss.emit('joinRoom', {roomId: roomId, username: username});
  }

  onJoinedRoom(): Observable<any> {
    return this.ss.on("onJoinedRoom")
  }

  getUserList() {
    this.ss.emit("getUserList");
  }

  onUpdateUserList(): Observable<any> {
    return this.ss.on("updateUserList")
  }

  readyUp() {
    this.ss.emit("readyUp")
  }

  onNewRound(): Observable<any> {
    return this.ss.on("onNewRound");
  }

  onEndGame(): Observable<any> {
    return this.ss.on("onEndGame");
  }

  onRoundTimerUpdate(): Observable<any> {
    return this.ss.on("updateRoundTimer");
  }

  updateAnswer(answer) {
    this.ss.emit("updateAnswer", answer)
  }
}
