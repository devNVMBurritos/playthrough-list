import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Review } from '../_models/review';

@Injectable({
	providedIn: 'root'
})
export class ReviewService {

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor(
		private http: HttpClient
	) { }

	public addReview(review: Review, token: string) {
		const headers = {Authorization: `Bearer ${token}`};
		return this.http.post<any>(`${environment.apiUrl}/review/add-review`, review, {headers});
	}

	public getReview(gameId: string, token: string) {
		const headers = {Authorization: `Bearer ${token}`};
		return this.http.post<any>(`${environment.apiUrl}/review/get-review`, {game: gameId }, {headers});
	}

	public editReview(review: Review, token: string) {
		const headers = {Authorization: `Bearer ${token}`};
		return this.http.post<any>(`${environment.apiUrl}/review/edit-review`, review, {headers});
	}
}
