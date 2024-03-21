import { Component, OnInit } from '@angular/core';
import { EventListFilterComponent } from '../event-list-filter/event-list-filter.component';
import { TableModule } from 'primeng/table';
import { EventService } from '../event.service';
import { Event as EventIA } from '../eventia';
import { Subscription, filter } from "rxjs";
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, Scroll, Event } from '@angular/router';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventListFilterComponent, TableModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  constructor(private eventService: EventService, 
              private viewportScroller: ViewportScroller, 
              private router: Router){
    router.events.pipe(filter((event: Event): event is Scroll => event instanceof Scroll)).subscribe(e => {
      if (e.position) {
        viewportScroller.scrollToPosition(e.position);
      }
    });
  }

  events: EventIA[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.eventService.events$.subscribe(_events => {
      this.events = [..._events];
      console.log(this.events);
    }));
  }

  _loadMore() {
    this.eventService.loadMoreEvents();
  }

}
