import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { StartComponent } from './start/start.component';
import { ProvidersComponent } from './providers/providers.component';
import { AuthGuard } from './shared/auth.guard';
import { ProviderGuard } from './shared/provider.guard';

const appRoutes: Routes = [
    {path: '', component: StartComponent},
    {path: 'connect', component: ConnectComponent},
    {path: 'providers', component: ProvidersComponent, canActivate: [AuthGuard, ProviderGuard]},
    {path: '**', redirectTo: '/'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
