import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { loginEndPoints } from '../../../../environments/loginEndPoints';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { formGroupValidatorLogin } from '../../models/auth/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private urlApi = environment.apiUrl;
  private loginEndPoints = loginEndPoints;
  public jwtToken = localStorage.getItem('jwtToken');


  constructor() { }

  login(user: FormGroup<formGroupValidatorLogin>): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.urlApi + this.loginEndPoints.login, user.value, { observe: 'response' })
  }

}
