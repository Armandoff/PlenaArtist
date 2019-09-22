import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-makeup-item',
  templateUrl: './makeup-item.component.html',
  styleUrls: ['./makeup-item.component.scss'],
})
export class MakeupItemComponent {

  // <app-makeup-item [artist]="artist" (to_schedule)="toSchedule($event)">
  @Input() artist: Artist;
  @Output() open_perfil = new EventEmitter<Artist>();
  @Output() to_schedule = new EventEmitter<Artist>();
  @Output() edit_make = new EventEmitter<Artist>();
  @Output() delete_make = new EventEmitter<Artist>();

  /*
  public ratingArray?: Array<number>;
  public grayStars?: number;
  public grayStarsArray?: Array<number>;

  async ngOnInit(): Promise<void> {
    this.ratingArray = await Array(this.artist.rating).fill(1).map((x, i) => i + 1);
    this.grayStars = await 5 - this.artist.rating;
    this.grayStarsArray = await Array(this.grayStars).fill(1).map((x, i) => i + 1);
  }
  */


}
