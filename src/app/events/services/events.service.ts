// General
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Models
import { Event } from '@app/events/model/Event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private httpClient: HttpClient) {}

  getEvents(): Observable<Array<Event>> {
    return this.httpClient
      .cache()
      .get('/events')
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not events'))
      );
  }

  save(data: any): Observable<Event> {
    return this.httpClient.post<Event>('/event', data);
  }
}
