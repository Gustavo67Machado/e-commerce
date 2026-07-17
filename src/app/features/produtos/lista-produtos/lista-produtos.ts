import { Component,} from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe,],
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
    //console.log ('produtoSelecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual =>[
      ...listaAtual, {nome:'Sony Playstation 5', preco: 100 }
    ]);
//criado uma fun~ção para calcular a quantidade de produtos
  }
totalProdutos = computed(() => this.produtos().length);
valorTotal = computed(()=> { return this.produtos().reduce((total, item)=> total + item.preco,0)});
substituirProdutos (){
  this.produtos.set([
    {nome: 'Arroz Fazenda', preco: 400},
    {nome: 'café grão de ouro', preco: 35.99},
  ]);
  //criado uma função que vai somar todos os preços
}
constructor(){
  effect(() =>{
    console.log('Lista de Produtos Alterados: ', this.produtos());
  });
  effect(() => {
    console.log('Valor total atualizado: ', this.valorTotal());
  });
  effect(()=> {
if(typeof document !== 'undefined') {
          document.title = `(${this.totalProdutos()})Minha Loja`;
}
  });
 }
 produtoSelecionado = signal<string | null>(null);
}