import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { EncryptDecryptService } from './../Services/encrypt-decrypt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private encryptionService: EncryptDecryptService, private router: Router) { }

  canActivate(): boolean {
    if (!this.encryptionService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      this.encryptionService.deleteToken();
      return false;
    }
    return true;
  }
}
