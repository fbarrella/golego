import { Produto } from './../models/produto.model';

export const PRODUTOS: Produto[] = [
    {
        prodId: '1',
        nome: 'Bode Brown',
        descricao: 'Cerveja Show de Bola',
        emEstoque: 3,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        imagens: [
            'teste',
            'teste'
        ],
        lojaId: '1',
        preco: 21,
        tipo: 'Pale Ale'
    },
    {
        prodId: '2',
        nome: 'Biritis',
        descricao: 'Cerveja do Mussum',
        emEstoque: 2,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        imagens: [
            'teste2',
            'teste2'
        ],
        lojaId: '1',
        preco: 17,
        tipo: 'Lager'
    },
    {
        prodId: '3',
        nome: 'Vedette',
        descricao: 'Cerveja alemã',
        emEstoque: 7,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        lojaId: '2',
        preco: 30,
        tipo: 'Witbier'
    },
    {
        prodId: '4',
        nome: 'Colorado',
        descricao: 'Cerveja do urso',
        emEstoque: 1,
        icone: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        lojaId: '3',
        preco: 13,
        tipo: 'Indian Pale Ale'
    }
];