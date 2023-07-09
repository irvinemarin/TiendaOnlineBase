import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const ipRest = "http://192.168.2.204:3001"
const baseUrl = ipRest + '/api/tienda/';
const tk = 'eyJhbGciOiJIUzI1NiJ9.c3VwcmVtYQ.cpUyTYcgm8ixIVDTLe-Fua0RLkyUKg8yy2IkAOfKi2I';
let headers = new HttpHeaders().set('authorization', tk);


@Injectable({
  providedIn: 'root'
})
export class ApiPublicService {

  getListaClientes(arg0: string) {
    return this.http.get(baseUrl + "listaClientes/" + arg0 /*, {headers: headers}*/);
  }

  constructor(private http: HttpClient) {
  }

  getListaCategoriasHijosPublic() {
    return this.http.get(baseUrl + "listaCategorias"/*, {headers: headers}*/);
  }

  getListaProductosPublic(itemCategoriaElement: any) {
    return this.http.get(baseUrl + "listaProductos/" + itemCategoriaElement/*, {headers: headers}*/);
  }

  getColumnasByModelo(nombreModelo: string) {
    return this.http.get(baseUrl + "listaColumnasDetails/" + nombreModelo/*, {headers: headers}*/);
  }

  sendModelSave(nombreModelo: string, body: {}) {
    headers.set("Accept", "application/json");
    return this.http.post(baseUrl + "saveModel/" + nombreModelo, { data: body }
      , { headers: headers });
  }

  getListaCategoriasPadresPublic() {
    return this.http.get(baseUrl + "listaCategoriasParent"/*, {headers: headers}*/);
  }

  getListaCategoriasHijosPublicByParent(id_categoria: any) {
    return this.http.get(baseUrl + "listaCategoriasByParent/" + id_categoria/*, {headers: headers}*/);

  }

  getListaVentas(estado: string) {
    return this.http.get(baseUrl + "listaVentas/" + estado/*, {headers: headers}*/);
  }

  getListaProductosByVentaId(idVenta: any) {

    return this.http.get(baseUrl + "listaProductosByID/" + idVenta/*, {headers: headers}*/);

  }
}
