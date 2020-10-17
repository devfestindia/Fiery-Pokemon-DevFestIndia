import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { hs } from '../app.utility';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  constructor(private route: ActivatedRoute, private pokemon: PokemonService) { }

  id: string;
  details: any = {};
  about: Array<string> = [];
  stat: any = {};
  shape: string = '';
  growthRate: string = '';

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const { id } = params;

      this.id = id;
      this.fetch();
    });
  }

  private parseStat() {
    const _stat: any = {};
    this.details.moves = this.details.moves.slice(0, 10);

    this.details.stats.forEach((stat: any) => {
      _stat[stat.stat.name] = stat.base_stat;
    });

    this.stat = _stat;
  }

  private fetch() {

    this.pokemon.details(this.id).subscribe(
      res => {
        this.details = res;
        this.parseStat();
      }
    );

    this.pokemon.about(this.id).subscribe(
      res => {
        const _arr: Array<string> = [];
        this.shape = res.shape.name;
        this.growthRate = hs(res.growth_rate.name);

        const name: string = `${res.name.charAt(0).toUpperCase()}${res.name.slice(
          1,
          res.name.length
        )}`;

        res.flavor_text_entries.forEach((entry: any) => {
          if (entry.language.name === 'en') {
            _arr.push(
              entry.flavor_text
                .replace(/\./gi, '. ')
                .replace('\n', ' ')
                .replace(/\s\s+/g, ' ')
                .replace('POKéMON', 'Pokemon')
                .replace(new RegExp(name.toUpperCase(), 'g'), name)
            );
          }
        });

        this.about = [...new Set(_arr.slice(0, 5))];
      });
  }
}
