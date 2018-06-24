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
    endereco: Endereco
}

export interface Endereco {
    bairro: string,
    cidade: string,
    complemento?: string,
    rua: string,
    estado: string,
    cep: string
}