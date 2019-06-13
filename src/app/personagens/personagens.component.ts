import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent implements OnInit {

  public ts = Math.floor((Math.random() * 10) + 1).toString();
  public key = "b05e345a0fcf7ad6f7c0709368c95f38";
  public hash = this.ts + "fadb7f42842c4237c97786162f89492949f23170" + this.key;
  public md5 = new Md5().appendStr(this.hash).end();
  public url = "http://gateway.marvel.com/v1/public/characters?ts=" + this.ts + "&apikey=" + this.key + "&hash=" + this.md5 + "&limit=100&offset=0";

  public personagens = [];

  getRecipes() {
    this.httpClient.get(this.url, {
      observe: "body",
      responseType: "json"
    }).subscribe((res) => {
      const aux = res['data'].results;
      for (let i = 0; i < aux.length; i++) {
        this.personagens.push({
          name: aux[i].name,
          description: aux[i].description,
          events: aux[i].events.items.slice(0, 3),
          series: aux[i].series.items.slice(0, 3),
          comics: aux[i].comics.available,
          stories: aux[i].stories.available,
          imagePath: aux[i].thumbnail.path + ".jpg"
        });
        
      }
      console.log(this.personagens);
      // console.log(res['data'].results[0].series.items.slice(0, 3)[0].name);
    });
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getRecipes();
  }



}
