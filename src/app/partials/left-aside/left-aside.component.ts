import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiPublicService } from '../../rest-apis/public/api-public.service';

export interface ActionResultLeftAside {
  listaProductosSelecteds: any[];
}

@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.css'],
})
export class LeftAsideComponent implements OnInit {
  @Output() eventResultAction = new EventEmitter<ActionResultLeftAside>();

  ListaCategorias: any[] = [];
  countSelectedsItemsCategoria = 0;

  constructor(private __ws: ApiPublicService) {}

  ngOnInit(): void {
    this.obntenerListaCategoriasPadre();
  }

  listaProductosSelectedDB: any[] = [];
  ListaCategoriasPadre: any[] = [];

  onChangeChecked(itemCategoria: any) {
    itemCategoria['isCheckedItem'] = !itemCategoria['isCheckedItem'];
    if (itemCategoria.isCheckedItem) {
      this.countSelectedsItemsCategoria++;
      this.obtenerListaProductos(itemCategoria);
    } else {
      let tempListSelected = this.listaProductosSelectedDB.filter(function (
        obj
      ) {
        return obj.id_categoria != itemCategoria.id_categoria;
      });

      this.removeDuplicatesProducts();
      let action: ActionResultLeftAside = {
        listaProductosSelecteds: tempListSelected,
      };
      this.eventResultAction.emit(action);
      this.countSelectedsItemsCategoria--;
    }
  }

  private obtenerListaProductos(itemCategoria: any) {
    let tempListSelected: any[] = [];
    this.__ws.getListaProductosPublic(itemCategoria['id_categoria']).subscribe(
      (res: any) => {
        res.forEach((itemProducto: any) => {
          this.listaProductosSelectedDB.push(itemProducto);
        });
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
    this.removeDuplicatesProducts();
    tempListSelected = this.listaProductosSelectedDB;

    let action: ActionResultLeftAside = {
      listaProductosSelecteds: tempListSelected,
    };

    this.eventResultAction.emit(action);
  }

  private removeDuplicatesProducts() {
    // if (this.listaProductosSelectedDB.length > 1) {
    this.listaProductosSelectedDB = this.listaProductosSelectedDB.filter(
      (v, i, a) =>
        a.findIndex((v2) => JSON.stringify(v) === JSON.stringify(v2)) === i
    );
    // }
  }

  private obntenerListaCategoriasPadre() {
    this.__ws.getListaCategoriasHijosPublicByParent('0').subscribe(
      (res: any) => {
        this.ListaCategoriasPadre = res;
        this.ListaCategoriasPadre.forEach((item: any) => {
          item['isCheckedItem'] = false;
          this.obntenerListaCategoriasHijos(item);
        });
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  private obntenerListaCategoriasHijos(item: { [x: string]: any }) {
    this.__ws
      .getListaCategoriasHijosPublicByParent(item['id_categoria'])
      .subscribe(
        (res: any) => {
          let ListaCategoriasTemp = res;
          ListaCategoriasTemp.forEach((item: any) => {
            item['isCheckedItem'] = false;
          });
          item['ListaCategoriasHijos'] = ListaCategoriasTemp;
        },
        (err) => {
          alert(err);
        },
        () => {}
      );
  }

  onClickListenerButton(codeButton: string) {
    switch (codeButton) {
      case 'b001':
        // alert("click Nueva Categoria")
        LeftAsideComponent.onClickNuevaCateoriaListener();

        break;
      default:
        alert('boton no registrado con accion');
        break;
    }
  }

  private static onClickNuevaCateoriaListener() {
    window.open('/reg/categorias', '_blank');
  }

  onBuscarFinish(arg0: ActionResultLeftAside) {
    this.listaProductosSelectedDB = arg0.listaProductosSelecteds;
  }
}
