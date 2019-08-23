import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  userLoggedIn: boolean;
  constructor(private cookieService: CookieService) { }

  /**
   * Used to encrypt user loggin credentials
   * @param data string formatted decrptyed data
   * @returns  encrypted data
   */
  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.encryptionKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Used to Decrypt user loggin credentials
   * @param data string formatted encrypted data
   * @returns  decrptyed data
   */
  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.encryptionKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Sets user token token
   * @param token string formatted string
   */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  /**
   * Gets user logged in token
   * @returns string value
   */
  getToken() {
    return localStorage.getItem('loggedInToken');
  }
  /**
   * Logout the user from the system
   */
  deleteToken() {
    localStorage.removeItem('loggedInToken');
  }

  /**
   * User payload
   * For verification, data is decrypted.
   * @returns decrypted email and password
   */
  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  /**
   * Determines whether logged in or not
   * @returns boolean value, true is user is successfully authenticated else returns false
   */
  isLoggedIn() {
    const userPayload = this.getUserPayload();
    const data = this.decryptData(localStorage.getItem('Token'));
    if (userPayload && data) {
      const email = data.email;
      const password = data.password;
      if (userPayload.email !== email || userPayload.password !== password) {
        alert('Wrong Credentials');
      }
      return (userPayload.email === email && userPayload.password === password);
    } else {
      return false;
    }
  }
}
