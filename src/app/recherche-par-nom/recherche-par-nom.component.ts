import { Component } from '@angular/core';
import { TacheService } from '../services/tache.service';
import { Tache } from '../model/tache.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent {

  nomTache!: string;
  taches!: Tache[];
  allTaches!: Tache[];
  searchTerm!: string;

  constructor(private tacheService : TacheService) { }

  ngOnInit() { 
    this.tacheService.listeTaches().subscribe(taches => {
      this.taches = taches;
      console.log(this.allTaches);
    });
  }

  rechercherTaches(){
    this.tacheService.rechercherParNom(this.nomTache).subscribe(taches => {
      this.taches = taches;
      console.log(this.taches);
    });
  }

  onKeyUp(filterText: string) {
    this.taches = this.allTaches.filter(item => item.nomTache.toLowerCase().includes(filterText.toLowerCase()));
  }
}
