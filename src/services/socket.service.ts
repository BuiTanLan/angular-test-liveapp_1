import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;
  constructor() {
    this.initSocket();
  }

  initSocket(): void {
    this.socket = io(`https://app.live.dev.tmtco.org/message`, {
      transports: ['websocket'], // Sủ dụng khi socketserver không dùng sticky session
      auth: {
        token:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMyM0Q4QzNBRjQ3RUI2MDE2NjcwMEU5OThBODI4OTYzIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NjA3OTU4MTIsImV4cCI6MTY5MjMzMTgxMiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LmxpdmUucmtlLmRldi50bXRjby5vcmciLCJhdWQiOlsiQWNjb3VudEFwcCIsIkxpdmVBcHAiLCJURGVza0FwcCIsIlRTaG9wQXBwIl0sImNsaWVudF9pZCI6IkxpdmVVc2VyQ2xpZW50IiwiYXBwIjoiTGl2ZUFwcCIsInJvbGUiOiJhZG1pbiIsInN1YiI6IjY2MzEzMDA5Mjk1OTM3MDkiLCJhdXRoX3RpbWUiOjE2NjA3OTU4MTIsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJraWV1dHR0QHRtdGNvLmFzaWEiLCJwaG9uZV9udW1iZXIiOiIrODQzNzY4NDYyOTUiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJUcnVlIiwiaWF0IjoxNjYwNzk1ODEyLCJzY29wZSI6WyJBY2NvdW50QXBwIiwiTGl2ZUFwcCIsIm9wZW5pZCIsIlREZXNrQXBwIiwiVFNob3BBcHAiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.XFCkqfvQr_awT8gVBNSf9kIZXgf7aVx03rDGxmFeKchP_anKdMvo8oGcBfOma4XhdHYtxuJAkbYcyunaoqF-73OKZB6IX4w8WphtO8dPPk175AhtE9xoJ7s-lBi7GrQT9EPBvYt9ii-JdZMx6bGbiEvxqkI6-qJuFdeFkN02UWuZyb9aMie2iMJ8XB8mlm1V0VDkdJGnQbSpBl0DwAfygi0TQJRwcBEO7LP03NfP1CRPCwS2Mq5krJsok3yXFWPI3Vzk_XtWPlQx58mLHcXG6VYHX66KaI3f9dgmwLOobo9sfhitv28ek39Qe5E6LRd1a0OHB4xwKKKLrmsY1zgrSQ',
      },
      query: {
        shopId: '1550572009310292'
      },
      path: "/socket-tdesk/socket.io"

    });
  }

  getSocketId = () => this.socket.id;

  disconnectSocket(): void {
    this.socket.close();
  }

  listenEvent(eventName: any): Observable<unknown> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: unknown) => {
        subscriber.next(data);
      });
    });
  }

  emitEvent(eventName: any, data: any): void {
    this.socket.emit(eventName, data);
  }
}
