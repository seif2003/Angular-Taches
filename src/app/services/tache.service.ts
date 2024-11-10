import { Injectable } from '@angular/core';
import { Tache } from '../model/tache.model';
import { Projet } from '../model/projet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjetWrapped } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { Image } from '../model/image.model';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  apiURL = 'http://localhost:8080/taches/api';
  apiURLProj = 'http://localhost:8080/taches/projet';

  taches!: Tache[];
  // projes! : Projet[];

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.projes = [{
    //     idProjet: 1,
    //     nomProjet: "Projet 1",
    //     description: "Description du projet 1",
    //     dateDebut: new Date("2024-09-28T15:02:38.000+00:00"),
    //     dateFin: new Date("2024-09-28T15:02:38.000+00:00"),
    // },
    // {
    //     idProjet: 2,
    //     nomProjet: "Projet 2",
    //     description: "Description du projet 2",
    //     dateDebut: new Date("2024-09-28T15:02:38.000+00:00"),
    //     dateFin: new Date("2024-09-28T15:02:38.000+00:00"),
    // }];

    // this.taches = [{
    //     idTache: 2,
    //     nomTache: "Develop Feature A",
    //     description: "Complete development of the new feature A",
    //     statut: "En cours",
    //     dateEcheance: new Date("2024-09-28T²15:02:38.000+00:00"),
    //     dateCreation: new Date("2024-09-28T15:02:38.000+00:00"),
    //     projet: {
    //       idProjet: 1,
    //       nomProjet: "Projet 1",
    //       description: "Description du projet 1",
    //       dateDebut: new Date("2024-09-28T15:02:38.000+00:00"),
    //       dateFin: new Date("2024-09-28T15:02:38.000+00:00"),
    //     }
    // },
    // {
    //     idTache: 3,
    //     nomTache: "Develop Feature Z",
    //     description: "Complete development of the new feature Z",
    //     statut: "En cours",
    //     dateEcheance: new Date("2024-09-28T16:06:39.000+00:00"),
    //     dateCreation: new Date("2024-09-28T16:06:39.000+00:00"),
    //     projet: {
    //       idProjet: 1,
    //       nomProjet: "Projet 1",
    //       description: "Description du projet 1",
    //       dateDebut: new Date("2024-09-28T15:02:38.000+00:00"),
    //       dateFin: new Date("2024-09-28T15:02:38.000+00:00"),
    //     }
    // },
    // {
    //     idTache: 4,
    //     nomTache: "Develop Feature Y",
    //     description: "Complete development of the new feature Y",
    //     statut: "En cours",
    //     dateEcheance: new Date("2024-09-28T16:10:32.000+00:00"),
    //     dateCreation: new Date("2024-09-28T16:10:32.000+00:00"),
    //     projet: {
    //       idProjet: 2,
    //       nomProjet: "Projet 2",
    //       description: "Description du projet 2",
    //       dateDebut: new Date("2024-09-28T15:02:38.000+00:00"),
    //       dateFin: new Date("2024-09-28T15:02:38.000+00:00"),
    //     }
    // }];
  }

  listeTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiURL + "/all");
  }

  ajouterTache(tache: Tache): Observable<Tache> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt,'Content-Type': 'application/json' })
    return this.http.post<Tache>(this.apiURL + "/addtache", tache);
  }


  supprimerTache(id: number) {
    const url = `${this.apiURL}/deltache/${id}`;
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url);
  }

  consulterTache(id: number): Observable<Tache> {
    const url = `${this.apiURL}/getbyid/${id}`;
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Tache>(url);
  }


  updateTache(tache: Tache): Observable<Tache> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt, 'Content-Type': 'application/json' })
    return this.http.put<Tache>(this.apiURL + "/updatetache", tache);
  }

  trierTaches() {
    this.taches = this.taches.sort((n1, n2) => {
      if (n1.idTache! > n2.idTache!) {
        return 1;
      }
      if (n1.idTache! < n2.idTache!) {
        return -1;
      }
      return 0;
    });
  }

  consulterProjet(id: number): Observable<Projet> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Projet>(`${this.apiURL}/proj/${id}`);
  }

  // listeProjets(): Observable<Projet[]> {
  //   return this.http.get<Projet[]>(`${this.apiURL}/proj`);
  // }

  listeProjets(): Observable<ProjetWrapped> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get<ProjetWrapped>(this.apiURLProj);
  }

  rechercherParProjet(id: number): Observable<Tache[]> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    const url = `${this.apiURL}/tachesprojet/${id}`;
    return this.http.get<Tache[]>(url);
  }

  rechercherParNom(nom: string): Observable<Tache[]> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    const url = `${this.apiURL}/tachesByName/${nom}`;
    return this.http.get<Tache[]>(url);
  }

  ajouterProjet(projet: Projet): Observable<Projet> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt,'Content-Type': 'application/json' })

    return this.http.post<Projet>(this.apiURLProj, projet);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageTache(file: File, filename: string, idTache: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageTache'}/${idTache}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, HttpOptions);
  }

  uploadImageFS(file: File, filename: string, idTache : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idTache}`;
    return this.http.post(url, imageFormData);
  }
  


}
