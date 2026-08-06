import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarrinhoService } from '../../../core/service/carrinho.service';
CarrinhoService

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, RouterLink, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Lucia Santa';
  private carrinhoService = inject(CarrinhoService);
  quantidade = this.carrinhoService.quantidadedeItens;
}
