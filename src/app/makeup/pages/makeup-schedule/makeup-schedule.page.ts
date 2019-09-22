import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-makeup-schedule',
  templateUrl: './makeup-schedule.page.html',
  styleUrls: ['./makeup-schedule.page.scss'],
})
export class MakeupSchedulePage implements OnInit {

  artistId: string = undefined;

  event = {
    id: '',
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle = 'Agendamento';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private route: ActivatedRoute, private overlayService: OverlayService,
              private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string,
              private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.init();
    this.resetEvent();
  }

  async init(): Promise<void> {
    const loadingInfo = await this.overlayService.loading();

    const artistId = this.route.snapshot.paramMap.get('id');
    this.artistId = artistId;
    console.log(this.artistId);


    this.scheduleService.init(this.artistId);
    this.scheduleService.getAll().subscribe((events) => {
      this.eventSource = [];
      events.forEach((ev) => {
        let event: any = ev;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
      });
      console.log(this.eventSource);
      // this.myCal.loadEvents();
      loadingInfo.dismiss();
    });

  }

  resetEvent() {
    this.event = {
      id: '',
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  async addEvent() {
    let end = new Date(this.event.endTime);

    let eventCopy = {
      id: this.event.id,
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes() + 90)),
      allDay: this.event.allDay,
      desc: this.event.desc
    };

    /*
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
    */

    this.eventSource.push(eventCopy);
    console.log('Event Copy: ');
    console.log(eventCopy);

    // aqui salva no firestore
    const makeup = await this.scheduleService.create(eventCopy);

    // this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['Ok']
    });
    alert.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    let selected = new Date(ev.seletedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

}
