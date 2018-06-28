import { Produto } from './../models/produto.model';

export const PRODUTOS: Produto[] = [
    {
        id: "AAAAA",
        nome: 'Bode Brown',
        descricao: 'Cerveja Show de Bola',
        emEstoque: 3,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        imagens: [
            'teste',
            'teste'
        ],
        lojaId: 11,
        preco: 21,
        tipo: 'Pale Ale'
    },
    {
        id: "AAAAA",
        nome: 'Biritis',
        descricao: 'Cerveja do Mussum',
        emEstoque: 2,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        imagens: [
            'teste2',
            'teste2'
        ],
        lojaId: 4,
        preco: 17,
        tipo: 'Lager'
    },
    {
        id: "AAAAA",
        nome: 'Vedette',
        descricao: 'Cerveja alemã',
        emEstoque: 7,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        imagens: [
            'teste3',
            'teste3'
        ],
        lojaId: 1,
        preco: 30,
        tipo: 'Witbier'
    },
    {
        id: "AAAAA",
        nome: 'Colorado',
        descricao: 'Cerveja do urso',
        emEstoque: 1,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        imagens: [
            'teste4',
            'teste4'
        ],
        lojaId: 5,
        preco: 13,
        tipo: 'Indian Pale Ale'
    }
];