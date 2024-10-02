import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../services/tache.service';
import { Tache } from '../model/tache.model';
import { Projet } from '../model/projet.model';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrl: './update-tache.component.css'
})
export class UpdateTacheComponent {
  currentTache = new Tache();
  projets!: Projet[];
  updatedIdProjet!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private tacheService: TacheService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tacheService.listeProjets().subscribe(projets => {
      this.projets = projets;
    });
    this.tacheService.consulterTache(this.activatedRoute.snapshot.params['id']).subscribe(tache => {
      this.currentTache = tache;
      this.updatedIdProjet = this.currentTache.projet.idProjet;
    });
  }

  updateTache() {
    this.currentTache.projet = this.projets.find(p => p.idProjet == this.updatedIdProjet)!;
    this.tacheService.updateTache(this.currentTache).subscribe(tache => {
      console.log(tache);
      this.router.navigate(['taches']);
    });
  }


}
