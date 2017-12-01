import { Injectable } from '@angular/core';
import { facetimeItems } from './facetime';


@Injectable()
export class FacetimeService {

  constructor() {
  }

  public getFacetimeItems():Array<Object> {
    return facetimeItems;
  }
}