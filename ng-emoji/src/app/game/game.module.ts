import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { CreateRoomPageComponent } from './pages/create-room-page/create-room-page.component';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReadyUpButtonComponent } from './components/ready-up-button/ready-up-button.component';
import { EmojiKeyboardComponent } from './components/emoji-keyboard/emoji-keyboard.component';
import { JoinRoomFormComponent } from './components/join-room-form/join-room-form.component';
import { ShareRoomLinkComponent } from './components/share-room-link/share-room-link.component';

@NgModule({
  declarations: [CreateRoomPageComponent, RoomPageComponent, UserListComponent, ReadyUpButtonComponent, EmojiKeyboardComponent, JoinRoomFormComponent, ShareRoomLinkComponent],
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule
  ]
})
export class GameModule { }
