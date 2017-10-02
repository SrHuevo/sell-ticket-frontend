import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderTicketComponent } from './finder-ticket.component';

describe('FinderTicketComponent', () => {
  let component: FinderTicketComponent;
  let fixture: ComponentFixture<FinderTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
