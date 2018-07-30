import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { ResultComponent } from './result/result.component';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { StartComponent } from './start/start.component';

import { AuthorizationService } from './shared/authorization.service';
import { ProvidersComponent } from './providers/providers.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthGuard } from './shared/auth.guard';
import { ProviderGuard } from './shared/provider.guard';


@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    ResultComponent,
    StartComponent,
    ProvidersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthorizationService,
    AuthGuard,
    ProviderGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
