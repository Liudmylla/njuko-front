// General
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

// Store
import { Store } from '@ngrx/store';
import { State } from '@app/store/edition';
import { getEdition } from '@app/store/edition/selectors/edition.selectors';

// Services
import { RegistrationsService } from '@app/registrations/services/registrations.service';

// Models
import { Registration } from '@app/registrations/model/Registration.model';
import { Edition } from '@app/editions/model/Edition.model';

// @ts-ignore
@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationsComponent implements OnInit, OnDestroy {
  registrations: Array<Registration>;
  selectedRegistration: Registration;
  edition: Edition;
  action: string;
  isLoading: boolean;
  gender: string = 'all';

  @ViewChild('settingsSidenav', { static: false }) settingsSidenav: any;

  constructor(
    private store: Store<State>,
    private registrationsService: RegistrationsService
  ) {}

  ngOnInit(): void {
    this.store.select(getEdition).subscribe(edition => {
      if (edition) {
        this.edition = edition;
        this.registrationsService
          .getRegistrations(edition._id)
          .subscribe(registrations => (this.registrations = registrations));
      }
    });
  }

  ngOnDestroy(): void {}

  editRegistration(registration: Registration): void {
    this.selectedRegistration = registration;
    console.log(this.selectedRegistration);
    this.settingsSidenav.toggle();
    this.action = 'editRegistration';
  }

  saveRegistration(registration: Registration): void {
    this.selectedRegistration = null;
    this.registrationsService
      .editRegistration(registration._id, registration)
      .subscribe(newRegistration => {
        const findIndex = this.registrations.findIndex(
          reg => reg._id === newRegistration._id
        );

        if (findIndex !== -1) {
          this.registrations[findIndex] = newRegistration;
        } else {
          this.registrations.push(newRegistration);
        }
      });
    this.settingsSidenav.toggle();
  }

  deleteRegistration(registration: Registration) {
    this.registrationsService
      .deleteRegistration(registration)
      .subscribe(registration => {
        this.registrations = this.registrations.filter(
          r => r._id !== registration._id
        );
      });
  }

  newRegistration(edition: Edition) {
    this.settingsSidenav.toggle();
    this.edition = edition;
    this.action = 'newRegistration';
  }
  addRegistration(data: any): void {
    this.settingsSidenav.toggle();
    this.isLoading = true;
    this.registrationsService.save(data).subscribe(registration => {
      this.registrations.push(registration);
      this.isLoading = false;
    });
  }

  sortResult(array: Array<Registration>) {
    function timeToSeconds(result: string): number {
      let n = result
        .split('')
        .filter(x => x != ':')
        .map(x => parseInt(x));
      if (n.length != 6) {
        n.unshift(0);
      }
      return (
        (n[0] * 10 + n[1]) * 3600 + (n[2] * 10 + n[3]) * 60 + (n[4] * 10 + n[5])
      );
    }
    this.registrations.sort((a, b) => {
      let result_a = timeToSeconds(a.timingResult);
      let result_b = timeToSeconds(b.timingResult);
      if (result_a < result_b) return -1;
      if (result_a > result_b) return 1;
      return 0;
    });
  }

  all(registrations: Array<Registration>) {
    this.store.select(getEdition).subscribe(edition => {
      if (edition) {
        this.edition = edition;
        this.registrationsService
          .getRegistrations(edition._id)
          .subscribe(registrations => (this.registrations = registrations));
      }
    });
  }

  homme(registrations: Array<Registration>) {
    return (this.registrations = this.registrations.filter(
      r => r.gender === 'M'
    ));
  }

  femme(registrations: Array<Registration>) {
    return (this.registrations = this.registrations.filter(
      r => r.gender === 'F'
    ));
  }
}
