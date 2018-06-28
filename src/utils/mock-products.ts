import { Produto } from './../models/produto.model';

export const PRODUTOS: Produto[] = [
    {
        nome: 'Bode Brown',
        descricao: 'Cerveja Show de Bola', 
        emEstoque: 3,
        icone: 'teste',
        imagens: [
            'teste',
            'teste'
        ],
        lojaId: 11,
        preco: 21,
        tipo: 'Pale Ale'
    },
    {
        nome: 'Biritis',
        descricao: 'Cerveja do Mussum', 
        emEstoque: 2,
        icone: 'teste2',
        imagens: [
            'teste2',
            'teste2'
        ],
        lojaId: 4,
        preco: 17,
        tipo: 'Lager'
    },
    {
        nome: 'Vedette',
        descricao: 'Cerveja alemã', 
        emEstoque: 7,
        icone: 'teste3',
        imagens: [
            'teste3',
            'teste3'
        ],
        lojaId: 1,
        preco: 30,
        tipo: 'Witbier'
    },
    {
        nome: 'Colorado',
        descricao: 'Cerveja do urso', 
        emEstoque: 1,
        icone: 'teste4',
        imagens: [
            'teste4',
            'teste4'
        ],
        lojaId: 5,
        preco: 13,
        tipo: 'Indian Pale Ale'
    }
];