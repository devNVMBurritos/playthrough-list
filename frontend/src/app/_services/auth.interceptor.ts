import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const loginToken = localStorage.getItem('currentUser');

		if (loginToken) {
			const reqClone = req.clone({
				headers: 	req.headers.set('Authorization', `Bearer ${loginToken}`)
			}); 

			return next.handle(reqClone);
		} else {
			return next.handle(req);
		}
	}
}