import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class PersonagensDataService {

  public ts = Math.floor((Math.random() * 10) + 1).toString();
  public key = "b05e345a0fcf7ad6f7c0709368c95f38";
  public hash = this.ts + "fadb7f42842c4237c97786162f89492949f23170" + this.key;
  public md5 = new Md5().appendStr(this.hash).end();
  
  constructor(private httpClient: HttpClient) { }

  buscaPersonagem(nome:string){
    let url = "http://gateway.marvel.com/v1/public/characters?ts=" + this.ts + "&apikey=" + this.key + "&hash=" + this.md5 + "&name="+nome;
    
    return this.httpClient.get(url, {
      observe: "body",
      responseType: "json"
    });
  }

  getPersonagens(pagina: number) {
    let url = "http://gateway.marvel.com/v1/public/characters?ts=" + this.ts + "&apikey=" + this.key + "&hash=" + this.md5 + "&limit=10&offset=" + (pagina * 10);
    return this.httpClient.get(url, {
      observe: "body",
      responseType: "json"
    });
  }
  getPersonagem(id: number) {
    let url = "http://gateway.marvel.com/v1/public/characters/" + id + "?ts=" + this.ts + "&apikey=" + this.key + "&hash=" + this.md5;
    return this.httpClient.get(url, {
      observe: "body",
      responseType: "json"
    });
  }
}
