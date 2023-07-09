import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChartsV2Component} from "./client/vers-002/charts-v2/charts-v2.component";
import {PrintTableComponent} from "./client/vers-002/partials-v2/print-table/print-table.component";
import {LoginComponent} from "./client/login/login.component";
import {
  BuscadorFechaRangoComponent
} from "./client/vers-002/partials-v2/buscador-fecha-rango/buscador-fecha-rango.component";

const routes: Routes = [
  {path: '', redirectTo: '/reportes', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'reportes', component: ChartsV2Component},
  {path: 'print-table/:params', component: PrintTableComponent},
  {path: 'test/1', component: BuscadorFechaRangoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
