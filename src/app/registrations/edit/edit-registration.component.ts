// General
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { Registration } from '@app/registrations/model/Registration.model';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss']
})
export class EditRegistrationComponent implements OnInit, OnChanges {
  @Input('registration') registration: Registration;
  @Output('saveRegistration') saveRegistration = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.registration) {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      _id: [this.registration._id, Validators.required],
      newBibNumber: [this.registration.bibNumber],
      bibNumber: [this.registration.bibNumber, Validators.required],
      gender: [this.registration.gender, Validators.required],
      firstName: [this.registration.firstName, Validators.required],
      lastName: [this.registration.lastName, Validators.required],
      birthDate: [this.registration.birthDate, Validators.required],
      timingResult: [this.registration.timingResult, Validators.required]
    });
  }

  save(): void {
    this.saveRegistration.emit(this.form.value);
  }
}
