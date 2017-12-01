import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../../app.state';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(
        private http: Http,
        private _cookieService:CookieService,
        private _router: Router,
        private _state:AppState) {
        this.token = this._cookieService.get("token");
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this._cookieService.remove("token");
        this._cookieService.remove("userid");
        this._cookieService.remove("username");
        this._cookieService.put("dn_logout", "1", {expires: new Date(new Date().getTime() +10*60000)});
        this._cookieService.remove("username");
        this._router.navigate(['/pages/index']);
        this._state.notifyDataChanged('user.logged.in', false);
    }
}