import { Endereco } from './endereco.model';

type Status = "aguardando" | "processado" | "aguardando envio" | "enviado" | "concluido";

export interface Pedido {
    id: string,
    lojaId: string,
    userId: string,
    status: Status,
    dataDoPedido: number, //UNIX FORMAT new Date().getTime()
    itens: ProdutoPedido[],
    precoTotal: number,
    enderecoDeEntrega: Endereco
}

interface ProdutoPedido {
    id: string,
    nome: string,
    descricao: string,
    preco: number,
    quantidade: number,
}