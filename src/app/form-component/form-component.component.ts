import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { charData } from '../interfaces/charData';
import { locationData } from '../interfaces/locationData';
import { episodeData } from '../interfaces/episodeData';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  characters: charData[] = [];
  character: any;
  locations: locationData[] = [];
  episodes: episodeData[] = [];
  charId: string = '';
  displayedColumns: string[] = [ "image", "id", "name", "status", "species", "type", "gender", "actions"];
  displayedColumnsLocation: string[] = ["id", "name", "type", "dimension", "residents"];
  displayedColumnsEpisode: string[] = ["name", "air_date", "episode"];
  dataSource!: MatTableDataSource<charData>;
  dataSourceLocation!: MatTableDataSource<locationData>;
  dataSourceEpisodes!: MatTableDataSource<episodeData>;

  constructor(public dataService: DataserviceService) { }

  ngOnInit(): void {

  }

  getCharacterById(id: string){
    return this.dataService.getCharacter(id).subscribe((res: any) => {
      let filteredData: any = {
        id: res.id,
        name: res.name,
        status: res.status,
        species: res.species,
        type: res.type,
        gender: res.gender,
        origin: {
          name: res.origin.name,
          url: res.origin.url
        },
        location: {
          name: res.location.name,
          url: res.location.url
        },
        image: res.image,
        episode: []
      }
      filteredData.episode = res.episode;
      this.character = filteredData;
      this.characters.push(this.character);
      this.dataSource = new MatTableDataSource(this.characters);
      localStorage.setItem('charInfo', JSON.stringify(res));
    });
  }

  seeLocation(id: string){
    return this.dataService.getLocalization(id).subscribe((res: any) => {
      let filteredLocation: any = {
        id: res.id,
        name: res.name,
        type: res.type,
        dimension: res.dimension,
        residents: []
      }
      let filteredResidents = res.residents.forEach((x: any)  => this.dataService.getCharacterUrl(x).subscribe((res: any) => filteredLocation.residents.push(res.name))) ?? "No residents";
      this.locations.push(filteredLocation);
      this.dataSourceLocation = new MatTableDataSource(this.locations);
      localStorage.setItem('locationInfo', JSON.stringify(res));
    })
  }

  getEpisodeId(episode: string[]){

    let randomIndex = Math.floor(Math.random() * episode.length);
    let randomEpisode = episode.filter((epi, index) => index === randomIndex);
    
    return this.dataService.getEpisode(randomEpisode).subscribe((res: any) => {
      let filteredEpisodes: any = {
        name: res.name,
        air_date: res.air_date,
        episode: res.episode
      }
      if(filteredEpisodes){
        this.episodes.push(filteredEpisodes); 
      }
      this.dataSourceEpisodes = new MatTableDataSource(this.episodes);
      localStorage.setItem('episodesInfo', JSON.stringify(res));
    });
  }


}
