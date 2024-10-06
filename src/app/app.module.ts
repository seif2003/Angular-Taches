import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TachesComponent } from './taches/taches.component';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { FormsModule } from '@angular/forms';
import { UpdateTacheComponent } from './update-tache/update-tache.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RechercheParProjetComponent } from './recherche-par-projet/recherche-par-projet.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    TachesComponent,
    AddTacheComponent,
    UpdateTacheComponent,
    RechercheParProjetComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
