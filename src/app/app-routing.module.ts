import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  FormRegistroDinamicoComponent
} from "./pages/formulario-registro/form-registro-dinamico/form-registro-dinamico.component";
import {LayoutMainComponent} from "./pages/layout-main/layout-main.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: LayoutMainComponent},
  {path: 'reg/:model', component: FormRegistroDinamicoComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
