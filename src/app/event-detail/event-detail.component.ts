import { Component, Input } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../eventia';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {

  constructor(private eventService: EventService, 
              private route: ActivatedRoute,
              private router: Router){}
  
  @Input()
  set id(_id: string) {
    if (parseInt(_id, 10) > 0) {
      this.loadEvent();
      this.eventService.loadEvent(parseInt(_id, 10) );
    }
  }
  
  event: Event = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    date: ''
  };

  loadEvent() {
    this.eventService.event$.subscribe(evt => {
      this.event = evt;
    });
  }
  
}
