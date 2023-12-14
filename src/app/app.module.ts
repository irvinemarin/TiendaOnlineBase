// import { NgModule } from '@angular/core';
import { NgModule, LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { LeftAsideComponent } from './partials/left-aside/left-aside.component';
import { MainContentComponent } from './partials/main-content/main-content.component';
import { CardBaseComponent } from './partials/card-base/card-base.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormRegistroDinamicoComponent } from './pages/formulario-registro/form-registro-dinamico/form-registro-dinamico.component';
import { FormsModule } from '@angular/forms';
import { LayoutMainComponent } from './pages/layout-main/layout-main.component';
import { HomeComponent } from './pages/Home/Home.component';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BuscadorCategoriasComponent } from './partials/BuscadorCategorias/BuscadorCategorias.component';
import { StorePageMainComponent } from './pages/StoreV2/store-page-main/store-page-main.component';
import { DemoComponent } from './pages/demo/demo.component';
import { VentasIAGenerateComponent } from './pages/ventas-iagenerate/ventas-iagenerate.component';
import { IEMAcordionComponent } from './pages/StoreV2/partials/iem-acordion/iem-acordion.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LeftAsideComponent,
    MainContentComponent,
    CardBaseComponent,
    LayoutMainComponent,
    FormRegistroDinamicoComponent,
    HomeComponent,
    BuscadorCategoriasComponent,
    StorePageMainComponent,
    DemoComponent,
    VentasIAGenerateComponent,
    IEMAcordionComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
