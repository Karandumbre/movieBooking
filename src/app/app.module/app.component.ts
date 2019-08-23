import { Component } from '@angular/core';
import { EncryptDecryptService } from '../Services/encrypt-decrypt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public encryptionService: EncryptDecryptService, private router: Router) { }
  title = 'bookingApp';

  /**
   * Logouts the user from system
   */
  logout() {
    this.encryptionService.deleteToken();
    this.router.navigate(['/']);
  }
}
