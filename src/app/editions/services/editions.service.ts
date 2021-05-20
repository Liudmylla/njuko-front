// General
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Edition } from '@app/editions/model/Edition.model';

@Injectable({
  providedIn: 'root'
})
export class EditionsService {
  constructor(private httpClient: HttpClient) {}

  getEditions(eventId: string): Observable<Array<Edition>> {
    return this.httpClient.cache().get<Array<Edition>>('/editions/' + eventId);
  }

  save(data: any): Observable<Edition> {
    return this.httpClient.post<Edition>('/edition', data);
  }
}
