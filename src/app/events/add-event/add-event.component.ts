import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventsService } from '@app/events/services/events.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Output('saveEvent') saveEvent = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    public eventsService: EventsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  save(): void {
    this.saveEvent.emit(this.form.value);
  }
}
