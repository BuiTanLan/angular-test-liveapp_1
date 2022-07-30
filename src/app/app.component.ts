import {Component, OnDestroy, OnInit} from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private readonly socketService: SocketService) { }
  ngOnInit(): void {
    //this.socketService.initSocket();
    this.socketService.listenEvent('View.Count.Changed').subscribe(res => {
      console.log(res);
    })
    this.socketService.listenEvent('TMT.LiveApp.EventBus.Distributed.CommentCreateEto').subscribe(res => {
      console.log(res);
    })
    this.socketService.listenEvent('TMT.LiveApp.EventBus.Distributed.CommentCreateEto').subscribe(res => {
      console.log(res);
    })
    this.socketService.listenEvent('TMT.LiveApp.EventBus.Distributed.CommentUpdateEto').subscribe(res => {
      console.log(res);
    })
    this.socketService.listenEvent('TMT.LiveApp.EventBus.Distributed.CommentDeleteEto').subscribe(res => {
      console.log(res);
    })
  }

  ngOnDestroy(): void {

  }

  increase() {
    this.socketService.emitEvent('Post.Joined', 1729281133428783)

  }

  decrease() {
    this.socketService.emitEvent('Post.Left', 1729281133428783)

  }
}
