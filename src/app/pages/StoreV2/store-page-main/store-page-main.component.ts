import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ApiPublicService } from 'src/app/rest-apis/public/api-public.service';
declare var bootstrap: any;

@Component({
  selector: 'app-store-page-main',
  templateUrl: './store-page-main.component.html',
  styleUrls: ['./store-page-main.component.css'],
})
export class StorePageMainComponent implements OnInit {
  ListaCategoriasPadre: ItemCategoria[] = [
    // {
    //   nombre: 'Electrodomesticos 1',
    //   descripcion: 'lorem impsus... asdasd adf.... adfafd...',
    //   code: 'CATP0001',
    // },
    // {
    //   nombre: 'Electrodomesticos 2',
    //   descripcion: 'lorem impsus... asdasd adf.... adfafd...',
    //   code: 'CATP0001',
    // },
    // {
    //   nombre: 'Electrodomesticos 3',
    //   descripcion: 'lorem impsus... asdasd adf.... adfafd...',
    //   code: 'CATP0001',
    // },
    // {
    //   nombre: 'Electrodomesticos 4',
    //   descripcion: 'lorem impsus... asdasd adf.... adfafd...',
    //   code: 'CATP0001',
    // },
  ];

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
  }

  private tooltipList = new Array<any>();

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
    this.ShowProductos = true;
    this.categoriaSelected = ItemCategoria;
  }

  private obntenerListaCategoriasPadre() {
    alert('obntenerListaCategoriasPadre');
    this.__ws.getListaCategoriasHijosPublicByParent('0').subscribe(
      (res: any) => {
        this.ListaCategoriasPadre = res;
        this.ListaCategoriasPadre.forEach((item: any) => {
          // item['isCheckedItem'] = false;
          item.id_categoria = 'CATP_' + item['id_categoria'];
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
}

export interface ItemCategoria {
  nombre: string;
  descripcion: string;
  id_categoria: string;
}
