import { Projet } from "./projet.model";

export class ProjetWrapped {
    _embedded!: { projets: Projet[] };
}