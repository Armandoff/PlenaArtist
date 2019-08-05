import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { MakeUp } from './../../models/makeup.model';

@Component({
  selector: 'app-makeup-item',
  templateUrl: './makeup-item.component.html',
  styleUrls: ['./makeup-item.component.scss'],
})
export class MakeupItemComponent implements OnInit {

  // <app-makeup-item [makeup]="makeup" (to_schedule)="toSchedule($event)">
  @Input() makeup: MakeUp;
  @Output() open_perfil = new EventEmitter<MakeUp>();
  @Output() to_schedule = new EventEmitter<MakeUp>();
  @Output() edit_make = new EventEmitter<MakeUp>();
  @Output() delete_make = new EventEmitter<MakeUp>();

  public ratingArray?: Array<number>;
  public grayStars?: number;
  public grayStarsArray?: Array<number>;

  async ngOnInit(): Promise<void> {
    this.ratingArray = await Array(this.makeup.rating).fill(1).map((x, i) => i + 1);
    this.grayStars = await 5 - this.makeup.rating;
    this.grayStarsArray = await Array(this.grayStars).fill(1).map((x, i) => i + 1);
  }


}
