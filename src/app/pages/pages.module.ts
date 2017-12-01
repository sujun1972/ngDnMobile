import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ToastrModule } from 'ngx-toastr';
// import { DirectivesModule } from '../theme/directives/directives.module';
// import { PipesModule } from '../theme/pipes/pipes.module';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { MenuComponent } from '../theme/components/menu/menu.component';
// import { CommentingOverlayComponent } from '../theme/components/commenting-overlay/commenting-overlay.component';
import { CatMenuComponent } from '../theme/components/cat-menu/cat-menu.component';
// import { CarouselComponent } from '../theme/components/carousel/carousel.component';
// import { ThumbnailComponent } from '../theme/components/thumbnail/thumbnail.component';
// import { RecVideosComponent } from './index/rec-videos/rec-videos.component';
// import { RecDramaComponent } from './index/rec-drama/rec-drama.component';
// import { TvNewsComponent } from '../theme/components/tv-news/tv-news.component';
import { NavbarComponent } from '../theme/components/navbar/navbar.component';
import { MessagesComponent } from '../theme/components/messages/messages.component';
// import { PrivateCollectionComponent } from './private-collection/private-collection.component';
// import { HistoryComponent } from './history/history.component';
import { IndexComponent } from './index/index.component';
// import { DepositComponent } from './deposit/deposit.component';
// import { PersonalMessagesComponent } from './personal-messages/personal-messages.component';
// import { FavoritesComponent } from './favorites/favorites.component';
// import { SearchComponent } from './search/search.component';
// import { VideoComponent } from './video/video.component';
// import { PlayComponent } from './play/play.component';
// import { VideoBarComponent } from './video/video-bar/video-bar.component';
// import { VideoDesComponent } from './video/video-des/video-des.component';
// import { VideoEpsComponent } from './video/video-eps/video-eps.component';
// import { CommentsComponent } from '../theme/components/comments/comments.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CommentBoxComponent } from '../theme/components/comment-box/comment-box.component';
// import { ListComponent } from './list/list.component';
// import { BackButtonComponent } from '../theme/components/back-button/back-button.component';
// import { UserComponent } from './user/user.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FooterComponent } from '../theme/components/footer/footer.component';
// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from '../_guards/auth.guard';
// import { LoginRequiredComponent } from './login-required/login-required.component';
// import { LogoutComponent } from './logout/logout.component';
// import { VgCoreModule } from "videogular2/core";
// import { VgControlsModule } from "videogular2/controls";
// import { VgOverlayPlayModule } from "videogular2/overlay-play";
// import { VgBufferingModule } from "videogular2/buffering";
// import { VgImaAdsModule } from "videogular2/ima-ads";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LoadingOverlayComponent } from '../theme/components/loading-overlay/loading-overlay.component';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
// import { chineseCouterPipe } from '../theme/pipes/chineseCounter/chineseCounter.pipe';
// import { RecDocumentaryComponent } from './index/rec-documentary/rec-documentary.component';
// import { RecSportComponent } from './index/rec-sport/rec-sport.component';
// import { RecVarietyComponent } from './index/rec-variety/rec-variety.component';
// import { RecAnimeComponent } from './index/rec-anime/rec-anime.component';
// import { RecChineseComponent } from './index/rec-chinese/rec-chinese.component';
// import { RecGameComponent } from './index/rec-game/rec-game.component';
// import { RecNewsComponent } from './index/rec-news/rec-news.component'

// import { BackTopComponent } from '../theme/components/back-top/back-top.component';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };


@NgModule({
  imports: [
    CommonModule,
    // ToastrModule.forRoot({
    //   maxOpened: 3,
    //   timeOut: 2000,
    //   autoDismiss: true,
    //   newestOnTop: true,
    //   preventDuplicates: true
    // }),
    // DirectivesModule,
    // PipesModule,
    routing,
    // NgbModule.forRoot(),
    // InfiniteScrollModule,
      FormsModule,
    // VgCoreModule,
    // VgControlsModule,
    // VgOverlayPlayModule,
    // VgBufferingModule,
    // VgImaAdsModule,
    // PerfectScrollbarModule,
    // Ng2DeviceDetectorModule.forRoot(),
  ],
  declarations: [
    PagesComponent,
    MenuComponent,
    CatMenuComponent,
    // CarouselComponent,
    // ThumbnailComponent,
    // RecVideosComponent,
    // RecDramaComponent,
    // TvNewsComponent,
    NavbarComponent,
    MessagesComponent,
    // HistoryComponent,
    IndexComponent,
    // DepositComponent,
    // PrivateCollectionComponent,
    // PersonalMessagesComponent,
    // FavoritesComponent,
    // SearchComponent,
    // VideoComponent,
    // PlayComponent,
    // VideoBarComponent,
    // VideoDesComponent,
    // VideoEpsComponent,
    // CommentsComponent,
    // CommentBoxComponent,
    // BackButtonComponent,
    // UserComponent,
    FooterComponent,
    // LoginComponent,
    // LoginRequiredComponent,
    // LogoutComponent,
    // CommentingOverlayComponent,
    // LoadingOverlayComponent,
    // ListComponent,
    // chineseCouterPipe,
    // RecDocumentaryComponent,
    // RecSportComponent,
    // RecVarietyComponent,
    // RecAnimeComponent,
    // RecChineseComponent,
    // RecGameComponent,
    // RecNewsComponent,
    // ###############################
    // BreadcrumbComponent,
    // BackTopComponent,
  ],
  entryComponents: [
    // CommentBoxComponent
  ],
  providers: [
    // AuthGuard,
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }
  ]
})
export class PagesModule { }
