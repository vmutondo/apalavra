export class Grupo{
    id?:string;
nome_lider:string;
contacto:number;
encontro:string;//ex.:quinta-feira pelas 15h
//descricao:string;
nome_universidade:string;
imagem:string;
file:File;


constructor(file:File){
    this.file = file;

}

}