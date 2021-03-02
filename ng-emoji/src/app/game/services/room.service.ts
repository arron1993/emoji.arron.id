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
    console.log("join")
    this.ss.emit('joinRoom', {roomId: roomId, username: username});
  }

  onPlayerJoinedRoom(): Observable<any> {
    return this.ss.on("playerJoinedRoom")
  }

  onPlayerLeftRoom(): Observable<any> {
    return this.ss.on("playerLeftRoom")
  }



  getPlayers(roomId) {
    this.ss.emit("getPlayers", {roomId: roomId});
  }

  onGetPlayers(): Observable<any> {
    return this.ss.on("getPlayers")
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
