import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  public get gameList() {
    return this.http.get<any> (`http://localhost:4201/game/list/get-game-list-all`, {});
  }

  public get promotedGameList() {
    return this.http.get<any> (`http://localhost:4201/game/list/get-game-list-promoted`, {});
  }
}
