import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface ActionResultItemAcordion {
  OnSucces: boolean;
  dataList: any[];
}
@Component({
  selector: 'app-iem-acordion',
  templateUrl: './iem-acordion.component.html',
  styleUrls: ['./iem-acordion.component.css'],
})
export class IEMAcordionComponent implements OnInit {
  @Input() ListaParentGoblal = [];
  @Output() eventResultAction = new EventEmitter<ActionResultItemAcordion>();
  isLoadingData = false;
  parenList: ItemIEMAcordion[] = [];
  // selectedFilterList = [];

  constructor() {}

  ngOnInit(): void {
    this.isLoadingData = true;
    setTimeout(() => {
      this.parenList = settingList(this.ListaParentGoblal);
      this.isLoadingData = false;
    }, 2000);
  }

  selectedFilterList: any[] = [];
  onChangeCategoriaSelectedListener(item: any) {
    if (!item.isChecked) {
      let indexDelete = this.selectedFilterList.indexOf(item);
      this.selectedFilterList.splice(indexDelete, 1);
    } else {
      this.selectedFilterList.push(item);
    }

    // alert(this.ListaSelectedCategoriasFiltro.length);
  }

  onClickFiltrarSeleccion(ListHijosTotal: any[]) {
    let ListHijosFiltrado: any[] = [];

    ListHijosTotal.forEach((element) => {
      if (element.isChecked) {
        // alert(JSON.stringify(element));
        // this.obtenerProductosByCategorioHijoID(element.idItem);
        ListHijosFiltrado.push({ idItem: element.id_categoria });
      }
    });

    let eventData: ActionResultItemAcordion = {
      OnSucces: true,
      dataList: ListHijosFiltrado,
    };
    this.eventResultAction.emit(eventData);
  }

  obtenerProductosByCategorioHijoID(idItem: any) {}
}

export interface ItemIEMAcordion {
  titleName: string;
  itemDescription: string;
  codeItem: string;
  tipeItem: string;
  countChilds: number;
  childList: ItemIEMAcordion[];
}

function settingList(listaGoblal: any[]): any[] {
  let newListFormated: ItemIEMAcordion[] = [];
  listaGoblal.forEach((item) => {
    // console.log('idParent :' + item.id_categoria);
    // console.table(item.ListaCategoriasHijos);

    let count =
      item.ListaCategoriasHijos == null ? 0 : item.ListaCategoriasHijos.length;
    let listaHijos =
      item.ListaCategoriasHijos == null ? 0 : item.ListaCategoriasHijos;
    newListFormated.push({
      titleName: item.nombre,
      itemDescription: item.descripcion,
      codeItem: item.id_categoria,
      tipeItem: 'PI',
      childList: listaHijos,
      countChilds: count,
    });
  });

  return newListFormated;
}
