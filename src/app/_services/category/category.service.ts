import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { categoryItems } from './category';
import { CategoryModel } from '../../_model/category/category.model';
import { ServiceSettings } from '../sevice-settings'

@Injectable()
export class CategoryItemsService {

  private _videoCatApiURL = ServiceSettings.API_ENDPOINT + "/list/FilmType";
  private _dramaCatApiURL = ServiceSettings.API_ENDPOINT + "/list/TvType";
  private _varietyCatApiURL = ServiceSettings.API_ENDPOINT + "/list/VarietyType";
  private _animeCatApiURL = ServiceSettings.API_ENDPOINT + "/list/AnimeType";
  private _sportCatApiURL = ServiceSettings.API_ENDPOINT + "/list/SportType";
  private _documentaryApiURL = ServiceSettings.API_ENDPOINT + "/list/DocumentaryType";
  private _chineseApiURL = ServiceSettings.API_ENDPOINT + "/list/CircleType";
  private _gameApiURL = ServiceSettings.API_ENDPOINT + "/list/GameType";

  constructor(
    private http: Http) {
  }

  public getCategoryItems():Array<Object> {
    return categoryItems;
  }

  public getCategoryItemsByChannel(cid): Promise<CategoryModel[]> {
    var URL;
    if (cid == 1) {
      URL = this._videoCatApiURL;
    } else if (cid == 2) {
      URL = this._dramaCatApiURL;
    } else if (cid == 3) {
      URL = this._varietyCatApiURL;
    } else if (cid == 4) {
      URL = this._animeCatApiURL;
    } else if (cid == 5) {
      URL = this._sportCatApiURL;
    } else if (cid == 6) {
      URL = this._documentaryApiURL;
    } else if (cid == 7) {
      URL = this._chineseApiURL;
    } else if (cid == 8) {
      URL = this._gameApiURL;
    }
    return this.http.get(URL)
    .toPromise()
    .then(
      response => {
        return response.json().data.info as CategoryModel[]
      }
    )
    .catch(this.handleError);
  }

  public id2name(id) {
    var cid = "";
    var item = categoryItems.filter(item => item.id == id);
    if (item.length == 1) {
      cid = item[0].title;
    }
    return cid;
  }

  public getChannelId(categoryId) {
    var cid = "";
    var item = categoryItems.filter(item => item.id == categoryId);
    if (item.length == 1) {
      cid = item[0].channel;
    }
    return cid;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
