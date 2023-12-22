import { LandingComponent } from './validador-dni/layouts/landing/landing.component';
import { StorePageMainComponent } from './pages/StoreV2/store-page-main/store-page-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormRegistroDinamicoComponent } from './pages/formulario-registro/form-registro-dinamico/form-registro-dinamico.component';
import { LayoutMainComponent } from './pages/layout-main/layout-main.component';
import { DemoComponent } from './pages/demo/demo.component';
import { VentasIAGenerateComponent } from './pages/ventas-iagenerate/ventas-iagenerate.component';
import { StoreV2Component } from './pages/StoreV2/store-v2/store-v2.component';

const routes: Routes = [
  { path: '', redirectTo: '/ValidadorDNI', pathMatch: 'full' },
  { path: 'main', component: LayoutMainComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'reg/:model', component: FormRegistroDinamicoComponent },
  { path: 'StoreV2', component: StorePageMainComponent },
  { path: 'StoreV3', component: VentasIAGenerateComponent },
  { path: 'ValidadorDNI', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
