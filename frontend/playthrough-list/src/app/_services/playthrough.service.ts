import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Playthrough } from '../_models/playthrough';

@Injectable({
	providedIn: 'root'
})
export class PlaythroughService {


	constructor(
		private http: HttpClient
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	) { }

	public addPlaythrough(playthrough: Playthrough, token: string) {
		const headers = {Authorization: `Bearer ${token}`};
		return this.http.post<any>(`${environment.apiUrl}/playthrough/add-playthrough`, playthrough, {headers});
	}

	public getPlaythrough(game: string, token:string) {
		const headers = {Authorization: `Bearer ${token}`};
		return this.http.post<any>(`${environment.apiUrl}/playthrough/get-playthrough`, {game: game}, {headers});
	
	}
}
