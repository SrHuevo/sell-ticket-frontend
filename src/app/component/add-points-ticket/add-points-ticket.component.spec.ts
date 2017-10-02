import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointsTicketComponent } from './add-points-ticket.component';

describe('AddPointsTicketComponent', () => {
  let component: AddPointsTicketComponent;
  let fixture: ComponentFixture<AddPointsTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointsTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPointsTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
