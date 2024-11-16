import { Component } from '@angular/core';
import { Tache } from '../model/tache.model';
import { TacheService } from '../services/tache.service';
import { Projet } from '../model/projet.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

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
  uploadedImage!: File;
  imagePath: any;


  constructor(private tacheService: TacheService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tacheService.listeProjets().subscribe(projets => {
      this.projets = projets._embedded.projets;
      console.log(this.projets);
    });
  }

  // addTache() {
  //   this.newTache.projet = this.projets.find(p => p.idProjet == this.newIdProjet)!;
  //   this.tacheService.ajouterTache(this.newTache).subscribe(tache => {
  //     console.log(tache);
  //     this.router.navigate(['taches']);
  //   });
  // }
  // addTache() {
  //   this.tacheService
  //     .uploadImage(this.uploadedImage, this.uploadedImage.name)
  //     .subscribe((img: Image) => {
  //       this.newTache.image = img;
  //       this.newTache.projet = this.projets.find(cat => cat.idProjet == this.newIdProjet)!;
  //       this.tacheService
  //         .ajouterTache(this.newTache)
  //         .subscribe(() => {
  //           this.router.navigate(['taches']);
  //         });
  //     });
  // }

  addTache() {
    this.newTache.projet = this.projets.find(proj => proj.idProjet == this.newIdProjet)!;
    this.tacheService
      .ajouterTache(this.newTache)
      .subscribe((tache) => {
        this.tacheService
          .uploadImageTache(this.uploadedImage, this.uploadedImage.name, tache.idTache)
          .subscribe((response: any) => { this.router.navigate(['taches']); }
          );
      });
  }



    // addTache() {
    //   this.newTache.projet = this.projets.find(proj => proj.idProjet == this.newIdProjet)!;
    //   this.tacheService
    //     .ajouterTache(this.newTache)
    //     .subscribe((tache) => {
    //       this.tacheService
    //         .uploadImageFS(this.uploadedImage,
    //           this.uploadedImage.name, tache.idTache)
    //         .subscribe((response: any) => { }
    //         );
    //       this.router.navigate(['taches']);
    //     });
    // }


    onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
    }

  }
