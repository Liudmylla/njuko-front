// General
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

// Store
import { Store } from '@ngrx/store';
import { State } from '@app/store/edition';
import { SelectEdition } from '@app/store/edition/actions/edition.actions';

// Models
import { Event } from '@app/events/model/Event.model';
import { Edition } from '@app/editions/model/Edition.model';

// Services
import { EditionsService } from '@app/editions/services/editions.service';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditionsComponent implements OnInit, OnChanges {
  @Input('event') event: Event;
  @Input('editionAdded') editionAdded: Edition;

  editions: Array<Edition> = [];

  constructor(
    private store: Store<State>,
    public editionsService: EditionsService
  ) {}

  ngOnInit(): void {
    this.editionsService.getEditions(this.event._id).subscribe(editions => {
      this.editions = editions;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editionAdded) {
      if (
        changes.editionAdded.currentValue &&
        changes.editionAdded.currentValue.event === this.event._id
      ) {
        this.editions.unshift(changes.editionAdded.currentValue);
      }
    }
  }

  selectEdition(edition: Edition): void {
    this.store.dispatch(new SelectEdition(edition));
  }
}
