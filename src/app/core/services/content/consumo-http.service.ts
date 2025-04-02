import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { ConsumoGeneralEndPoints } from '../../../../environments/consumoGeneralEndPoints';
import { infoInventario } from '../../models/content/inventario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConsumoHTTPService {

  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private urlApi = environment.apiUrl;
  private consumoGeneralEndPoints = ConsumoGeneralEndPoints;
  constructor() { }


  obtenerInventario(): Observable<HttpResponse<infoInventario>> {
    return this.httpClient.get<infoInventario>(this.urlApi + this.consumoGeneralEndPoints.obtenerInventario, { observe: 'response' });
  }
}
