import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  getCharacter(id: string){
    return this.http.get(`https://rickandmortyapi.com/api/character/${id}`);
  }

  getCharacterUrl(url: string){
    return this.http.get(`${url}`);
  }

  getLocalization(id: string){
    return this.http.get(`https://rickandmortyapi.com/api/location/${id}`);
  }

  getEpisode(url: any){
    // return this.http.get(`https://rickandmortyapi.com/api/episode/${id}`);
    return this.http.get(`${url}`);
  }

}
