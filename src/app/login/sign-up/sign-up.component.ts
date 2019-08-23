import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/Services/encrypt-decrypt.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: any;
  email: any;
  name: any;
  password: any;
  cp: any;
  formSumitAttempt: boolean;
  @ViewChild('error') error: ElementRef;

  constructor(private fb: FormBuilder, private encryptionService: EncryptDecryptService,
    private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.createFormControl();
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      'email': this.email,
      'name': this.name,
      'password': this.password,
      'cp': this.cp
    });
  }

  /**
   * Creates all the form controls used for user sign in
   */
  createFormControl() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
    this.cp = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.name = new FormControl('', [Validators.required]);
  }

  /**
   * Signs in
   * Send them for validation
   * Displays error if any exists
   */
  signIn() {
    this.formSumitAttempt = true;
    if (this.registerForm.invalid) {
      this.scrollIfFormHasErrors(this.registerForm);
    }
    if (this.registerForm.valid) {
      this.password.value === this.cp.value ? this.submitValues() : alert('Password Doesn"t match');
    }
  }

  /**
   * Submits values of the form
   * Encrypt the user details
   */
  submitValues() {
    const encryptedData = this.encryptionService.encryptData({
      name: this.name.value,
      email: this.email.value.toLowerCase(),
      password: this.password.value
    });
    localStorage.setItem('Token', encryptedData);
    this.formSumitAttempt = false;
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }

  /**
      * Determines whether field valid or not
      * @param field
      // tslint:disable-next-line:no-redundant-jsdoc
      * @returns Returns true if all the fields of form are valid and satisfy all the conditions assigned to the fields
      */
  isFieldValid(field: string) {
    return (
      (!this.registerForm.get(field).valid && this.formSumitAttempt));
  }

  /**
   * Displays field css
   * @param field returns the field which has an error
   *
   */
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }


  /**
* Scrolls to the div which has error
* @param el The native element which has an error
*/
  scrollTo(el: Element) {
    if (el) {
      el.scrollIntoView(true);
    }
  }

  /**
   * Scrolls to error
   */
  scrollToError(): void {
    this.scrollTo(this.error.nativeElement);
  }

  /**
   * Scrolls if form has errors
   * @param form The formGroup which has some error
   * @returns if form has errors
   */
  async scrollIfFormHasErrors(form: FormGroup): Promise<any> {
    await form.invalid;
    this.scrollToError();
  }
}
