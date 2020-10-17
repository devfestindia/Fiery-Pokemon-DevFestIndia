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
  observer: IntersectionObserver;

  constructor() {
    this.handleLoad = this.handleLoad.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.inview.bind(this), {
      threshold: 1.0,
      rootMargin: '100px',
    });

    this.observer.observe(this.image.nativeElement);
  }

  private handleLoad(event: any) {
    if (event.target.complete) {
      this.loaded = true;
      this.img = this.src;
    }
  }

  private handleError(event: any) {
    this.loaded = true;
    this.img = '../../../assets/images/nopoke.png';
    this.observer.unobserve(event.target);
    event.target.removeEventListener('load', this.handleLoad);
    event.target['src'] = '../../../assets/images/nopoke.png';
  }

  private inview(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio) {
        entry.target.addEventListener('load', this.handleLoad);

        entry.target.addEventListener('error', this.handleError);

        entry.target['src'] = this.src;
        observer.unobserve(entry.target);
      }
    });
  }
}
