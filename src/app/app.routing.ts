import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ErrorComponent } from './error/error.component';
export const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    // { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
    // { path: 'helper', component: HelperComponent, data: { breadcrumb: '帮助中心' }  },
    { path: '**', component: ErrorComponent }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    // useHash: true
});
