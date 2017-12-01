import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Location } from '@angular/common';
import { AppState } from '../app.state';
import { routerTransition } from '../_animations/router.animation';

@Component({
  selector: 'dn-pages',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [ routerTransition ],
})

export class PagesComponent implements OnInit {

    public isMenuCollapsed:boolean = true;

    constructor(private _state:AppState, 
                private _location:Location) {
            this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    ngOnInit() {
        this.getCurrentPageName();
    }

    public getCurrentPageName():void{
        let url = this._location.path();
        let hash = (window.location.hash) ? '#' : '';    
        setTimeout(function(){
            let subMenu = jQuery('a[href="'+ hash + url + '"]').closest("li").closest("ul");            
            window.scrollTo(0, 0);
            subMenu.closest("li").addClass("sidebar-item-expanded"); 
            subMenu.slideDown(250);    
        });
    }

    public hideMenu():void{
        this._state.notifyDataChanged('menu.isCollapsed', true);
        this.isMenuCollapsed = true;
    }

    public ngAfterViewInit(): void {
        this._state.notifyDataChanged('website.loaded', true);
        var preloaderOverlay = document.getElementById('preloader')
        if (preloaderOverlay) {
            document.getElementById('preloader').style['display'] = 'none';
        }
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
