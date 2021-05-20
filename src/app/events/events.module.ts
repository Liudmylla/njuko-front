import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { EventsRoutingModule } from './events-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from '@app/libs/material-angular/material-angular.module';

/** Components **/
import { EventsComponent } from '@app/events/events.component';
import { AddEventComponent } from '@app/events/add-event/add-event.component';
import { AddEditionComponent } from '@app/editions/add-edition/add-edition.component';
import { EditionsService } from '@app/editions/services/editions.service';
import { EditionsComponent } from '@app/editions/editions.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@app/store/edition';
import { EditionsEffects } from '@app/store/edition/effects/edition.effects';
import { RegistrationsComponent } from '@app/registrations/registrations.component';
import { RegistrationsService } from '@app/registrations/services/registrations.service';
import { EditionSelectedGuard } from '@app/guards/edition-selected.guard';
import { ShellModule } from '@app/shell/shell.module';
import { EditRegistrationComponent } from '@app/registrations/edit/edit-registration.component';
import { AddRegistrationComponent } from '@app/registrations/add/add-registration.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ShellModule,
    EventsRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialAngularModule,
    StoreModule.forFeature('edition', reducers),
    EffectsModule.forFeature([EditionsEffects])
  ],
  declarations: [
    EventsComponent,
    EditionsComponent,
    AddEventComponent,
    AddEditionComponent,
    RegistrationsComponent,
    EditRegistrationComponent,
    AddRegistrationComponent
  ],
  providers: [
    EditionsService,
    RegistrationsService,
    EditionsEffects,
    EditionSelectedGuard
  ]
})
export class EventsModule {}
