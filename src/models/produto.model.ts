export interface Produto {
    id: string,
    nome: string,
    descricao: string,
    emEstoque: number,
    icone: string,
    imagens?: string[],
    lojaId: number,
    preco: number,
    tipo: string
}