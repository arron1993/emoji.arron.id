import { Injectable, Output } from '@angular/core';
import { io }from 'socket.io-client';

import { Observable } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private ss: SocketService) { }

  onCreatedRoom(): Observable<any> {
    return this.ss.on("createdRoom")
  }

  create() {     
    this.ss.emit('createRoom', {});
  }

  join(roomId, username) {     
    this.ss.emit('joinRoom', {roomId: roomId, username: username});
  }

  onJoinedRoom(): Observable<any> {
    return this.ss.on("onJoinedRoom")
  }

  getUserList(roomId) {
    this.ss.emit("getUserList");
  }

  onUpdateUserList(): Observable<any> {
    return this.ss.on("updateUserList")
  }

  readyUp() {
    this.ss.emit("readyUp")
  }

  onStartGame(): Observable<any> {
    return this.ss.on("startGame");
  }

  onRoundTimerUpdate(): Observable<any> {
    return this.ss.on("updateRoundTimer");
  }
}
