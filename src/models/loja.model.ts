import { Endereco } from './endereco.model';

export interface Loja {
    id: string,
    usuarioId: string,
    nome: string,
    descricao: string,
    documento: string,
    telefone: string,
    ativa: boolean,
    email: string,
    avatarUrl?: string,
    website?: string,
    endereco: Endereco
}