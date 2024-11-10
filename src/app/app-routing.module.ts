import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TachesComponent } from './taches/taches.component';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { UpdateTacheComponent } from './update-tache/update-tache.component';
import { RechercheParProjetComponent } from './recherche-par-projet/recherche-par-projet.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeProjesComponent } from './liste-projes/liste-projes.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { tacheGuard } from './Tache.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';



const routes: Routes = [
  { path : "taches", component: TachesComponent },
  { path : "add-tache", component: AddTacheComponent, canActivate:[tacheGuard] },
  { path : "updateTache/:id", component: UpdateTacheComponent},
  { path : "rechercheParProjet", component: RechercheParProjetComponent},
  { path : "rechercheParNom", component: RechercheParNomComponent},
  { path : "listeProjets", component: ListeProjesComponent},
  { path : "login", component: LoginComponent },
  { path : "app-forbidden", component: ForbiddenComponent },
  { path : "register", component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent },
  { path : "", redirectTo: "/taches", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
