import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationsService } from '@app/registrations/services/registrations.service';

import { Edition } from '@app/editions/model/Edition.model';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.scss']
})
export class AddRegistrationComponent implements OnInit {
  @Input('edition') edition: Edition;
  @Output('addRegistration') addRegistration = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      edition: [this.edition._id, Validators.required],
      timingResult: ['00:00:00']
    });
  }

  save(): void {
    this.addRegistration.emit(this.form.value);
  }
}
