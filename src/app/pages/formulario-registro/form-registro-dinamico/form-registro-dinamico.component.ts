import {Component, OnInit} from '@angular/core';
import {ApiPublicService} from "../../rest-apis/public/api-public.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-registro-dinamico',
  templateUrl: './form-registro-dinamico.component.html',
  styleUrls: ['./form-registro-dinamico.component.css']
})
export class FormRegistroDinamicoComponent implements OnInit {
  nombreModelo = "categorias"

  constructor(
    private route: ActivatedRoute,
    private __ws: ApiPublicService) {
  }

  ngOnInit(): void {
    this.obtenerParamsRouter()

    this.obtenerColumnasByModelo(this.nombreModelo)
  }


  private obtenerParamsRouter() {
    this.route.params.subscribe(params => {
      if (params['model'] == "") this.nombreModelo = "categorias";
      this.nombreModelo = params['model'];
      if (this.nombreModelo == "categorias") {
        this.onbtenerListaCategoriasPadres()
      }
    })
  }

  listaColumnas: ItemColumns[] = []
  listaDB: ItemColumns[] = []
  listaCategorias = [];
  listaCategoriasPadres = [];


  private obtenerColumnasByModelo(categoria: string) {

    this.__ws.getColumnasByModelo(categoria)
      .subscribe(
        (res: any) => {
          this.listaDB = []
          this.listaColumnas = []
          this.listaDB = res;
          this.listaDB.forEach(itemDB => {
            if (itemDB["COLUMN_KEY"] != "PRI" && itemDB["tipo"] != "date" && itemDB["nombre"] != "estado") {
              itemDB.valor_columna = "";
              this.listaColumnas.push(itemDB);
            }
          })

          if (this.nombreModelo == "producto") {
            this.onbtenerListaCategorias()
          }

        }, err => {
          alert(err.message)
        }, () => {
          console.log("complete")
        }
      )
  }

  private onbtenerListaCategorias() {
    this.__ws.getListaCategoriasHijosPublic()
      .subscribe(
        (data: any) => {
          // let listaTemp=data
          this.listaCategorias = data;
        }
      );
  }


  onVerifcarFormularioClickListener() {
    // saveModel

    this.sendSaveModelWS(this.createObjectModel())

  }

  private createObjectModel() {
    let objectJsonString = "{"

    this.listaColumnas.forEach((item, rowNumber) => {
      objectJsonString += `"${item.nombre}":"${item.valor_columna}"`
      if (rowNumber < this.listaColumnas.length - 1) {
        objectJsonString += ","
      }
    })
    objectJsonString += `}`

    return JSON.parse(objectJsonString)
  }


  onCancelarFormularioClickListener() {

  }

  private sendSaveModelWS(body: any) {
    this.__ws.sendModelSave(this.nombreModelo, body)
      .subscribe(
        (res: any) => {
          if (res.id > 0) alert("inserted Correct")
          else {
            alert("Error de Ingreso de " + this.nombreModelo)
          }
        }, err => {
          alert(err.message)
        }, () => {
          console.log("complete")
        }
      )
  }

  getTipoDatoInput(item: ItemColumns) {
    return item.tipo == "decimal" || item.tipo == "int" ? "number" : "text";
  }

  obtenerMaximoInput(item: ItemColumns) {

    let max_leght = item["max_length"];


    if (item.tipo == "decimal" || item.tipo == "int") { // @ts-ignore
      max_leght = item["NUMERIC_PRECISION"];
    }

    return max_leght
  }

  verificarTipoInput(item: ItemColumns, tipoInput: string) {
    let isInput = false;

    if (tipoInput == "inp") {
      if (item['max_length'] <= 150 && item['nombre'] != 'tipo_unidad' && item['nombre'] != 'id_categoria' && item['nombre'] != 'parent_id') {
        isInput = true
      }
    }
    if (tipoInput == "sel") {
      if (item.nombre == 'id_categoria') {
        isInput = true
      }
    }

    return isInput
  }

  private onbtenerListaCategoriasPadres() {
    this.__ws.getListaCategoriasPadresPublic()
      .subscribe(
        (data: any) => {
          // let listaTemp=data
          this.listaCategoriasPadres = data;
        }
      );
  }
}

export interface ItemColumns {
  nombre: string;
  COLUMN_KEY: string;
  tipo: string;
  max_length: number;
  valor_columna: string;
}
