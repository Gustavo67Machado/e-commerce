import { Injectable } from "@angular/core";
import { inject } from "@angular/core";
import { CarrinhoService } from "../service/carrinho.service";
import { ItemCarrinho } from "../models/item-carrinho";


@Injectable({providedIn:'root'})

export class CarrinhoFacade {

    private carrinhoService = inject(CarrinhoService);

    itensCarrinho = this.carrinhoService.itens;
    quantidadeCarrinho = this.carrinhoService.quantidadedeItens;
    totalCarrinho = this.carrinhoService.totalItens;
    carrinhoVazio = this.carrinhoService.carrinhoVazio;   

    adicionarProdutoCarrinho(produto:ItemCarrinho){
        this.carrinhoService.adicionar(produto);
    }

    limparCarrinho(){
        this.carrinhoService.limpar();
    }

    removerItem(rmvItem:number){
        this.carrinhoService.removerItens(rmvItem);
    }
}