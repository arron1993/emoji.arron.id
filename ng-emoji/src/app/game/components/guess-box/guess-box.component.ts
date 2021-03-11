import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-guess-box',
  templateUrl: './guess-box.component.html',
  styleUrls: ['./guess-box.component.scss']
})
export class GuessBoxComponent implements OnInit {
  guesses = [];
  newGuessSub: Subscription;

  constructor(private rs: RoomService) { }

  ngOnInit(): void {
    this.newGuessSub = this.rs.onAddGuess().subscribe(resp => {
      this.guesses.push(resp.guess);
    })
  }

  addGuess(form) {
    this.rs.addGuess(form.value.guess)
  }
  
}
