import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44358/api/';
  user: UserModel;
  decodedTokenKey: any;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      registerModel
    );
  }

  isAuthenticated() {
    if (this.localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.localStorageService.remove('token');
  }

  decodedToken(token: any) {
    return this.jwtHelperService.decodeToken(token);
  }

  signedIn() {
    if (this.localStorageService.get('token')) {
      return this.jwtHelperService.isTokenExpired();
    } else {
      return false;
    }
  }

  getUserInfo() {
    let decodedToken = this.decodedToken(this.localStorageService.get('token'));
    if (decodedToken) {
      if (this.signedIn()) {
        let tokenInfoName = Object.keys(decodedToken).filter((u) =>
          u.endsWith('/name')
        )[0];
        var splitted = String(decodedToken[tokenInfoName]).split(' ');
        let firstName = splitted[0];
        let lastName = splitted[1];

        let tokenInfoId = Object.keys(decodedToken).filter((x) =>
          x.endsWith('/nameidentifier')
        )[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter((x) =>
          x.endsWith('/role')
        )[0];
        let roles = decodedToken[claimInfo];

        let emailInfo = decodedToken.email;

        this.user = {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: emailInfo,
          roles: roles,
        };
      }
    }
    return this.user;
  }
}
