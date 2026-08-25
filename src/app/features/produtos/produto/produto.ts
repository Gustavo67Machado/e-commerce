//fluxo de dados criados 
import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButton} from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardActions,MatCardTitle } from "@angular/material/card";
import { ItemCarrinho } from '../../../core/models/item-carrinho';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButton, MatCard, MatCardContent, MatCardHeader, MatCardActions, MatCardTitle],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {

  //Entrada de dados de Lista-produtos
  @Input() nome: string = '';
  @Input() preco: number = 0;
  
  //Saida de dados para produtos selecionados para lista produto
  @Output() produtoSelecionado = new EventEmitter<string>();
  selecionarProduto() {
    this.produtoSelecionado.emit(this.nome);
  }
  @Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();
  adicionarAoCarrinho() {
    this.produtoAdicionado.emit(({nome: this.nome, preco: this.preco}))
  }

//=========função=============
adicionarFavorito(produto: any) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

  const jaExiste = favoritos.some((item: any) => item.id === produto.id);

  if (!jaExiste) {
    favoritos.push(produto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
}


}
