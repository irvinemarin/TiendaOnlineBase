import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  formularioVisible = false;
  constructor() {}

  ngOnInit(): void {}

  onClickCerrarListener() {
    console.log("cerrando");
    //*
    //*
    //*
    //*
    //*
    //*
    //*
    this.formularioVisible=false;
  }
}
