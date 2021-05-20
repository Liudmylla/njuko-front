import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsModule } from '@app/events/events.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from '@app/reducers';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    EventsModule,
    LoginModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
