import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '', component : HomeComponent
  },
  {
    path: 'pokemon/:id', component : PokemonComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
