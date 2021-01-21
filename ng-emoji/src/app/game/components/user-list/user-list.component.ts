import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userSubscription: Subscription;

  users: [string];

  @Input() roomId: number;
  constructor(private rs: RoomService) { }

  ngOnInit(): void {
    this.userSubscription = this.rs.onGetUserList().subscribe(resp => {
      console.log(resp);
      this.users = resp.users;
    })    
  }

}
