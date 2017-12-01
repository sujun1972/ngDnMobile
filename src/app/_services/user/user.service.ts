import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../_model/user/user';
import { ServiceSettings } from '../sevice-settings'

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        let headers = new Headers();
        headers.append('Content-Type', this.authenticationService.token);
        let options = new RequestOptions({ headers: headers });
        var token = "";
        if (this.authenticationService.token) {
            token = this.authenticationService.token
        }
        return this.http.get(ServiceSettings.API_ENDPOINT + '/user/GetUserInfo' + "?token=" + token)
            .map((response: Response) => {
                return response.json();
            });
    }

}