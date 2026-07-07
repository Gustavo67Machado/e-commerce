import { Component, signal } from '@angular/core';
//!import { RouterOutlet } from '@angular/router'; //Removee importação routeroutlat por não estar sendo usado no momento
import { Produto } from './components/produto/produto'; //importa o componente produto pa 
@Component({
  selector: 'app-root',
  imports: [Produto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}