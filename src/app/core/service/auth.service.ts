import { Injectable, computed, signal, effect, PLATFORM_ID, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

type PerfilUsuario = 'admin' | 'usuario'; 

type Usuario = {
    email: string;
    perfil: PerfilUsuario;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {


    private usuario = signal<Usuario | null> (this.CarregarUsuarioSalvo());
    private tokenJwt = signal<string | null> (this.carregarTokenSalvo());


    usuarioLogado = computed(() => 
        this.usuario() !== null && this.tokenJwt() !== null
    );
    private estarNoNavegador(): boolean{
        return isPlatformBrowser(this.platformId)
    }
   
    
    private limparAuthSalvo(){}

    usuarioAtual = computed(() => this.usuario());
    estaLogado = computed(() => this.usuario() !== null);
    token = computed(() => this.tokenJwt());
    admin = computed(() => this.usuario()?.perfil ==='admin');

    //!==================== persistencia auth====================

    private platformId = inject(PLATFORM_ID);
    private readonly chaveUsuario = 'usuario-storage'
    private readonly chaveToken = 'token-storage';


    login (email: string, senha: string): boolean{
        if(!email || !senha){
            return false;
        }

        const perfil: PerfilUsuario = email === 'admin@email.com' ? 'admin' : 'usuario'

        const usuarioLogado: Usuario = {
            email,
            perfil,
        };

        const tokenSimulado = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiJhbHVub0B0ZXN0ZS5jb20iLCJwZXJmaWwiOiJ1c3VhcmlvIn0.' 
    +
    'assinatura-simulada';
    
    this.usuario.set({
        email, 
        perfil,
    });
    this.tokenJwt.set(tokenSimulado);
    this.usuario.set(usuarioLogado)
    this.salvarAutenticacao(usuarioLogado, tokenSimulado)
    //! VOLTAR DEPOIS
    return true;
}
logout(){
    this.usuario.set(null);
    this.tokenJwt.set(null);

    this.limparAutenticacaoSalva();
}
    obterToken(): string | null{
        return this.tokenJwt();
    }
    obterPerfil():PerfilUsuario | null {
        return this.usuario()?.perfil ?? null;
    }

private estaNoNavegador(): boolean{
    return isPlatformBrowser(this.platformId);
}

private CarregarUsuarioSalvo(): Usuario | null {
    if(!this.estarNoNavegador()){
        return null;
    }
    const dadosSalvos = localStorage.getItem(this.chaveUsuario);
    if(!dadosSalvos) {
        return null;
    }try{
        return JSON.parse(dadosSalvos) as Usuario
    }catch{
        return null;
    }
}
private carregarTokenSalvo(): string | null {
    if(!this.estarNoNavegador()){
        return null;
    }
    return localStorage.getItem(this.chaveToken);
    
}


    private salvarAutenticacao(usuario: Usuario, token: string){
    return;
    localStorage.setItem(this.chaveUsuario, JSON.stringify(usuario));
    localStorage.setItem(this.chaveToken, (token));
    }
    private limparAutenticacaoSalva(){
        if(!this.estarNoNavegador()){
            return;
        }

        localStorage.removeItem(this.chaveUsuario)
        localStorage.removeItem(this.chaveToken)
    
    }
}
