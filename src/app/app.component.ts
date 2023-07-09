import {Component, OnInit} from '@angular/core';
import {ApiPublicService} from "./rest-apis/public/api-public.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TiendaOnlineBase__';


  ngOnInit(): void {
    // this.obntenerListaCategorias()
  }


}
