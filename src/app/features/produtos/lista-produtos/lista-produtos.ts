import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
  {nome: 'teclado Gamer', preco:49.99},
  {nome: 'Mouse Gamer', preco:29.99},
  {nome: 'monitor Gamer', preco:599.99},
  {nome: 'Desktop Gamer', preco:4999.99},
  {nome:'Headset Gamer', preco:699.99}
  ]);
  exibirProduto (nome: string){
    console.log ('produtoSelecionado: ', nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual =>[
      ...listaAtual, {nome:'Sony Playstation 5', preco: 100 }
    ]);

  }
}
