import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { AuthenticationService } from '../authentication/authentication.service';
import { ServiceSettings } from '../sevice-settings'
import { AppState } from '../../app.state';

@Injectable()
export class SearchService {
  private _searchServiceApiURL = ServiceSettings.API_ENDPOINT + "/list/Search";
  private _searchServiceByStarApiURL = ServiceSettings.API_ENDPOINT + "/list/SearchStar";
  private _searchServiceHotSearchApiURL = "/assets/data/hotsearch.data.htm";

  constructor(
    private _state: AppState,
    private http: Http,
    private authenticationService: AuthenticationService
  ) {
  }

  public getSearchResult(key, pager = 1): Promise<any[]> {
    let headers = new Headers();
    headers.append('Content-Type', this.authenticationService.token);
    let options = new RequestOptions({ headers: headers });
    let url = this._searchServiceApiURL + "?tags=" + key + "&page=" + pager;
    return this.http.get(url)
      .toPromise()
      .then(
      response => {
        return response.json().data.info;
      }
      )
      .catch(this.handleError);
  }

  public getSearchResultByStar(key, pager = 1): Promise<any[]> {
    let url = this._searchServiceByStarApiURL + "?star=" + key + "&page=" + pager;
    return this.http.get(url)
      .toPromise()
      .then(
      response => {
        return response.json().data.info;
      }
      )
      .catch(this.handleError);
  }

  public getHotSearch(): Promise<any[]> {
    let headers = new Headers();
    headers.append('Content-Type', this.authenticationService.token);
    let options = new RequestOptions({ headers: headers });
    let url = this._searchServiceHotSearchApiURL;
    var results = [];
    return this.http.get(url)
      .toPromise()
      .then(
      response => {
        var _bodyString = response['_body'];
        
        var items = _bodyString.match(/<li>.*?<\/li>/g);

        for (var i = 0; i < items.length; i++) {
          var item = items[i].replace("<li>", "").replace("</li>", "");
          results.push(item);
        }
        return results
      }
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}