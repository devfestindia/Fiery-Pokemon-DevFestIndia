import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PokemonList {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  list(page: number = 0, limit: number = 20): Observable<Array<any>> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${limit}`)
      .pipe(
        map((response: any) => response.results)
      );
  }

  details(id): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  about(id: string): Observable<any> {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }
}
