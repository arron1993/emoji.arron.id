import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io }from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  

  constructor() { 
    this.socket = io({ 'path': '/socket.io' });
  }

  emit(event, data?) {
    data = data || {}
    this.socket.emit(event, data);
  }

  observers = [];

  on(event): Observable<any> {
    const observerId = Math.floor(Math.random() * Math.floor(100000000));
    this.socket.on(event, (res) => {
      this.observers[observerId].next(res);
    });
    return this.getSocketDataObservable(observerId);
  }

  getSocketDataObservable(observerId): Observable<any> {
    return new Observable(observer => {        
        this.observers[observerId] = observer;
    });
}
}
