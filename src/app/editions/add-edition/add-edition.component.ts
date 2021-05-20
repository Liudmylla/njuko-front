// General
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { Event } from '@app/events/model/Event.model';

@Component({
  selector: 'app-add-edition',
  templateUrl: './add-edition.component.html',
  styleUrls: ['./add-edition.component.scss']
})
export class AddEditionComponent implements OnInit {
  @Input('event') event: Event;
  @Output('saveEdition') saveEdition = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      event: [this.event._id, Validators.required],
      year: ['', Validators.required]
    });
  }

  save(): void {
    this.saveEdition.emit(this.form.value);
  }
}
