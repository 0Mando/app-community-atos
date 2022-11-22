import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSpeakersComponent } from './top-speakers.component';

describe('TopSpeakersComponent', () => {
  let component: TopSpeakersComponent;
  let fixture: ComponentFixture<TopSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSpeakersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
