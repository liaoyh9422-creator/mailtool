import { Injectable } from '@angular/core';

// This tells TypeScript that CryptoJS is a global variable
// provided by the script in index.html
declare const CryptoJS: any;

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly keyString = 'retroartstycoon!';

  encrypt(plainText: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.keyString);
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
}
