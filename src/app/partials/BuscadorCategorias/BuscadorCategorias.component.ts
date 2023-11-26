import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiPublicService } from 'src/app/rest-apis/public/api-public.service';
import { ActionResultLeftAside } from '../left-aside/left-aside.component';

@Component({
  selector: 'app-BuscadorCategorias',
  templateUrl: './BuscadorCategorias.component.html',
  styleUrls: ['./BuscadorCategorias.component.css'],
})
export class BuscadorCategoriasComponent implements OnInit {
  datoBuscador = '';
  ListaCategoriasPadreBuscador=[];

  @Output() eventResultAction = new EventEmitter<ActionResultLeftAside>();


  constructor(private __ws: ApiPublicService) {}

  ngOnInit() {
    this.obntenerListaCategoriasPadre()
    let action: ActionResultLeftAside = {
      listaProductosSelecteds: this.ListaCategoriasPadreBuscador,
    }
    this.eventResultAction.emit(action);
  }

  onClickBuscarCateoriasListener() {}

  private obntenerListaCategoriasPadre() {
    this.__ws.getListaCategoriasHijosPublicByParent("0")
      .subscribe(
        (res: any) => {
          this.ListaCategoriasPadreBuscador = res
          this.ListaCategoriasPadreBuscador.forEach((item: any) => {
            item["isCheckedItem"] = false;
            this.obntenerListaCategoriasHijos(item)
          })
        }, err => {
          alert(err)
        }, () => {

        }
      )

  }

  private obntenerListaCategoriasHijos(item: { [x: string]: any; }) {
    this.__ws.getListaCategoriasHijosPublicByParent(item["id_categoria"])
      .subscribe(
        (res: any) => {
          let ListaCategoriasTemp = res
          ListaCategoriasTemp.forEach((item: any) => {
            item["isCheckedItem"] = false;
          })
          item["ListaCategoriasHijos"] = ListaCategoriasTemp;
        }, err => {
          alert(err)
        }, () => {

        }
      )

  }
}
