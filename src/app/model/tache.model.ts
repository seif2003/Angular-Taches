import { Image } from "./image.model";
import { Projet } from "./projet.model";

export class Tache {
    idTache!: number;
    nomTache!: string;
    description!: string;
    statut!: string;
    dateEcheance!: Date;
    dateCreation!: Date;
    projet!: Projet;
    image! : Image
    imageStr!:string
    images!: Image[];
}