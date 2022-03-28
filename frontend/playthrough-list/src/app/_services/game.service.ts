import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Game } from '../_models/game';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	constructor(
    private http: HttpClient
	) { }

	public get gameList() {
		return this.http.get<any> (`${environment.apiUrl}/game/list/get-game-list-all`, {});
	}

	public get promotedGameList() {
		return this.http.get<any> (`${environment.apiUrl}/game/list/get-game-list-promoted`, {});
	}

	public addGame(game: Game, token: string) {
		const headers = {Authorization: `Bearer ${token}`};
		return this.http.post<any>(`${environment.apiUrl}/game/add-game`, game, {headers});
	}

	public getGame(id: string) {
		const body = { id: id };
		return this.http.post<Game> (`${environment.apiUrl}/game/get-game`, body);
	}
}
