export interface Usuario {
    uid: string,
    nome: string,
    sobrenome: string,
    dataNasc: Date,
    avatarUrl?: string,
    telefone: string,
    possuiLoja: boolean,
}