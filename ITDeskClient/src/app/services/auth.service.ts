import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenModel } from '../models/token.models';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: TokenModel = new TokenModel();
  tokenString: string = "";
  constructor(private router: Router) { }

  checkAuthentication() {
    const responseString = localStorage.getItem("response");
    if (responseString != null) {
      const responsJson = JSON.parse(responseString);

      if (responsJson != null) {
        this.tokenString = responsJson?.accessToken;

        if (this.tokenString != null) {
          const decode: any = jwtDecode(this.tokenString);
          console.log(decode);
          this.token.email = decode?.Email;
          this.token.name = decode?.Name;
          this.token.userName = decode?.UserName;
          this.token.userId = decode?.UserId;
          this.token.exp = decode?.exp;
          const now = new Date().getTime() / 1000

          if (this.token.exp < now) {
            this.router.navigateByUrl("/login");
            return false;
          }
          return true;
        }
        else {
          this.router.navigateByUrl("/login");
          return false;
        }
      } else {
        this.router.navigateByUrl("/login");
        return false;
      }
    }

    this.router.navigateByUrl("/login");
    return false;

  }
}
