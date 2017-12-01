import { Component, Input, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute , NavigationEnd } from '@angular/router';
import { CategoryItemsService } from '../../../_services/category/category.service';
import { ChannelService } from '../../../_services/channel/channel.service';
import { Location } from '@angular/common';
import { AppState } from '../../../app.state';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { slideInOutAnimation } from '../../../_animations/slide-in-out.animation';

@Component({
    selector: 'dn-cat-menu',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './cat-menu.component.html',
    styleUrls: ['./cat-menu.component.scss'],
    providers: [ 
        CategoryItemsService,
        ChannelService
    ],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(0, -120%, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
    ]
})

export class CatMenuComponent implements OnInit {
    channelId: number;
    id: number;
    private sub: any;
    public isCollapsed = true;
    public subMenu:Array<any>;
    public catMenuItems:Array<any>;
    public channels:any;
    @Input() hasGoBackButton: boolean;
    @Input() showSubmenus: boolean;
    // PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    //     suppressScrollX: true
    // };

    catlogListState:string = 'out';

    constructor(private _elementRef:ElementRef,
                private _router:Router,
                private route: ActivatedRoute,
                private _state:AppState,
                private _activatedRoute:ActivatedRoute,
                private _categoryItemsService:CategoryItemsService,
                private _channelService: ChannelService,
                private _location: Location) {

        this.catMenuItems = _channelService.getChannelItems();

        this._channelService.getChannelItemsWithCategory().then(
            items => {
                this.channels = items;

                if (!this.subMenu) {
                    this.id = this.route.params['_value']['id'];
                    if (this.id < 9) {
                        this.channelId = this.id
                    } else {
                        this.channelId = this.getChannelIdByCategory(this.id);
                    }
                    if (this.channelId) {
                        this._categoryItemsService.getCategoryItemsByChannel(this.channelId).then(items => this.subMenu = items);
                    }
                }
            }
        );

        this._state.subscribe('category-list.isCollapsed', (isCollapsed) => {
            this.isCollapsed = isCollapsed;
            

            if (this.isCollapsed) {
                jQuery('body').removeClass("no-scroll");
                jQuery(".category-expander .dn-icon").removeClass('rotate-180');
            } else {
                jQuery('body').addClass("no-scroll");
                jQuery(".category-expander .dn-icon").addClass('rotate-180');
            }
        });
        
        this._router.events.subscribe(() => {
            this.catlogListState = 'out';
            this._state.notifyDataChanged('category-list.isCollapsed', this.catlogListState === 'out');
            // if (!this.isCollapsed) {
            //     this.isCollapsed = true;
            //     this._state.notifyDataChanged('category-list.isCollapsed', true);
            //     this.menuState = 'out';
            //     jQuery(".category-expander .dn-icon").addClass('rotate-180');
            // }
        })
        this.route.params.subscribe(params => {

            this.id = params["id"];

            if (this.id < 9) {
                this.channelId = this.id
            } else {
                this.channelId = this.getChannelIdByCategory(this.id);
            }
            if (this.channelId) {
                this._categoryItemsService.getCategoryItemsByChannel(this.channelId).then(items => this.subMenu = items);
            }
        });
    }

    public ngOnInit():void {

    }

    private getChannelIdByCategory(categoryId) {
        if (!this.channels) {
            return null
        }

        for (var i = 0; i < this.channels['AnimeList'].length; i++) {
            if (this.channels['AnimeList'][i]['Path'] == categoryId) {
                return 4; // 动漫 -- 4
            }
        }
        for (var i = 0; i < this.channels['CircleList'].length; i++) {
            if (this.channels['CircleList'][i]['Path'] == categoryId) {
                return 7; // 华人圈 -- 7
            }
        }

        for (var i = 0; i < this.channels['DocumentaryList'].length; i++) {
            if (this.channels['DocumentaryList'][i]['Path'] == categoryId) {
                return 6; // 纪录片 -- 6
            }
        }
     
        for (var i = 0; i < this.channels['FilmList'].length; i++) {
            if (this.channels['FilmList'][i]['Path'] == categoryId) {
                return 1; // 电影 -- 1
            }
        }
        for (var i = 0; i < this.channels['GameList'].length; i++) {
            if (this.channels['GameList'][i]['Path'] == categoryId) {
                return 8; // 游戏 -- 8
            }
        }

        for (var i = 0; i < this.channels['SportList'].length; i++) {
            if (this.channels['SportList'][i]['Path'] == categoryId) {
                return 5; // 体育 -- 5
            }
        }

        for (var i = 0; i < this.channels['TVList'].length; i++) {
            if (this.channels['TVList'][i]['Path'] == categoryId) {
                return 2; // 电视剧 -- 2
            }
        }

        for (var i = 0; i < this.channels['VarietyList'].length; i++) {
            if (this.channels['VarietyList'][i]['Path'] == categoryId) {
                return 3; // 综艺 -- 3
            }
        }

    }

    ngAfterViewInit() {
        if (this._router.url.includes('/list')) {
            if (!this._channelService.channelIdExists(this.id)) {
                var channelID = this._categoryItemsService.getChannelId(this.id);
                jQuery("[id^=cat-]").removeClass("active");
                jQuery("#chn-" + channelID).addClass("active");
                jQuery("#cat-" + this.id).addClass("active");
            } else {
                jQuery("#chn-" + this.id).addClass("active");
            }
            if (jQuery("#category-list").hasClass("collapsed")) {
                this.toggleCategoryList();
            }
        }
    }

    public toggleCategoryList():void {
        // this.isCollapsed = !this.isCollapsed;
        this.catlogListState = this.catlogListState === 'out' ? 'in' : 'out';
        this._state.notifyDataChanged('category-list.isCollapsed', this.catlogListState === 'out');
    }

    goBack() {
        this._location.back();
    }

    ngOnDestroy() {
        jQuery("html, body").css("overflow", "visible");
    }

}
