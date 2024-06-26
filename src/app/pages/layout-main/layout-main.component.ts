import { Component, OnInit } from '@angular/core';
import { ActionResultLeftAside } from "../../partials/left-aside/left-aside.component";
import { DataEventNavbar } from 'src/app/partials/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.css']
})
export class LayoutMainComponent implements OnInit {

  currentTabUrl = "storev2"

  constructor() {
  }

  ngOnInit(): void {
  }

  dataResult: ActionResultLeftAside = { listaProductosSelecteds: [] }

  onCategoriasSelected(event: ActionResultLeftAside) {
    this.dataResult = event
    if (this.dataResult.listaProductosSelecteds.length > 0)
      this.dataResult.listaProductosSelecteds =
        this.dataResult.listaProductosSelecteds
          .filter((v, i, a) =>
            a.findIndex(v2 =>
              (JSON.stringify(v) === JSON.stringify(v2))
            ) === i)

  }

  onNavBarCLickListener(event: DataEventNavbar) {
    this.currentTabUrl = event.dataResult
    // alert(this.currentTabUrl + "-- " + event.dataResult)
  }


}
