import { Injectable } from '@angular/core';
import { Event } from "./eventia";
import eventsData from "../assets/data.json"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsSubject = new Subject<Event[]>();
  events$ = this.eventsSubject.asObservable();
  items: Event[] = [];

  private _currentPage = 1;
  public get currentPage() {
    return this._currentPage;
  }
  public set currentPage(value) {
    this._currentPage = value;
  }

  private _pageInit = 0;
  public get pageInit() {
    return this._pageInit;
  }
  public set pageInit(value) {
    this._pageInit = value;
  }

  private _pageOffset = 10;
  public get pageOffset() {
    return this._pageOffset;
  }
  public set pageOffset(value) {
    if(value <= 0) {
      this._pageOffset = 10;
    } else {
      this._pageOffset = value;
    }
  }

  private _filtersObj: any = null;
  public get filtersObj(): any {
    return this._filtersObj;
  }
  public set filtersObj(value: any) {
    this._filtersObj = value;
    if (value) {
      this.items = [];
      this._pageInit = 0;
      this._currentPage = 1;
      this.loadEvents();
    }
  }

  constructor() { }

  loadEvents() {
    const filteredData = this._filterData();
    this.items = [...this.items, ...filteredData.splice(this._pageInit, this._pageOffset)];
    this.eventsSubject.next(this.items);
  }

  loadMoreEvents() {
    const filteredData = this._filterData();
    if ((this._currentPage * this._pageOffset) < filteredData.length) {
      this._pageInit = (this._currentPage * this._pageOffset) + 1;
      this.items = [...this.items, ...filteredData.splice(this._pageInit, this._pageOffset)];
      this._currentPage = this._currentPage + 1;
      this.eventsSubject.next(this.items);
    }
  }

  _filterData() {
    let items: Event[] = [];
    if(Object.entries(this._filtersObj).length > 0) {
      for (const [key, value] of Object.entries(this._filtersObj)) {
        items = [...items, ...eventsData.filter(e => (e as any)[key] === value)]
      }
    } else {
      items = [...items, ...eventsData];
    }
    return items;
  }

}
