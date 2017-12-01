import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { channelItems } from './channel';
import { CategoryItemsService } from '../category/category.service';
import { ServiceSettings } from '../sevice-settings'

@Injectable()
export class ChannelService {

  constructor(
    private _categoryItemsService:CategoryItemsService,
    private http: Http) {
  }

  public getChannelItems():Array<Object> {
    return channelItems;
  }

  public getChannelItemsWithCategory(): Promise<any[]> {
    let URL =  ServiceSettings.API_ENDPOINT + "/list/AllInOneType";
    
    return this.http.get(URL)
    .toPromise()
    .then(
      response => {
        return response.json().data.info[0];
      }
    )
    .catch(this.handleError);
  }

  public channelIdExists(cid): boolean{
    var result = false;
    if (channelItems.filter(item => item.id == cid).length == 1) {
      result = true;
    }
    return result;
  }

  public id2name(id) {
    var cid = "";
    var item = channelItems.filter(item => item.id == id);
    if (item.length == 1) {
      cid = item[0].title;
    }
    return cid;
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
