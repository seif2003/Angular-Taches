import { Component, OnInit } from '@angular/core';
import { Tache } from '../model/tache.model';
import { TacheService } from '../services/tache.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.css'
})
export class TachesComponent implements OnInit {
  taches?: Tache[];
 

  constructor(private tacheService: TacheService,
    private router: Router,
    public authService: AuthService
  ) {
    // this.taches = [];
  }
  
  ngOnInit() { 
    this.chargerTachers();
  }

  chargerTachers() {
    this.tacheService.listeTaches().subscribe(taches => {
      this.taches = taches;
    });
  }

  supprimerTache(tache: Tache) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.tacheService.supprimerTache(tache.idTache).subscribe(() => {
        console.log("tache supprimée");
        this.chargerTachers();
      });
  }
  
}