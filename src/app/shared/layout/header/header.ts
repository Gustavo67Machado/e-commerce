import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CarrinhoService } from '../../../core/service/carrinho.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';



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
  
  private authService = inject(AuthService)
  usuarioLogado = this.authService.usuarioLogado;
  usuarioAtual = this.authService.usuarioAtual;
  
  private router = inject(Router)
  
  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
