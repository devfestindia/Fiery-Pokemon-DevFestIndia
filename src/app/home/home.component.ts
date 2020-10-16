import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PokemonService,
  PokemonList,
} from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private pokemon: PokemonService,
    private router: Router) { }

  result: Array<PokemonList> = [];
  page: number = 0;
  limit: number = 50;

  loading: boolean = false;

  ngOnInit(): void {
    this.fetch();
  }

  private fetch() {
    this.loading = true;

    this.pokemon.list(this.page, this.limit).subscribe(res => {
      this.loading = false;
      this.result = res;
    });
  }

  details(id: string) {
    this.router.navigateByUrl(`/pokemon/${id}`);
  }
}
