import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/models/produit.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-produits',
  templateUrl: './form-produits.component.html',
  styleUrls: ['./form-produits.component.scss']
})
export class FormProduitsComponent implements OnInit {

  public registerForm! : FormGroup;
  private id! : number;

  constructor(private _fb : FormBuilder, private _client: HttpClient, private _router : Router, private toastr : ToastrService, private _route : ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = parseInt(this._route.snapshot.params['id']);

    this.registerForm = this._fb.group(
      { name: [null, [Validators.required]],
        price: [null, [Validators.required]],
        description : [null, []],
        categoryId: [null, [Validators.required]]
      }
    );

    if(this.id){
      this._client.get<Produit>(environment.base_api_url + '/produits/' + this.id)
        .subscribe({
          next: data => {
            this.registerForm.patchValue(data);
          },
          error: error => {
            this.toastr.error('Erreur');
          }
        });
    }    
  }

  submit(){
    if(this.registerForm.valid){

      if(!this.id){
        this._client.post(environment.base_api_url + '/produits', this.registerForm.value)
        //Attention subscribe est obligatoire pour l'envoi d'une requête
        .subscribe({ next: data => {
          this.toastr.success('Enregistrement OK');
          this._router.navigate(['/produits']);
          }, error: error => {
            this.toastr.error('Enregistrement n\'a pas fonctionné');
          }  
        });
      }
      else{
        this._client.put(environment.base_api_url + '/produits/' + this.id, this.registerForm.value)
        //Attention subscribe est obligatoire pour l'envoi d'une requête
        .subscribe({ next: data => {
          this.toastr.success('Enregistrement OK');
          this._router.navigate(['/produits']);
          }, error: error => {
            this.toastr.error('Enregistrement n\'a pas fonctionné');
          }  
        });
      }
    }
  }

}
