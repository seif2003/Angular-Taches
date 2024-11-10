import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../services/tache.service';
import { Tache } from '../model/tache.model';
import { Projet } from '../model/projet.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrl: './update-tache.component.css'
})
export class UpdateTacheComponent {
  currentTache = new Tache();
  projets!: Projet[];
  updatedIdProjet!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private tacheService: TacheService,
    private router: Router
  ) { }

  /*
  ngOnInit() {
    this.tacheService.listeProjets().subscribe(projets => {
      this.projets = projets._embedded.projets;
    });
    this.tacheService.consulterTache(this.activatedRoute.snapshot.params['id']).subscribe(tache => {
      this.currentTache = tache;
      this.updatedIdProjet = this.currentTache.projet.idProjet;
      this.tacheService
        .loadImage(this.currentTache.image.idImage)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    });
  }*/

  ngOnInit(): void {
    this.tacheService.listeProjets().
      subscribe(cats => {
        this.projets = cats._embedded.projets;
      });
    this.tacheService.consulterTache(this.activatedRoute.snapshot.params['id'])
      .subscribe(prod => {
        this.currentTache = prod;
        this.updatedIdProjet = prod.projet.idProjet;
      });
  }


  // updateTache() {
  //   this.currentTache.projet = this.projets.find(p => p.idProjet == this.updatedIdProjet)!;
  //   this.tacheService.updateTache(this.currentTache).subscribe(tache => {
  //     console.log(tache);
  //     this.router.navigate(['taches']);
  //   });
  // }
  /*updateTache() {
    this.currentTache.projet = this.projets.find(proj => proj.idProjet == this.updatedIdProjet)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.tacheService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentTache.image = img;
          this.tacheService
            .updateTache(this.currentTache)
            .subscribe((tache) => {
              this.router.navigate(['taches']);
            });
        });
    }
    else {
      this.tacheService
        .updateTache(this.currentTache)
        .subscribe((tache) => {
          this.router.navigate(['taches']);
        });
    }
  }*/

  updateTache() {
    this.currentTache.projet = this.projets.find(proj => proj.idProjet == this.updatedIdProjet)!;
    this.tacheService
      .updateTache(this.currentTache)
      .subscribe((tache) => {
        this.router.navigate(['taches']);
      });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageTache() {
    this.tacheService
      .uploadImageTache(this.uploadedImage,
        this.uploadedImage.name, this.currentTache.idTache)
      .subscribe((img: Image) => {
        this.currentTache.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.tacheService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentTache.images.indexOf(img, 0);
        if (index > -1) {
          this.currentTache.images.splice(index, 1);
        }
      });
  }


}
