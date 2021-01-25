import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import emojies  from './emojies';

@Component({
  selector: 'app-emoji-keyboard',
  templateUrl: './emoji-keyboard.component.html',
  styleUrls: ['./emoji-keyboard.component.scss']
})
export class EmojiKeyboardComponent implements OnInit {
  @Output() emoji = new EventEmitter<any>();
  emojies = emojies;

  selectedCategory = "people"
  
  constructor() { }

  ngOnInit(): void {
  }

  select(emoji) {
    this.emoji.emit(emoji)
  }  
}
