import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji-keyboard',
  templateUrl: './emoji-keyboard.component.html',
  styleUrls: ['./emoji-keyboard.component.scss']
})
export class EmojiKeyboardComponent implements OnInit {
  @Output() emoji = new EventEmitter<any>();

  category = "people"
  emojies = {
    "people": ["😀"],
    "animals": ["🦁"],
    "food": ["🍇"],
    "activity": ["🕴️"],
    "travel": ["🚣"],
    "objects": ["💌"],
    "symbols": ["💘"],
    "flags": ["🏁"]
  };

  constructor() { }

  ngOnInit(): void {
  }

  select(emoji) {
    this.emoji.emit(emoji)
  }
}
