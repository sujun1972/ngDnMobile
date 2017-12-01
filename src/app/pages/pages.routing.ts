import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';

import { IndexComponent } from './index/index.component';
// import { SearchComponent } from './search/search.component';
// import { FavoritesComponent } from './favorites/favorites.component';
// import { PersonalMessagesComponent } from './personal-messages/personal-messages.component';
// import { PrivateCollectionComponent } from './private-collection/private-collection.component';
// import { HistoryComponent } from './history/history.component';
// import { DepositComponent } from './deposit/deposit.component';
// import { VideoComponent } from './video/video.component';
// import { PlayComponent } from './play/play.component';
// import { ListComponent } from './list/list.component';
// import { UserComponent } from './user/user.component';
// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from '../_guards/auth.guard';
// import { LoginRequiredComponent } from './login-required/login-required.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'index', pathMatch:'full' },
            { path: 'index', component: IndexComponent, data: { breadcrumb: '多瑙影院' } },
            // { path: 'search/:key', component: SearchComponent, data: { breadcrumb: 'Search' } },
            // { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            // { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard], data: { breadcrumb: '收藏夹' } },
            // { path: 'messages', component: PersonalMessagesComponent, canActivate: [AuthGuard], data: { breadcrumb: '消息' } },
            // { path: 'private-collection', component: PrivateCollectionComponent, canActivate: [AuthGuard], data: { breadcrumb: '私密收藏' } },
            // { path: 'history', component: HistoryComponent, canActivate: [AuthGuard], data: { breadcrumb: '播放记录' } },
            // { path: 'deposit', component: DepositComponent, canActivate: [AuthGuard], data: { breadcrumb: '充值' } },
            // { path: 'list/:id', component: ListComponent, data: { breadcrumb: '视频列表', state: 'list'  } },
            // { path: 'video', component: VideoComponent, data: { breadcrumb: '视频简介', state: 'video'  } },
            // { path: 'play', component: PlayComponent, data: { breadcrumb: '视频播放', state: 'play' } },
            // { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard], data: { breadcrumb: '用户中心' } },
            // { path: 'login', component: LoginComponent, data: { breadcrumb: '用户登录' } },
            // { path: 'login-required', component: LoginRequiredComponent, data: { breadcrumb: '用户登录' } },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);