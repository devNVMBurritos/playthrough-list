import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	returnUrl?: string;
	loading = false;


	constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,

	) { 
		this.registerForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			email: ['', [Validators.required, Validators.email]]
		});
	}

	get f() { return this.registerForm.controls; }

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	ngOnInit(): void {  }

	onSubmit() {
		if (this.registerForm?.invalid) {
			return;
		}

		this.loading = true;
		this.userService.register(
			this.f.username.value,
			this.f.password.value,
			this.f.email.value,
		).pipe(first())
			.subscribe(
				data => {
					console.log(data);
					this.loading = false;
					this.router.navigate(['login']);
				}
			);
	}

}
