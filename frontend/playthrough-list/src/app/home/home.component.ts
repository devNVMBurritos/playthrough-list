import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { Game } from '../_models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gameList: Game[];

  constructor(
    gameService: GameService
  ) {
    this.gameList = [
    {
      title: 'title',
      imageLink: '',
      description: ''
    }
  ];
    gameService.gameList.subscribe(
      gameList => {
        this.gameList = gameList;
      }
    );
   }

  ngOnInit(): void {
  }

}
