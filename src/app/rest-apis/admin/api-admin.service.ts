import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const ipRest = "http://192.168.0.204:3001"
const baseUrl = ipRest + '/api/tienda/';
const tk = 'eyJhbGciOiJIUzI1NiJ9.c3VwcmVtYQ.cpUyTYcgm8ixIVDTLe-Fua0RLkyUKg8yy2IkAOfKi2I';
let headers = new HttpHeaders().set('authorization', tk);

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {

  constructor(private http: HttpClient) {
  }

  getListaCategorias() {
    return this.http.get(baseUrl + "listaCategorias", {headers: headers});
  }

}
