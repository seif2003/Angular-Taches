import { Component } from '@angular/core';
import { TacheService } from '../services/tache.service';
import { Projet } from '../model/projet.model';

@Component({
  selector: 'app-liste-projes',
  templateUrl: './liste-projes.component.html',
  styleUrl: './liste-projes.component.css'
})
export class ListeProjesComponent {
  projets!: Projet[];

  ajout: boolean = true;

  updatedProjet : Projet = {"idProjet": 0, "nomProjet": "", "description": "", "dateDebut": new Date(), "dateFin": new Date()};

  constructor(private tacheService: TacheService,) { }

  ngOnInit() {
    this.chargerProjets();
  }

  projetUpdated(projet: Projet) {
    this.tacheService.ajouterProjet(projet).subscribe( () => this.chargerProjets())
    this.updatedProjet = {"idProjet": 0, "nomProjet": "", "description": "", "dateDebut": new Date(), "dateFin": new Date()};
  }

  chargerProjets() {
    this.tacheService.listeProjets().subscribe(projets => {
      this.projets = projets._embedded.projets;
      console.log(this.projets);
    });
  }

  updateProjet(projet: Projet) {
    console.log(projet);
    this.updatedProjet = projet;
    this.ajout = false;
  }

  onCancel() {
    this.ajout = true;
    this.updatedProjet = {"idProjet": 0, "nomProjet": "", "description": "", "dateDebut": new Date(), "dateFin": new Date()};
  }

}
