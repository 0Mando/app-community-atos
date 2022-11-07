import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSpeakersListComponent } from './top-speakers-list.component';

describe('TopSpeakersListComponent', () => {
  let component: TopSpeakersListComponent;
  let fixture: ComponentFixture<TopSpeakersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSpeakersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSpeakersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
