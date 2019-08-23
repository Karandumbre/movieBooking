import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncryptDecryptService } from 'src/app/Services/encrypt-decrypt.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  email: FormControl;
  password: FormControl;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private encryptionService: EncryptDecryptService) { }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]);
    this.loginForm = this.formBuilder.group({
      'email': this.email,
      'password': this.password
    });
  }

  /**
   * Determines whether the user is authenticate of not
   * @param value Json string with emal and password
   */
  onSubmit(value) {
    if (value.email === '' || value.password === '') {
      alert('Please fill all details');
    } else {
      localStorage.setItem('loggedInToken', btoa(JSON.stringify({ 'email': value.email, 'password': value.password })));
      this.encryptionService.isLoggedIn();
      this.router.navigate(['/bookingService']);
    }
  }
}
