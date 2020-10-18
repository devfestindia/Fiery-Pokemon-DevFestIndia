import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonComponent implements OnInit {
  constructor(private route: ActivatedRoute, private pokemon: PokemonService) { }

  id$: Observable<string>;
  details$: Observable<any>;
  about: Array<string> = [];
  stat: any = {};
  shape$: any = '';
  growthRate: string = '';

  ngOnInit(): void {

    this.id$ = this.route.paramMap.pipe(
      map((param) => param.get('id'))
    );

    this.details$ = this.id$.pipe(
      mergeMap((id: string) => this.pokemon.details(id))
    );

    this.shape$ = this.id$.pipe(
      mergeMap((id) => this.pokemon.about(id))
    )

  }

  // private fetch() {

  //   // this.pokemon.details(this.id).subscribe(
  //   //   res => {
  //   //     this.details = res;
  //   //   }
  //   // );

  //   // this.pokemon.about(this.id).subscribe(
  //   //   res => {
  //   //     const _arr: Array<string> = [];
  //   //     this.shape = res.shape.name;
  //   //     this.growthRate = hs(res.growth_rate.name);

  //   //     const name: string = `${res.name.charAt(0).toUpperCase()}${res.name.slice(
  //   //       1,
  //   //       res.name.length
  //   //     )}`;

  //   //     res.flavor_text_entries.forEach((entry: any) => {
  //   //       if (entry.language.name === 'en') {
  //   //         _arr.push(
  //   //           entry.flavor_text
  //   //             .replace(/\./gi, '. ')
  //   //             .replace('\n', ' ')
  //   //             .replace(/\s\s+/g, ' ')
  //   //             .replace('POKéMON', 'Pokemon')
  //   //             .replace(new RegExp(name.toUpperCase(), 'g'), name)
  //   //         );
  //   //       }
  //   //     });

  //   //     this.about = [...new Set(_arr.slice(0, 5))];
  //   //   });
  // }

  trackByFn(i: number, move: any) {
    return move.move.name;
  }
}
