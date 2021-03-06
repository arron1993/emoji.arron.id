import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SocketService } from 'src/app/core/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private ss: SocketService) { }

  getPlayerDetails() {
    this.ss.emit('getPlayerDetails');
  }

  onGetPlayerDetails(): Observable<any> {
    return this.ss.on("getPlayerDetails")
  }

  updatePlayer(data) {
    this.ss.emit('updatePlayer', data);
  }

  onUpdatePlayer(): Observable<any> {
    return this.ss.on("updatePlayer")
  }

  onSetActive(): Observable<any> {
    return this.ss.on("setActive")
  }
}
