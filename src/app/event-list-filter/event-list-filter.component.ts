import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-list-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule],
  templateUrl: './event-list-filter.component.html',
  styleUrl: './event-list-filter.component.css'
})
export class EventListFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
              private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router ) {}

  searchForm = this.formBuilder.group({
    name: '',
    phone: '',
    email: '',
    date: ''
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(distinctUntilChanged()).subscribe(params => {
      const name = params.get('name');
      const phone = params.get('phone');
      const email = params.get('email');
      const date = params.get('date');
      const formatter = new Intl.DateTimeFormat("en-US");
      if(
        this.searchForm.value.name !== name || 
        this.searchForm.value.email !== email ||
        this.searchForm.value.phone !== phone ||
        this.searchForm.value.date !== date) {
          this.searchForm.patchValue({
            name: name ? decodeURIComponent(name) : '',
            phone: phone ? decodeURIComponent(phone) : '',
            email: email ? decodeURIComponent(email) : '',
            date: date ? formatter.format((new Date(decodeURIComponent(date)))): ''
          });
          const filterObj = {
            name: this.searchForm.value.name,
            phone: this.searchForm.value.phone,
            email: this.searchForm.value.email,
            date: this.searchForm.value.date
          };
          for (const [key, value] of Object.entries(filterObj)) {
            if (!value) delete (filterObj as any)[key];
          }
          this.eventService.filtersObj = filterObj;
        }
    });
  }

  _onSearchFormSubmit() {
    const filterObj = {
      name: this.searchForm.value.name ? encodeURIComponent(this.searchForm.value.name) : null,
      phone: this.searchForm.value.phone ? encodeURIComponent(this.searchForm.value.phone) : null,
      email: this.searchForm.value.email ? encodeURIComponent(this.searchForm.value.email) : null,
      date: this.searchForm.value.date ? encodeURIComponent(this.searchForm.value.date) : null
    };
    for (const [key, value] of Object.entries(filterObj)) {
      if (!value) delete (filterObj as any)[key];
    }
    this.router.navigate(['/events', filterObj]);
  }
}
