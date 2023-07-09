import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface DataEventNavbar {
  dataResult: any
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  @Output() change = new EventEmitter<DataEventNavbar>();
  listaMenus = [
    { name: "Home", setActive: true },
    { name: "Ofertas", setActive: false },
    { name: "Vender", setActive: false }
  ];

  constructor() { }

  ngOnInit(): void {
  }


  onNavbarClickListener(arg0: string) {

    this.listaMenus.forEach(it => {
      it.setActive = false;
      if (it.name == arg0) it.setActive = true;
    })



    this.change.emit({
      dataResult: arg0
    })
  }


}
