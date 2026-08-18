import { HttpInterceptorFn } from "@angular/common/http";
import {tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFacade } from "../facedes/auth.facade";

export const httpInterceptor: HttpInterceptorFn = (req, next) =>{
    const authFacade = inject(AuthFacade);
    const router = inject (Router);

    //! Novo metodo de TOKEN
    const token = authFacade.obterToken();

//!requisição de log
    console.log('Interceptando requisição: ', req.url);
//! Toke
    const novaReq = token ?
req.clone ({
    setHeaders:{
        Authorization: `Bearer  ${token}` 
    },
}):req; 
//!NOVA REQUISIÇÃO + RESPOSTA DE LOG

    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('RESPONDE: ', event),
            error: (error) =>console.log('ERRO: ', error)
        }),

        catchError((error) => {
            console.error('ERRO GLOBAL:', error);
            if (error.status === 401){
                console.warn('Não Autorizado!');
                authFacade.usuarioLogado();
                router.navigateByUrl('/login');
            
            }
            if(error.status ===403){
                console.warn('acesso negado, perfil sem permissão!');
                router.navigateByUrl('/produtos')
            }
            if(error.status === 500){
                console.warn('Erro Interno do servidor!');
            }
            return throwError(() => error);
        }),
    );
};