import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from '@app/libs/material-angular/material-angular.module';

/** Components **/
import { AddEditionComponent } from '@app/editions/add-edition/add-edition.component';
import { EditionsService } from '@app/editions/services/editions.service';
import { EditionsComponent } from '@app/editions/editions.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialAngularModule
  ],
  declarations: [EditionsComponent, AddEditionComponent],
  providers: [EditionsService]
})
export class EditionsModule {}
