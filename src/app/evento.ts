
export class Evento {
   id? :String;
   titulo: string;
   descricao:string;
    //static readonly DATE_FMT = 'dd/MMM/yyyy';
  data_evento: Date;
  imagem:string;
  file:File;

   constructor(file:File){
       this.file = file;
   }

}