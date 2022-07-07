import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/models/produit.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index-produits',
  templateUrl: './index-produits.component.html',
  styleUrls: ['./index-produits.component.scss']
})
export class IndexProduitsComponent implements OnInit {

  produits!: Produit[];
  show: boolean = false;
  toDeleteId! : number;

  constructor(
    private client: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
    //chercher la liste des produits sur l'API
    this.client.get<Produit[]>(environment.base_api_url + '/produits')
      .subscribe({
        /** ici la méthode qui sera appelée quand les données seront reçues */
        next: data => { this.produits = data; }, //en cas de succès
        error: error => {
          this.toastr.error('Impossible de se connecter à l\'api');
        }, //en cas d'erreur
        complete: () => {}  //dans tous les cas
      });
  }

  delete(id : number){
    this.client.delete(environment.base_api_url + '/produits/'+ this.toDeleteId)
    .subscribe({
      next: data => { 
        this.loadData();
        this.toastr.success('Élement Supprimé');
        //this.show = false;
       }, 
      error: error => {
        this.toastr.error('Impossible de Supprimer');
      },
      complete: () => {}
    });
  }

  // showBox(id : number){
  //   this.show = true;
  //   this.toDeleteId = id;
  // }

}
