import { Endereco } from "./endereco.model";

export interface Usuario {
    uid?: string,
    nome: string,
    sobrenome: string,
    email?: string,
    emailVerificado?: boolean,
    dataNasc: string,
    avatarUrl?: string,
    telefone: string,
    possuiLoja?: boolean,
    lojaId?: string,
    endereco: Endereco
}

