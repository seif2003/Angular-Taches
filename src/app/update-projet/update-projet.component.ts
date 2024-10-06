import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../model/projet.model';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrl: './update-projet.component.css'
})
export class UpdateProjetComponent {

  @Input()
  projet!: Projet;

  @Input()
  ajout!: boolean;

  @Output()
  projetUpdated = new EventEmitter<Projet>();

  @Output()
  cancelEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { 
    console.log(this.projet);
  }

  saveProjet() {
    this.projetUpdated.emit(this.projet);
  }

  cancel() {
    this.cancelEvent.emit();
  }

}
