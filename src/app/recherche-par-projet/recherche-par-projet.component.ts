import { Component } from '@angular/core';
import { Projet } from '../model/projet.model';
import { Tache } from '../model/tache.model';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-recherche-par-projet',
  templateUrl: './recherche-par-projet.component.html',
  styleUrl: './recherche-par-projet.component.css'
})
export class RechercheParProjetComponent {
    IdProjet!: number;
    projets!: Projet[];
    taches!: Tache[];  

    constructor(private tacheService : TacheService) { }
  
    ngOnInit() { 
      this.tacheService.listeProjets().subscribe(projets => {
        this.projets = projets._embedded.projets;
        console.log(this.projets);
      });
    }

    onChange(){
        this.tacheService.rechercherParProjet(this.IdProjet).subscribe(taches => {
            this.taches = taches;
            console.log(this.taches);
          });
    }

}
