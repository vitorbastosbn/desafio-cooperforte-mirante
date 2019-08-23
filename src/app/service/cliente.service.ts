import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'https://httpbin.org/post';

  constructor(private http: HttpClient) { }

  cadastrar(form: FormGroup) {
    return this.http.post(this.url, JSON.stringify(form.value));
  }

  consultarCEP(cep: number) {
    return this.http.get('http://viacep.com.br/ws/' + cep + '/json/');
  }
}
