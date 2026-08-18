import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facedes/auth.facade';
import { CarrinhoFacade } from '../../../core/facedes/carrinho.facade';



@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, RouterLink, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Lucia Santa';
  
  private carrinhoFacade = inject(CarrinhoFacade);
  quantidade = this.carrinhoFacade.quantidadeCarrinho;
  
  private authFacade = inject(AuthFacade)
  usuarioLogado = this.authFacade.usuarioLogado;
  usuarioAtual = this.authFacade.usuarioAtual;
  
  private router = inject(Router)
  
  sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login')
  }
}
