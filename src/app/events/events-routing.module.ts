import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EventsComponent } from '@app/events/events.component';
import { EditionSelectedGuard } from '@app/guards/edition-selected.guard';
import { RegistrationsComponent } from '@app/registrations/registrations.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    {
      path: 'events',
      component: EventsComponent,
      data: { title: extract('Events') }
    },
    {
      path: 'registrations',
      canActivate: [EditionSelectedGuard],
      canLoad: [EditionSelectedGuard],
      component: RegistrationsComponent,
      data: { title: extract('Registrations') }
    },
    {
      path: 'registrations/:id',
      canActivate: [EditionSelectedGuard],
      canLoad: [EditionSelectedGuard],
      component: RegistrationsComponent,
      data: { title: extract('Registration') }
    },
    {
      path: 'registration',
      canActivate: [EditionSelectedGuard],
      canLoad: [EditionSelectedGuard],
      component: RegistrationsComponent,
      data: { title: extract('Registration') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EventsRoutingModule {}
