import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiPublicService } from '../../rest-apis/public/api-public.service';
import Swal from 'sweetalert2';

interface ActionResultMain {}

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  @Input() listaProductos: any[] = [];
  @Output() eventResultAction = new EventEmitter<ActionResultMain>();

  dataBusquedaParams = {
    categoriaSelected: '',
    aliasVenta: '',
    clienteSelected: {},
  };

  ventaIdPendienteSelected = -1;
  listaClientes = [];

  constructor(private __ws: ApiPublicService) {}

  ngOnInit(): void {
    this.obtnerListaVentasPendientes();
    this.obtnerlistaClientes();
  }
  obtnerlistaClientes() {
    this.__ws.getListaClientes('EC001').subscribe(
      (res: any) => {
        this.listaClientes = res;
      },
      (err) => {
        alert('error : ' + err);
      },
      () => {}
    );
  }

  private obtnerListaVentasPendientes() {
    let tempListSelected: any[] = [];
    this.__ws.getListaVentas('PTE').subscribe(
      (res: any) => {
        this.ListaVentasPendientes = res;
        // this.setSelectedItemVentaPendiente(this.ListaVentasPendientes[0].id_venta)
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  ClienteData: any = {};

  setClienteSelectedVenta(arg0: string) {
    this.ClienteData = this.listaClientes.find(
      (i) => i['id_cliente'] === parseInt(arg0)
    );
  }

  private setSelectedItemVentaPendiente(idVenta: any) {
    // this.VentaSelected = itemVentaPendienteSelected;
    this.ventaIdPendienteSelected = idVenta;
    this.listarProdcutos(idVenta);
  }

  tipoFormulario = 1;

  private listarProdcutos(idVenta: string) {
    this.listaProductosVenta = [];
    this.__ws.getListaProductosByVentaId(idVenta).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.listaProductosVenta = res;
          this.tipoFormulario = 1;
          // this.dataBusquedaParams.aliasVenta=""
        }
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }

  listaProductosVenta: any[] = [];
  activeBAV001 = false;

  ListaVentasPendientes: any[] = [];
  VentaSelected: any = {};

  onClickListenerButton() {
    if (!this.activeBAV001) {
      // this.tipoLista = 1;
      this.activeBAV001 = true;
    } else {
      // this.tipoLista = 2;
      this.activeBAV001 = false;
    }
  }

  onClickListenerAgregarProductoButton(cardItem: any) {
    //AGREGAR AL CARRITO DE VENTA

    cardItem['cantidad_producto'] = 1;
    this.listaProductosVenta.push(cardItem);

    this.listaProductosVenta = this.listaProductosVenta.filter(
      (item, index, self) => self.indexOf(item) === index
    );

    this.tipoFormulario = 2;
  }

  obtenerPrecioSubTotal(cardItem: any) {
    let subTotal = Number(
      cardItem.precio_venta * cardItem['cantidad_producto']
    ).toFixed(2);

    cardItem['precio_total'] = subTotal;

    return subTotal;
  }

  obtenerTotal() {
    let total = 0;
    this.listaProductosVenta.forEach((it) => {
      total = total + parseFloat(it.precio_total);
    });

    return Number(total).toFixed(2);
  }

  onClickListenerButtonNuevoProducto(b001: string) {
    window.open('/reg/producto', '_blank');
  }

  onClickListenerSeleccionarVentaPendiente(event: any) {
    if (this.ventaIdPendienteSelected == -1) return;

    var e = event.target;
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    this.dataBusquedaParams.aliasVenta = text.split('__')[1].split(':')[0];
    this.setSelectedItemVentaPendiente(this.ventaIdPendienteSelected);
  }

  onClickNuevaVenta() {}

  obtenerTipoUnidad(cardItem: any): string {
    if (cardItem.tipo_unidad == 3) return 'Und(s)';
    if (cardItem.tipo_unidad == 1) return 'Kilo(s)';
    if (cardItem.tipo_unidad == 2) return 'Metro(s)';
    else return '';
  }

  onGuardarVentaClickListener() {
    let dataVentaProducto: any[] = [];
    this.listaProductosVenta.forEach((item) => {
      dataVentaProducto.push({
        id_producto: item.id_producto,
        id_venta: 0,
        cantidad_producto: item.cantidad_producto,
        precio_total: item.precio_total,
      });
    });

    let dataVenta = {
      venta: {
        id_cliente: this.ClienteData.id_cliente,
        id_empleado: 1,
        alias_venta: this.dataBusquedaParams.aliasVenta,
      },
      ventaProducto: dataVentaProducto,
    };

    this.__ws.sendModelSave('venta', dataVenta).subscribe(
      (res: any) => {
        if (res.id > 0) {
          Swal.fire('Good job!', 'You clicked the button!', 'success');
          // alert(res)
        } else {
          // alert("no insertado")
          Swal.fire('Good job!', 'You clicked the button!', 'error');
        }
      },
      (err) => {
        alert(err);
        Swal.fire('ERROR!', 'You clicked the button!', 'error');
      },
      () => {}
    );
  }

  setItemSelectedVentaPendiente(item: any) {
    alert(JSON.stringify(item));
  }
}
