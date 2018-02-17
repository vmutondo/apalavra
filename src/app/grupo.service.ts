import { Injectable, group } from '@angular/core';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Evento} from './evento';
import { AngularFirestore } from 'angularfire2/firestore';
import {Grupo} from './grupo';

@Injectable()
export class GrupoService {

  constructor(private afs: AngularFirestore) { }



 // update image if a file is detected and realtimedb
    // This method updates both file/image and realtime db data
    /**
     *
     * @param quadro
     * @param updateFile
     * @param updatedQuadro
     *
     * Workflow:
     *      1: Delete current profile photo.
     *      2. Push the new image to firestorage.
     *      3. update the Object url with the new image.
     *      4. update realtime db.
     */
    updateWithImage(grupo, updateFile, updateGrupo) {
      // first delete the current image/file being used
      this.deleteFileStorage(grupo.imagem);
      // push the new image/file
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${'grupos'}/${updateFile.file.name}`).put(updateFile.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
              // upload in progress
              const snap = snapshot;
          },
          (error) => {
              // upload failed
              console.log(error);
          },
          () => {
              // upload success
              if (uploadTask.snapshot.downloadURL) {
                updateGrupo.titulo = grupo.nome_lider,
                updateGrupo.contacto = grupo.contacto,
                updateGrupo.encontro = grupo.encontro,
                updateGrupo.nome_universidade = grupo.nome_universidade.nome,
                updateGrupo.imagem = uploadTask.snapshot.downloadURL;
                this.updateFireData(grupo.id, updateGrupo);
                  return;
              } else {
                  console.error('No download URL!');
              }
          },
      );
  }

  // update realtime db only: if there's no new file found
  updateData(id, updateGrupo) {
      this.updateFireData(id, updateGrupo);
  }

  private updateFireData(id, grupo) {
    var eventosRef = this.afs.collection("grupos").doc(id);

    // Set the "capital" field of the city 'DC'
   // console.log(evento);
    return eventosRef.update(grupo)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }



  // Writes the file details to the firestore
  private saveFileData(grupo) {
    this.afs.collection("grupos").add({
      nome_lider : grupo.nome_lider,
      contacto: grupo.contacto,
      encontro: grupo.encontro,
      nome_universidade:grupo.nome_universidade,
      imagem: grupo.imagem
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
  }



  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
      const storageRef = firebase.storage().ref();
      storageRef.child(`${'grupos'}/${name}`).delete();
  }

}