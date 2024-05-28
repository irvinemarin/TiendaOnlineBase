import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ApiPublicService } from 'src/app/rest-apis/public/api-public.service';
import { ActionResultItemAcordion } from '../partials/iem-acordion/iem-acordion.component';
import { log } from 'console';
declare var bootstrap: any;

@Component({
  selector: 'app-store-page-main',
  templateUrl: './store-page-main.component.html',
  styleUrls: ['./store-page-main.component.css'],
})
export class StorePageMainComponent implements OnInit {
  ListaCategoriasPadre: ItemCategoria[] = [];

  configUI = {
    carrito: {
      open: false,
    },
    busquedaProducto: {
      stateText: 'seleccione una categoria o busque un producto',
      stateCode: 333,
    },
  };

  ListaHijos: any[] = [
    { idItem: 'IH001', title: 'Mi Item Title', count: 20 },
    { idItem: 'IH002', title: 'Mi Item Title mediun', count: 100 },
    { idItem: 'IH003', title: 'Mi Item Title large text', count: 45 },
    { idItem: 'IH004', title: 'Mi Item Title extra large text ', count: 90 },
    {
      idItem: 'IH005',
      title: 'Mi Item Title ',
      count: 90,
    },
  ];
  dataLogin = {
    loged: true,
    username: 'Adminstrador',
  };

  ShowProductos = false;
  categoriaSelected: any = {};
  tipoVista = '002';
  constructor(
    private __ws: ApiPublicService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.obntenerListaCategoriasPadre();
    this.obntenerListaClientes();
  }

  @Input() placement = 'top';
  @Input() appTooltip = '';

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-toggle',
      'tooltip'
    );
    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-bs-placement',
      this.placement
    );
    this.renderer.setAttribute(this.el.nativeElement, 'title', this.appTooltip);
    new bootstrap.Tooltip(this.el.nativeElement);
  }

  onClickVerCategoriaListener(ItemCategoria: ItemCategoria) {
    // this.ShowProductos = true;
    // this.categoriaSelected = ItemCategoria;
  }

  toastTrigger = document.getElementById('liveToastBtn');
  toastLiveExample = document.getElementById('liveToast');

  renderImageFromBytes(itemProducto: any) {
    if (itemProducto.imgProducto == null) return;
    return this.convertToByteArray(itemProducto.imgProducto.data, itemProducto);
  }

  private convertToByteArray(
    dataUrl: string | ArrayBuffer | null,
    itemProducto: any
  ) {
    if (typeof dataUrl === 'string') {
      const byteString = atob(dataUrl.split(',')[1]);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      itemProducto.selectedImage = '';
      itemProducto.mimeType = 'image/jpeg';
      itemProducto.byteArray = byteArray;
      return this.renderImageFromBytesFinal(
        byteArray,
        itemProducto.mimeType,
        itemProducto
      );
    } else {
      return;
    }
  }

  private renderImageFromBytesFinal(
    byteArray: Uint8Array,
    mimeType: string | null,
    itemProducto: any
  ) {
    let url;
    if (mimeType) {
      const blob = new Blob([byteArray], { type: mimeType });
      url = URL.createObjectURL(blob);
      itemProducto.selectedImage = url;
    }
    return url;
  }

  private obntenerListaCategoriasPadre() {
    // alert('obntenerListaCategoriasPadre');
    this.__ws.getListaCategoriasHijosPublicByParent('0').subscribe(
      (res: any) => {
        this.ListaCategoriasPadre = res;
        this.ListaCategoriasPadre.forEach((item: any) => {
          // item['isCheckedItem'] = false;
          item.id_categoria = 'CATP_' + item['id_categoria'];
          item['ListaCategoriasHijos'] = [];
          this.obntenerListaCategoriasHijos(item);
          // this.obntenerListaCategoriasHijos(item);
        });
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  private obntenerListaCategoriasHijos(item: any) {
    let idCat = item['id_categoria'].split('_')[1];

    // alert(idCat);
    this.__ws.getListaCategoriasHijosPublicByParent(idCat).subscribe(
      (res: any) => {
        let ListaCategoriasTemp = res;
        ListaCategoriasTemp.forEach((item: any) => {
          item['isCheckedItem'] = false;
        });
        item['ListaCategoriasHijos'] = [];
        item['ListaCategoriasHijos'] = ListaCategoriasTemp;
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  DataFiltro: any[] = [];
  onEventResultActionAcordionFiltro(event: ActionResultItemAcordion) {
    this.ListaProductosByCategoriasSelected = [];
    this.DataFiltro = event.dataList;
    event.dataList.forEach((element) => {
      this.obntenerListaProductosByCategoria(element.idItem);
    });
  }

  ListaProductosByCategoriasSelected: any[] = [];

  private obntenerListaProductosByCategoria(id: number) {
    let tempList: any[] = [];
    this.__ws.getListaProductosPublic(id).subscribe(
      (res: any) => {
        res.forEach((element: any) => {
          element.dataCarrito = {
            count: 0,
          };
          this.ListaProductosByCategoriasSelected.push(element);
          this.categoriaSelected.name = element.catName;
        });
        this.configUI.busquedaProducto.stateCode = 200;
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  onClickAddNewProducto() {
    // this.ListaSelectedCategoriasFiltro[0].
  }

  ListaSelectedCategoriasFiltro: any[] = [];
  onChangeCategoriaSelectedListener(item: any) {
    if (!item.isChecked) {
      let indexDelete = this.ListaSelectedCategoriasFiltro.indexOf(item);
      this.ListaSelectedCategoriasFiltro.splice(indexDelete, 1);
    } else {
      this.ListaSelectedCategoriasFiltro.push(item);
    }

    // alert(this.ListaSelectedCategoriasFiltro.length);
  }

  onClickBuscarProducto(arg0: string, isBarcode = false) {
    if (arg0.length < 2) return;
    this.ListaProductosByCategoriasSelected = [];
    this.__ws.getListaProductosPublicByNombre(arg0).subscribe(
      (res: any) => {
        let ResponseFinal = res;
        if (isBarcode) {
          ResponseFinal = [];
          ResponseFinal.push(res[0]);
        }
        ResponseFinal.forEach((element: any) => {
          element.dataCarrito = {
            count: 0,
          };
          this.ListaProductosByCategoriasSelected.push(element);
          this.categoriaSelected.name = element.catName;
        });
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  listClientes: any[] = [];
  private obntenerListaClientes() {
    this.__ws.getListaClientes('EC001').subscribe(
      (res: any) => {
        this.listClientes = res;
        // this.ListaCategoriasPadre.forEach((item: any) => {
        //   // item['isCheckedItem'] = false;
        //   item.id_categoria = 'CATP_' + item['id_categoria'];
        //   item['ListaCategoriasHijos'] = [];
        //   this.obntenerListaCategoriasHijos(item);
        //   // this.obntenerListaCategoriasHijos(item);
        // });
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }
}

export interface ItemCategoria {
  nombre: string;
  descripcion: string;
  id_categoria: string;
}
