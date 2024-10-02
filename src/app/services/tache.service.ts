import { Injectable } from '@angular/core';
import { Tache } from '../model/tache.model';
import { Projet } from '../model/projet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjetWrapped } from '../model/categorieWrapped.model';

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

  taches! : Tache[];
  // projes! : Projet[];

  constructor(private http: HttpClient) { 
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
    return this.http.get<Tache[]>(this.apiURL);
  }

  ajouterTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.apiURL, tache, HttpOptions);
  }

  supprimerTache(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, HttpOptions);
  }

  consulterTache(id: number): Observable<Tache> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Tache>(url);
  }

  updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(this.apiURL, tache, HttpOptions);
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
    return this.http.get<Projet>(`${this.apiURL}/proj/${id}`);
  }

  // listeProjets(): Observable<Projet[]> {
  //   return this.http.get<Projet[]>(`${this.apiURL}/proj`);
  // }

  listeProjets(): Observable<ProjetWrapped> {
    return this.http.get<ProjetWrapped>(this.apiURLProj);
  }

}
