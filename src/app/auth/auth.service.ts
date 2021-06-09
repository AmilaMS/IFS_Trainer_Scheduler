import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { LoginInfo } from './login-info';
import { SignupInfo } from './signup-info';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

};

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private loginUrl = 'http://localhost:8080/api/auth/signin';
    private signupUrl = 'http://localhost:8080/api/auth/signup';

    roles: string[];
    authority: string;

    constructor(private tokenStorage: TokenStorageService, private http: HttpClient) { }

    attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions,);
    }

    signUp(info: SignupInfo): Observable<string> {
        return this.http.post<string>(this.signupUrl, info, httpOptions);
    }

    isAuthenticated() {
        this.roles = this.tokenStorage.getAuthorities();
        let flag: boolean = this.roles.every(role => {
            if (role['authority'] === 'ROLE_MANAGER') {
                return true;
            }
            return false;
        });

        // check if token is set, then...
        if (flag) {
            return true;
        } else {
            return false;
        }

    }
}
