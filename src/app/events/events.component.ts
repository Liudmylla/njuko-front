// General
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

// Store
import { select, Store } from '@ngrx/store';
import { getEdition } from '@app/store/edition/selectors/edition.selectors';
import { State } from '@app/store/edition';

// Models
import { Event } from '@app/events/model/Event.model';
import { Edition } from '@app/editions/model/Edition.model';

// Services
import { EventsService } from '@app/events/services/events.service';
import { EditionsService } from '@app/editions/services/editions.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  events: Array<Event>;
  eventSelected: Event;
  editionAdded: Edition;
  action: string;

  @ViewChild('settingsSidenav', { static: false }) settingsSidenav: any;

  constructor(
    private store: Store<State>,
    public eventsService: EventsService,
    public editionsService: EditionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.eventsService.getEvents().subscribe(events => {
      this.events = events;
      this.isLoading = false;
    });
    this.store.pipe(select(getEdition)).subscribe(editionSelected => {
      if (editionSelected) {
        this.router.navigate(['/registrations']);
      }
    });
  }

  addEvent(): void {
    this.action = 'addEvent';
    this.settingsSidenav.toggle();
  }

  addEdition(event: Event): void {
    this.eventSelected = event;
    this.action = 'addEdition';
    this.settingsSidenav.toggle();
  }

  saveEvent(value: any): void {
    this.settingsSidenav.toggle();
    this.isLoading = true;
    this.eventsService.save(value).subscribe(event => {
      this.events.push(event);
      this.isLoading = false;
    });
  }

  saveEdition(value: any): void {
    this.settingsSidenav.toggle();
    this.isLoading = true;
    this.editionsService.save(value).subscribe(edition => {
      this.editionAdded = edition;
      this.isLoading = false;
    });
  }
}
