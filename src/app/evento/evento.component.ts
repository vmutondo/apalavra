import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../evento';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseStorage } from '@firebase/storage-types';
import { AngularFireStorage } from 'angularfire2/storage';
import {EventoService} from '../evento.service';





@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})


export class EventoComponent implements OnInit {
  toUpdate: Evento;

  selectedFiles: FileList | null;
  currentUpload: Evento;

  eventosCollection: AngularFirestoreCollection<Evento>;
  eventosDoc: AngularFirestoreDocument<Evento>;
  eventos: Observable<Evento[]>;

  itemToUpdate: Evento;
  imagemUpload: string;
  // eventos: Evento[];
  evento: any = {};
  eventonovo: any = {
    titulo: '',
    descricao: '',
    data_evento: '',
    imagem: '',
  };

 

  constructor(private afs: AngularFirestore, private up: AngularFireStorage, private ev: EventoService) {
  
}




  ngOnInit() {
    // this.getEventos();
    this.eventosCollection = this.afs.collection('eventos');

    //this.eventos = this.eventosCollection.valueChanges()
    this.eventos = this.eventosCollection.snapshotChanges().map(arr => {
      return arr.map(a => {
        const data = a.payload.doc.data() as Evento;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }


  deletar(evento: Evento) {

    this.eventosDoc = this.afs.doc(`eventos/${evento.id}`);
    this.eventosDoc.delete();
  }

  editar(evento) {
    //this.eventosDoc = this.afs.doc(`eventos/${evento.id}`);
    //this.evento = this.eventosDoc;
    this.evento = evento;
  }
// update evento
updateEvento(evento) {
  // this.upSvc.updateevento(evento);
  const file = this.selectedFiles;
  const updateEvento = {
      titulo: evento.titulo,
      descricao: evento.descricao,
      data_evento: new Date(evento.data_evento)
  };
  if (file && file.length === 1) {
      // update also the image
      // this.currentevento = new evento(file.item(0));
      // this.upSvc.pushevento(this.currentevento, newevento);
      // this.selectedFiles = null;
      console.log('new file found');
      this.toUpdate = new Evento(file.item(0));
      this.ev.updateWithImage(evento, this.toUpdate, updateEvento);
  } else {
      // update only realtime db
      console.error('No file found');
      console.log(updateEvento);
      
      this.ev.updateData(evento.id, updateEvento);
  }
}



  uploadImage($event: Event) {
    //console.log("detect image")
    this.selectedFiles = ($event.target as HTMLInputElement).files;
    //console.log(this.selectedFiles)
  }

  adicionar(evento): void {
    this.eventonovo = evento;
    console.log(evento);
    
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Evento(file.item(0));

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${'eventos'}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot
        },
        (error) => {
          // fail
          console.log(error)
        },
        () => {

          // success
          if (uploadTask.snapshot.downloadURL) {
              this.currentUpload.titulo = evento.titulo,
              this.currentUpload.data_evento = new Date(evento.data_evento),
              this.currentUpload.descricao = evento.descricao,
              this.currentUpload.imagem = uploadTask.snapshot.downloadURL;
              this.saveFileData(this.currentUpload);
          }

        });
    }

  }

  private saveFileData(evento) {
   // console.log(evento.data_evento)
    this.afs.collection("eventos").add({
      titulo: evento.titulo,
      descricao:  evento.descricao,
     data_evento: evento.data_evento,
     imagem: evento.imagem
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  clean() {
    this.eventonovo = {
      titulo: '',
      descricao: '',
      data: '',
      imagem: '',
    };
  }



}
