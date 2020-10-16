import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, AfterViewInit {
  @Input('src') src: string;
  @Input('alt') alt: string;

  @Input('shadow') shadow: boolean = true;

  @ViewChild('image') image: ElementRef<HTMLImageElement>;

  loaded: boolean = false;
  img: string = '../../../assets/images/blank.png';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const observer: IntersectionObserver = new IntersectionObserver(
      this.inview.bind(this),
      {
        threshold: 1.0,
        rootMargin: '100px',
      }
    );

    observer.observe(this.image.nativeElement);
  }

  private inview(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio) {
        entry.target.addEventListener('load', (event: any) => {
          if (event.target.complete) {
            this.loaded = true;
            this.img = this.src;
          }
        });

        entry.target['src'] = this.src;
        observer.unobserve(entry.target);
      }
    });
  }
}
