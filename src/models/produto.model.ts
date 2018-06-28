export interface Produto {
    prodId: string,
    nome: string,
    descricao: string,
    emEstoque: number,
    icone: string,
    imagens?: string[],
    lojaId: string,
    preco: number,
    tipo: string
}