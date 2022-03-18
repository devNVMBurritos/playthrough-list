import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  public get gameList() {
    return this.http.get<any> (`http://localhost:4201/game/list/get-all-game-list`, {});
  }
}
