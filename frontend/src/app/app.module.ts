import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { GameComponent } from './game/game.component';
import { AuthInterceptor } from './_services/auth.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProfileComponent,
		LoginComponent,
		RegisterComponent,
		NavbarComponent,
		AdminComponent,
		GameComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [AuthInterceptor],
	bootstrap: [AppComponent]
})
export class AppModule { }
