import { UsuarioComponent } from './component/cadastro/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './component/cadastro/cliente/cliente.component';


const routes: Routes = [
  { path: 'cliente/cadastro', component: ClienteComponent },
  { path: 'usuario/cadastro', component: UsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
