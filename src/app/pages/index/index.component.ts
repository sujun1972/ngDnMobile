import { Component, OnInit, ElementRef  } from '@angular/core';
// import { CarouselService } from '../../theme/components/carousel/carousel.service';
// import { CookieService } from 'ngx-cookie';
import { AppState } from '../../app.state';
// import { VideosService } from '../../_services/video/videos.service';
// import { slideInOutAnimation } from '../../_animations/slide-in-out.animation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
//  providers: [ CarouselService, VideosService ],\
})

export class IndexComponent implements OnInit {
    public carouselItems:Array<any>;

    constructor(private _elementRef:ElementRef,
                // private _carouselService:CarouselService,
                // private _cookieService:CookieService,
                private _state:AppState,
                // private _videoService: VideosService
              ) {
        this.carouselItems = [];
        // this._carouselService.getCarouselItems().then(
        //   items => {
        //     this.carouselItems = items;
        //     this._state.notifyDataChanged("CarouseReady", true);
        //   }
        // );

        // this._videoService.getAllRecommended().then(
        //   items => {
        //     _state.notifyDataChanged("recommandedItems.loaded", items);
        //   }
        // );
    }

  ngOnInit() {
    
  }

  getCookie(){
    // return this._cookieService.getAll();
  }
}

