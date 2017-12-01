import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { AuthenticationService } from '../authentication/authentication.service';
import { ServiceSettings } from '../sevice-settings'

@Injectable()
export class VideoListService {
    private _videoListServiceApiURL = ServiceSettings.API_ENDPOINT + "/video/PublishInfo";

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
      ) {
    }

    public getVideoList(): Promise<any[]> {
        let headers = new Headers();
        headers.append('Content-Type', this.authenticationService.token);
        let options = new RequestOptions({ headers: headers });
        var token = "";
        if (this.authenticationService.token) {
          token = this.authenticationService.token;
        }
        return this.http.get(this._videoListServiceApiURL + "?token=" + token )
        .toPromise()
        .then(
          response => {
            return response.json().data.info;
          } 
        )
        .catch(this.handleError);
      }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}