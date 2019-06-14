import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PersonagensDataService } from '../personagens-data.service';
@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css'],
  providers: [PersonagensDataService]
})
export class PersonagensComponent implements OnInit, OnChanges {

  public personagens: any[] = [];
  public personagem: object = {};
  public pagina: number;
  public statusBusca: boolean;

  @Input() buscaPersonagem: string;

  constructor(private character: PersonagensDataService) { }

  ngOnInit() {
    this.resetTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.statusBusca = true;
    if (changes['buscaPersonagem'].currentValue !== "") {
      this.personagens = [];
      this.character.buscaPersonagem(this.buscaPersonagem).subscribe((res) => {
        const aux = res['data'].results;
        if (aux.length !== 0) {
          this.personagens.push({
            id: aux[0].id,
            name: aux[0].name,
            events: aux[0].events.items.slice(0, 3),
            series: aux[0].series.items.slice(0, 3),
            imagePath: aux[0].thumbnail.path + ".jpg"
          });
        }else{
          this.statusBusca = false;
        }
      });
    }
  }

  resetTable() {
    this.personagens = [];
    this.statusBusca = true;
    this.pagina = 149;
    this.character.getPersonagens(this.pagina).subscribe((res) => {
      const aux = res['data'].results;
      for (let i = 0; i < aux.length; i++) {
        this.personagens.push({
          id: aux[i].id,
          name: aux[i].name,
          events: aux[i].events.items.slice(0, 3),
          series: aux[i].series.items.slice(0, 3),
          imagePath: aux[i].thumbnail.path + ".jpg"
        });
      }
    });
  }

  proxPg() {
    this.personagens = [];
    this.character.getPersonagens(++this.pagina).subscribe((res) => {
      const aux = res['data'].results;
      for (let i = 0; i < aux.length; i++) {
        this.personagens.push({
          id: aux[i].id,
          name: aux[i].name,
          events: aux[i].events.items.slice(0, 3),
          series: aux[i].series.items.slice(0, 3),
          imagePath: aux[i].thumbnail.path + ".jpg"
        });
      }
    });
  }
  anterPg() {
    this.personagens = [];
    this.character.getPersonagens(--this.pagina).subscribe((res) => {
      const aux = res['data'].results;
      for (let i = 0; i < aux.length; i++) {
        this.personagens.push({
          id: aux[i].id,
          name: aux[i].name,
          events: aux[i].events.items.slice(0, 3),
          series: aux[i].series.items.slice(0, 3),
          imagePath: aux[i].thumbnail.path + ".jpg"
        });
      }
    });
  }

  infoPersonagem(id) {
    this.character.getPersonagem(id).subscribe((res) => {
      const aux = res['data'].results[0];
      this.personagem = {
        id: aux.id,
        name: aux.name,
        description: aux.description,
        events: aux.events.items.slice(0, 3),
        series: aux.series.items.slice(0, 3),
        comics: aux.comics.available,
        stories: aux.stories.available,
        imagePath: aux.thumbnail.path + ".jpg"
      };
    });
  }
}
