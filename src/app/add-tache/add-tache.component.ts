import { Component } from '@angular/core';
import { Tache } from '../model/tache.model';
import { TacheService } from '../services/tache.service';
import { Projet } from '../model/projet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrl: './add-tache.component.css'
})
export class AddTacheComponent {

  newTache = new Tache();
  projets!: Projet[]; 
  newIdProjet!: number;
  newProjet!: Projet;

  constructor(private tacheService : TacheService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.tacheService.listeProjets().subscribe(projets => {
      this.projets = projets._embedded.projets;
      console.log(this.projets);
    });
  }

  addTache() {
    this.newTache.projet = this.projets.find(p => p.idProjet == this.newIdProjet)!;
    this.tacheService.ajouterTache(this.newTache).subscribe(tache => {
      console.log(tache);
      this.router.navigate(['taches']);
    });
  }

}
