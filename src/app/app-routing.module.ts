import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProduitsComponent } from './pages/form-produits/form-produits.component';
import { IndexProduitsComponent } from './pages/index-produits/index-produits.component';

const routes: Routes = [
  {path: '', redirectTo: '/produits', pathMatch: 'full'},
  {path: 'produits', component: IndexProduitsComponent},
  {path: 'produit-form/:id', component: FormProduitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
