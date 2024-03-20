import { Component, OnInit } from '@angular/core';
import { EventListFilterComponent } from '../event-list-filter/event-list-filter.component';
import { TableModule } from 'primeng/table';
import { EventService } from '../event.service';
import { Event } from '../eventia';
import { Subscription } from "rxjs";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventListFilterComponent, TableModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  constructor(private eventService: EventService){}

  events: Event[] = [];

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
