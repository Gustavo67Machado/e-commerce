import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";
import { Produto } from "../../features/produtos/produto/produto";



@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    //!estado Global
    private carrinho = signal<{nome: string; preco: number}[]>([]);
    //? Selectores
    itens = computed(()=> this.carrinho());
    quantidadedeItens = computed(() => this.carrinho().length); //!Quantidade de itens
    totalItens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco,0)
);
// TODO: Ações
adicionar(Produto: {nome: string; preco: number}){
    this.carrinho.update(Lista => [...Lista,Produto]);

}
limpar(){
    this.carrinho.set([]);
}
}