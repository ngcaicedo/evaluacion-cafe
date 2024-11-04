import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { Cafe } from './cafe';

@Injectable({
  providedIn: 'root'
})

export class CafeService {

  private getCafesUrl: string = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  getVariedadCafe(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(this.getCafesUrl);
  } 
}
