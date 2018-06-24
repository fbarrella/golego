import { AbstractControl } from '@angular/forms';
export class Validacoes {


    static siglasDosEstados() {
        return ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    }

    static emailPattern() {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    }

    static telefonePattern() {
        return /^\([1-9]{2}\)\s?(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
    }

    static cepPattern() {
        return /^\d{5}[-]\d{3}$/;
    }

    static validaSenha(group: AbstractControl): { [key: string]: boolean } {
        const senha = group.get('senha');
        const senhaConfirmacao = group.get('senha2');
        if (!senha || !senhaConfirmacao) {
            return undefined;
        }
        if (senha.value !== senhaConfirmacao.value) {
            return { senhaNaoConfere: true };
        }
        return undefined;
    }
}