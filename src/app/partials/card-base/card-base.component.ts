import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ActionResultCardProductos {
  productoSeleccionado: {}
}

@Component({
  selector: 'app-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.css']
})
export class CardBaseComponent implements OnInit {

  @Input() ItemProducto = {
    "id_producto": 0,
    "nombre": "",
    "precio_compra": "",
    "descripcion": "",
    "tipo_unidad": 0,
    "stock": 0,
    "precio_venta": 0,
    "id_categoria": 0
  }


  @Output() eventResultAction = new EventEmitter<ActionResultCardProductos>();


  constructor() {
  }

  ngOnInit(): void {
  }

  onClickAgregarProducto(ItemProducto: {}) {
    this.eventResultAction.emit({productoSeleccionado: ItemProducto});
  }
}
