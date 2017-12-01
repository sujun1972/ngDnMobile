import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../../app.state';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { SearchService } from "../../../_services/search/search.service"

@Component({
  selector: 'dn-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SearchService]
})

export class NavbarComponent {
    public isMenuCollapsed:boolean = false;
    public key;
    public defaultKey = "搜索";
    public hotSeachKeys:Array<any>;
    private defaultKeyIndex = 0;

    constructor(
        private _state:AppState,
        private router: Router, 
        private _router: ActivatedRoute,
        private _searchService: SearchService,
    ) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });

        this._searchService.getHotSearch().then(
            items => {
                this.hotSeachKeys = items;
                if (this.hotSeachKeys.length){
                    this.defaultKey = this.hotSeachKeys[this.defaultKeyIndex];
                }
            }
          );

        setInterval(() => {
            if (this.hotSeachKeys.length){
                this.defaultKeyIndex += 1;
                if (this.defaultKeyIndex == this.hotSeachKeys.length) {
                    this.defaultKeyIndex = 0;
                }

                this.defaultKey = this.hotSeachKeys[this.defaultKeyIndex];
            }
        }, 5000);
    }

    public closeSubMenus(){
       /* when using <az-sidebar> instead of <dn-menu> uncomment this line */
       //this._sidebarService.closeAllSubMenus();
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed; 
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    search() {
        var key;
        if (this.key) {
            key = this.key.trim();
        } else {
            key = this.defaultKey;
        }

        this.router.navigate(['/pages/search/' + key]);
    }

    onKeyEnter(event) {
        this.search();
    }

    onBlur(event) {
        jQuery(event.target).attr("placeholder", this.defaultKey);
    }

    onFocus(event) {
        jQuery(event.target).attr("placeholder", "");
    }
}
