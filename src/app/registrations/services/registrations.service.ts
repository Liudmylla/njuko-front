// General
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Registration } from '@app/registrations/model/Registration.model';
import { Event } from '@app/events/model/Event.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {
  constructor(private httpClient: HttpClient) {}

  getRegistrations(editionId: string): Observable<Array<Registration>> {
    return this.httpClient
      .cache()
      .get<Array<Registration>>('/registrations/' + editionId)
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not registrations'))
      );
  }

  editRegistration(
    registrationId: string,
    data: any
  ): Observable<Registration> {
    return this.httpClient.patch<Registration>(
      '/registration/edit/' + registrationId,
      data
    );
  }

  deleteRegistration(registration: Registration): Observable<Registration> {
    return this.httpClient.delete<Registration>(
      '/registration/delete/' + registration._id
    );
  }

  save(data: any): Observable<Registration> {
    return this.httpClient.post<Registration>('/registration', data);
  }
}
