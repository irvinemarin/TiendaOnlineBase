import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-list-productos',
  templateUrl: './horizontal-list-productos.component.html',
  styleUrls: ['./horizontal-list-productos.component.css'],
})
export class HorizontalListProductosComponent implements OnInit {
  @Input() ListaProductosByCategoriasSelected?: any[];

  constructor() {}

  ngOnInit(): void {
    // this.ListaProductosByCategoriasSelected = [];
  }

  onClickVerCategoriaListener(_t4: any) {
    // throw new Error('Method not implemented.');
  }
}
