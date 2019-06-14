import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  usuario: string = 'Ernany Daniel de Carvalho Gonçalves';
  personagemInput: string = "";

  public buscar(nome: string) {
    this.personagemInput = nome;
  }
}
