import { AbstractControl } from '@angular/forms';
export class Validacoes {


    static siglasDosEstados() {
        return ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    }

    static categorias() {
        return ["Pilsen", "American Lager", "Premium Lager", "Helles", "Dortmunder Export", "Dry Beer", "Munich Dunkel", "American Dark Lager", "Malzibier", "Schwarzbier", "Dunkless Bock", "Doppelbock", "Helles Bock", "Vienna", "Marzen Lager", "American Pale Ale", "English Pale Ale", "American Amber Ale", "American Strong Ale", "Weizenbier", "Hefeweizen", "Dunkelweizen", "Weizenbock", "Witbier", "Berliner Weisse", "Stout", "Lambic", "Outros"];
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

    static validaCNPJ(group: AbstractControl): { [key: string]: boolean } {
        let cnpj = group.get('documento').value;
        if (!cnpj) {
            return undefined;
        }
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj == '') return { cnpjInvalido: true };
        if (cnpj.length != 14) return { cnpjInvalido: true };
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return { cnpjInvalido: true };

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return { cnpjInvalido: true };

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return { cnpjInvalido: true };
        return undefined;
    }
}